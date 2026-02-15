<template>
	<div>
		<UIBreadcrumb :routes="breadcrumbItems" />

		<div class="container flex items-center gap-3 py-3 md:py-5">
			<img src="/images/header/favourite.svg" alt="favourite" />
			<h3 class="text-[28px] leading-130 font-bold">Sevimlilar</h3>
		</div>
		<transition name="fade" mode="out-in">
			<CommonNoData
				v-if="!isPending && data?.results.length === 0"
				title="Bu yer hozircha bo‘sh"
				subtitle="Kerakli ma’lumotlarni shu yerga saqlab qo‘yishingiz mumkin"
				image="favorites.webp"
			/>

			<div v-else class="container bg-white rounded-[40px] p-10">
				<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
					<template v-if="isPending">
						<CardProductLoading v-for="key in 8" :key="key" />
					</template>

					<template v-else>
						<CardProduct v-for="item in data?.results" :key="item.id" :item="item" image-bg="blue" @toggle-favourite="handleRefresh" />
					</template>
				</div>
			</div>
		</transition>

		<SectionPopularProducts />
	</div>
</template>

<script setup lang="ts">
import { useQuery, useQueryClient } from '@tanstack/vue-query'
import type { IProductListResponse } from '~/types/products.d'

const { $axios } = useNuxtApp()
const queryClient = useQueryClient()

const { isPending, data } = useQuery({
	queryKey: ['products', 'favourites'],
	queryFn: async () => {
		const res = await $axios.get<IProductListResponse>('products/saved-list/', { params: { limit: 50 } })
		return res.data
	}
})

const handleRefresh = () => {
	queryClient.invalidateQueries({ queryKey: ['products', 'favourites'] })
}

const breadcrumbItems = [
	{
		name: 'Sevimlilar',
		path: ''
	}
]
</script>
