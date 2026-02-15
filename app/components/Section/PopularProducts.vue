<template>
	<section class="container px-0 py-10">
		<div class="bg-white rounded-[40px] p-8 overflow-hidden w-full">
			<div class="flex-center-between mb-8">
				<div class="flex-y-center gap-1">
					<img src="/images/scooter.svg" alt="fire-icon" class="size-10" />
					<h2 class="section-title">Ommabop mahsulotlar</h2>
				</div>
			</div>

			<transition name="fade" mode="out-in">
				<div v-if="!isPending && !data?.results?.length" key="no-data">
					<CommonNoData title="Maʼlumot topilmadi" subtitle="Boshqa filtrlarni sinab ko‘ring" image="favorites.webp" />
				</div>

				<div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3" key="content">
					<template v-if="isPending">
						<CardProductLoading v-for="key in 8" :key="key" />
					</template>

					<template v-else>
						<CardProduct v-for="item in data?.results" :key="item.id" :item="item" image-bg="blue" />
					</template>
				</div>
			</transition>

			<NuxtLinkLocale v-if="data?.results && data.results.length > 0" to="/products" class="mx-auto flex justify-center mt-8">
				<UIButton text="Barchasini ko'rish" icon="icon-chevron -rotate-90 text-2xl leading-6" />
			</NuxtLinkLocale>
		</div>
	</section>
</template>
<script lang="ts" setup>
import { useQuery } from '@tanstack/vue-query'
import type { IProductListResponse } from '~/types/products.d'

const { $axios } = useNuxtApp()
const { isPending, data } = useQuery({
	queryKey: ['products', 'popular'],
	queryFn: async () => {
		const res = await $axios.get<IProductListResponse>('products/popular-products/', { params: { limit: 8 } })
		return res.data
	}
})
</script>
