<template>
	<div>
		<UIBreadcrumb :routes="breadcrumbItems" />
		<div class="container">
			<div class="flex items-center gap-3 py-5">
				<img src="/images/header/basket.svg" alt="basket" />
				<h3 class="text-[28px] leading-130 font-bold">Mahsulotlar</h3>
			</div>
		</div>

		<div class="container bg-white rounded-[40px] sm:p-10">
			<div class="grid lg:grid-cols-12 gap-8">
				<div class="sticky h-[calc(100vh-124px)] top-28 lg:col-span-3 hidden lg:block">
					<div class="h-full overflow-y-auto rounded-2xl scrollbar-hide">
						<ProductFilter />
					</div>
				</div>
				<div class="lg:col-span-9">
					<transition name="fade" mode="out-in">
						<div class="grid grid-cols-2 lg:grid-cols-3 gap-3">
							<template v-if="isPending">
								<CardProductLoading v-for="key in 8" :key="key" />
							</template>

							<template v-else>
								<template v-for="page in data?.pages" :key="page">
									<CardProduct v-for="(item, key) in page.results || page.data || page" :key="item.id || key" :item="item" />
								</template>
							</template>
						</div>
					</transition>
					<div class="mt-5 flex justify-center">
						<UIButton text="Ko‘proq ko‘rish" icon="icon-chevron text-2xl leading-6" :loading="isFetchingNextPage" :disabled="!hasNextPage" @click="fetchNextPage" />
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script lang="ts" setup>
import { useInfiniteQuery } from '@tanstack/vue-query'
const { $axios } = useNuxtApp()

const { isPending, data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
	queryKey: ['craftsmen'],
	queryFn: async ({ pageParam = 0 }) => {
		const res = await $axios.get('products/list/', {
			params: {
				limit: 9,
				offset: pageParam
			}
		})
		return res.data
	},
	getNextPageParam: (lastPage, allPages) => getNextPageOffset(lastPage, allPages, 9),
	initialPageParam: 0
})

const breadcrumbItems = [
	{
		name: 'Mahsulotlar',
		path: ''
	}
]
</script>
