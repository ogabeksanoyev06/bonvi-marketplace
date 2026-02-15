<template>
	<section class="container md:px-0">
		<div class="flex flex-col gap-6 md:gap-8 bg-white rounded-[40px] px-4 py-6 md:px-10 md:py-10">
			<div class="flex-center-between">
				<h2 class="section-title">Blog va yangiliklar</h2>
				<NuxtLinkLocale to="/blog">
					<UIButton class="md:flex hidden" text="Barchasini ko'rish" icon="icon-chevron -rotate-90 text-2xl leading-6" />
				</NuxtLinkLocale>
			</div>

			<transition name="fade" mode="out-in">
				<div v-if="isPending" key="loading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
					<CardBlogLoading v-for="i in 3" :key="i" />
				</div>

				<div v-else key="content" class="flex flex-col gap-6 md:gap-10">
					<div class="flex flex-col md:flex-row md:items-stretch gap-6 md:gap-10 bg-white rounded-2xl overflow-hidden">
						<div class="relative md:max-w-[582px] w-full aspect-video md:aspect-auto h-[340px]">
							<UIImage :src="mainBlog?.image" alt="blog-main-article" class="rounded-2xl object-cover w-full h-full" />
						</div>
						<div class="flex flex-col justify-between gap-4 md:gap-10 md:max-w-[562px] w-full">
							<div class="flex flex-col gap-2 md:gap-7">
								<div class="flex-y-center gap-1 border border-gray px-2 py-1.5 rounded-[20px] w-max">
									<span class="icon-calendar text-xl leading-5 text-gray-3"></span>
									<span class="text-gray-3 font-medium">{{ dayjs(mainBlog?.created_at).format('D-MMMM, HH:mm') }}</span>
								</div>
								<div class="flex flex-col gap-2 md:gap-4">
									<h2 class="text-xl sm:text-2xl md:text-3xl lg:text-[32px] font-bold !leading-130">{{ mainBlog?.title }}</h2>
									<p class="text-sm sm:text-base !leading-130 line-clamp-3">{{ mainBlog?.description }}</p>
								</div>
							</div>

							<NuxtLinkLocale :to="`/blog/${mainBlog?.id}`">
								<UIButton text="Batafsil" class="w-[104px] md:w-[136px]" />
							</NuxtLinkLocale>
						</div>
					</div>

					<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
						<CardBlog v-for="item in items" :key="item.id" :item="item" />
					</div>
				</div>
			</transition>

			<NuxtLinkLocale to="/blog" class="md:hidden">
				<UIButton class="w-full" variant="secondary" text="Barchasini ko'rish" />
			</NuxtLinkLocale>
		</div>
	</section>
</template>
<script lang="ts" setup>
import { useQuery } from '@tanstack/vue-query'
import type { IBlogListResponse, IBlogItem } from '~/types/blogs.d'

const { $axios } = useNuxtApp()
const dayjs = useDayjs()

const { isPending, data } = useQuery({
	queryKey: ['blogs', 'main-section'],
	queryFn: async () => {
		const res = await $axios.get<IBlogListResponse>('common/blog-list/', {
			params: {
				limit: 4
			}
		})
		return res.data
	}
})

const mainBlog = computed(() => data.value?.results[0] || null)
const items = computed(() => data.value?.results.slice(1, 4) || null)
</script>
