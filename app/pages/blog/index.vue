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

const breadcrumbItems = [
	{
		name: 'Blog',
		path: ''
	}
]

onMounted(() => {
	setTimeout(() => {
		isPending.value = false
	}, 2000)
})
</script>
