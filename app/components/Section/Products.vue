<template>
	<section class="container px-0">
		<div class="flex flex-col gap-8 bg-white rounded-[40px] px-4 py-5 md:px-8 md:py-8">
			<div class="flex-center-between">
				<div class="flex-y-center gap-1">
					<img src="/images/scooter.svg" alt="fire-icon" class="size-10 md:block hidden" />
					<h2 class="section-title">Mahsulotlar to‘plami</h2>
				</div>
			</div>

			<div class="md:hidden">
				<transition name="fade" mode="out-in">
					<template v-if="isPending">
						<div class="flex overflow-hidden gap-3">
							<CardProductLoading v-for="key in 8" :key="key" class="!w-[278px] shrink-0" />
						</div>
					</template>
					<template v-else>
						<SectionCarouselProducts :products="data?.results" />
					</template>
				</transition>
			</div>

			<transition name="fade" mode="out-in">
				<div class="hidden md:grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
					<template v-if="isPending">
						<CardProductLoading v-for="key in 8" :key="key" />
					</template>
					<template v-else>
						<CardProduct v-for="item in data?.results" :key="item.id" :item="item" imageBg="blue" />
					</template>
				</div>
			</transition>

			<NuxtLinkLocale to="/products" class="mx-auto max-sm:w-full">
				<UIButton text="Barchasini ko'rish" icon="icon-chevron -rotate-90 text-2xl leading-6" class="w-full" />
			</NuxtLinkLocale>
		</div>
	</section>
</template>
<script lang="ts" setup>
import { useQuery } from '@tanstack/vue-query'
import type { IProductListResponse } from '~/types/products.d'

const { $axios } = useNuxtApp()
const { isPending, data } = useQuery({
	queryKey: ['products-main-section'],
	queryFn: async () => {
		const res = await $axios.get<IProductListResponse>('products/list/', { params: { limit: 8 } })
		return res.data
	}
})
</script>
