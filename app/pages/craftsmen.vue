<template>
	<div>
		<UIBreadcrumb :routes="breadcrumbItems" />
		<div class="container">
			<div class="flex items-center gap-3 py-3 md:py-5">
				<img src="/images/fire-icon.svg" alt="fire" />
				<h3 class="text-[28px] leading-130 font-bold">Mohir ustalarimiz</h3>
			</div>
		</div>

		<div class="container bg-white rounded-[40px] px-4 py-6 md:px-10 md:py-10">
			<div class="grid lg:grid-cols-12 gap-8">
				<div class="lg:col-span-3 hidden lg:block">
					<CraftsmenFilter />
				</div>
				<div class="lg:col-span-9">
					<ModalCraftsmenFilter class="block lg:hidden mb-5 w-full" />
					<transition name="fade" mode="out-in">
						<div class="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5">
							<template v-if="isPending">
								<CardCraftsmenLoading v-for="key in 8" :key="key" />
							</template>

							<template v-else>
								<template v-for="page in data?.pages" :key="page">
									<CardCraftsmen v-for="(item, key) in page.results || page.data || page" :key="item.id || key" :item="item" />
								</template>
							</template>
						</div>
					</transition>
					<div class="mt-4 flex justify-center">
						<UIButton
							text="Ko‘proq ko‘rish"
							icon="icon-chevron text-2xl leading-6"
							class="max-sm:w-full"
							:loading="isFetchingNextPage"
							:disabled="!hasNextPage"
							@click="fetchNextPage"
						/>
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
		const res = await $axios.get('common/carpenter-list/', {
			params: {
				limit: 20,
				offset: pageParam
			}
		})
		return res.data
	},
	getNextPageParam: (lastPage, allPages) => getNextPageOffset(lastPage, allPages, 20),
	initialPageParam: 0
})

const breadcrumbItems = [
	{
		name: 'Mohir ustalarimiz',
		path: ''
	}
]
</script>
