<template>
	<div>
		<UIBreadcrumb :routes="breadcrumbItems" />
		<div class="container py-3 md:py-5">
			<h3 class="text-[28px] leading-130 font-bold">Blog</h3>
		</div>
		<div class="container bg-white rounded-[40px] px-4 py-6 md:px-10 md:py-6">
			<transition name="fade" mode="out-in">
				<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
					<template v-if="isPending">
						<CardBlogLoading v-for="key in 6" :key="key" />
					</template>

					<template v-else>
						<template v-for="page in data?.pages" :key="page">
							<CardBlog v-for="(item, key) in page.results || page.data || page" :key="item.id || key" :item="item" />
						</template>
					</template>
				</div>
			</transition>

			<div class="md:mt-10 mt-5 flex justify-center">
				<UIButton text="Ko‘proq ko‘rish" icon="icon-chevron text-2xl leading-6" :loading="isFetchingNextPage" :disabled="!hasNextPage" @click="fetchNextPage" />
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { useInfiniteQuery } from '@tanstack/vue-query'
const { $axios } = useNuxtApp()

const { isPending, data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
	queryKey: ['blogs'],
	queryFn: async ({ pageParam = 0 }) => {
		const res = await $axios.get('common/blog-list/', {
			params: {
				limit: 6,
				offset: pageParam
			}
		})
		return res.data
	},
	getNextPageParam: (lastPage, allPages) => getNextPageOffset(lastPage, allPages, 6),
	initialPageParam: 0
})

const { locale } = useI18n()

// Language-specific SEO content for Marketplace
const getMarketplaceSeoContent = (lang: string) => {
	const content = {
		uz: {
			title: 'Bonvi Market - Skuterlar, Shinalar va Sifatli Mahsulotlar Platformasi',
			description: 'Bonvi-dan zamonaviy skuterlar, Dark-dan sifatli shinalar va Vikor-dan hamyonbop mahsulotlar. Barcha brendlar bir joyda — qulay, sifatli va hamyonbop!',
			ogTitle: 'Bonvi Market: Orzuingizdagi mahsulotlar makoni',
			ogDescription: "Skuterlar, avto-shinalar va xilma-xil mahsulotlar to'plami. Biz bilan bog'laning va eng yaxshisini tanlang.",
			twitterTitle: 'Bonvi Market - Barcha brendlar birlashgan marketplace',
			twitterDescription: 'Skuterlar, shinalar va hamyonbop savdo bitta platformada.'
		},
		ru: {
			title: 'Bonvi Market - Скутеры, Шины и Качественные Товары',
			description: 'Современные скутеры от Bonvi, надежные шины от Dark и доступные товары от Vikor. Все бренды в одном маркетплейсе — удобно, качественно и выгодно!',
			ogTitle: 'Bonvi Market: Пространство ваших идеальных покупок',
			ogDescription: 'Широкий выбор скутеров, автошин и различных товаров. Свяжитесь с нами и выберите лучшее.',
			twitterTitle: 'Bonvi Market - Маркетплейс всех брендов',
			twitterDescription: 'Скутеры, шины и доступные покупки на одной платформе.'
		},
		en: {
			title: 'Bonvi Market - Scooters, Tyres, and Quality Products',
			description:
				'Modern scooters from Bonvi, quality tyres from Dark, and affordable products from Vikor. All brands in one marketplace — convenient, high-quality, and affordable!',
			ogTitle: 'Bonvi Market: The Home of Your Dream Products',
			ogDescription: 'A wide selection of scooters, tires, and various goods. Contact us and choose the best.',
			twitterTitle: 'Bonvi Market - Unified Brand Marketplace',
			twitterDescription: 'Scooters, tyres, and affordable shopping on one platform.'
		}
	}
	return content[lang as keyof typeof content] || content.uz
}

// SEO Meta
useSeoMeta({
	title: computed(() => getMarketplaceSeoContent(locale.value).title),
	description: computed(() => getMarketplaceSeoContent(locale.value).description),
	ogTitle: computed(() => getMarketplaceSeoContent(locale.value).ogTitle),
	ogDescription: computed(() => getMarketplaceSeoContent(locale.value).ogDescription),
	ogImage: 'https://bonvimarket.uz/og-main-preview.jpg', // Asosiy marketplace rasmi
	ogUrl: 'https://bonvimarket.uz',
	twitterTitle: computed(() => getMarketplaceSeoContent(locale.value).twitterTitle),
	twitterDescription: computed(() => getMarketplaceSeoContent(locale.value).twitterDescription),
	twitterCard: 'summary_large_image'
})

// Structured data for Marketplace
useHead({
	script: [
		{
			type: 'application/ld+json',
			innerHTML: JSON.stringify({
				'@context': 'https://schema.org',
				'@type': 'Blog',
				name: 'Bonvi Market',
				description: 'Bonvi (skuterlar), Dark (shinalar) va Vikor (sifatli mahsulotlar) brendlarini birlashtirgan universal marketplace.',
				url: 'https://bonvimarket.uz',
				publisher: {
					'@type': 'Organization',
					name: 'Bonvi Market Group',
					url: 'https://bonvimarket.uz',
					logo: 'https://bonvimarket.uz/images/logo.svg'
				},
				brand: [
					{
						'@type': 'Brand',
						name: 'Bonvi',
						description: 'Sifatli va hamyonbop skuterlar'
					},
					{
						'@type': 'Brand',
						name: 'Dark',
						description: 'Tezkor va sifatli avto-shinalar'
					},
					{
						'@type': 'Brand',
						name: 'Vikor',
						description: 'Qulay va xilma-xil kundalik mahsulotlar'
					}
				],
				mainEntityOfPage: {
					'@type': 'WebPage',
					'@id': 'https://bonvimarket.uz'
				},
				potentialAction: {
					'@type': 'SearchAction',
					target: 'https://bonvimarket.uz/search?q={search_term_string}',
					'query-input': 'required name=search_term_string'
				}
			})
		}
	]
})

const breadcrumbItems = [
	{
		name: 'Blog',
		path: ''
	}
]
</script>
