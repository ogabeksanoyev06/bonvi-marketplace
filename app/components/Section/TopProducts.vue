<template>
	<section class="md:container">
		<div class="md:space-y-8 bg-[#0083FF14] rounded-[40px] px-4 py-5 md:px-8 md:py-8 overflow-hidden">
			<div class="flex-y-center gap-1 max-md:mb-5">
				<img src="/images/fire-icon.svg" alt="fire-icon" class="size-10 md:block hidden" />
				<h2 class="section-title">Top mahsulotlar</h2>
			</div>

			<transition name="fade" mode="out-in">
				<template v-if="isPending">
					<div class="flex overflow-hidden gap-3">
						<CardProductLoading v-for="key in 8" :key="key" class="!w-[350px] shrink-0 !p-2" />
					</div>
				</template>
				<template v-else>
					<Swiper v-bind="settings" class="!overflow-visible">
						<SwiperSlide v-for="item in data?.results || []" :key="item.id">
							<CardProduct :item="item" imageBg="blue" />
						</SwiperSlide>
					</Swiper>
				</template>
			</transition>

			<NuxtLinkLocale to="/products" class="flex justify-center max-md:mt-8">
				<UIButton class="max-md:w-full" text="Barchasini ko'rish" icon="icon-chevron -rotate-90 text-2xl leading-6" />
			</NuxtLinkLocale>
		</div>
	</section>
</template>
<script lang="ts" setup>
import { useQuery } from '@tanstack/vue-query'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/autoplay'

import type { IProductListResponse } from '~/types/products.d'

const settings = {
	modules: [Autoplay],
	spaceBetween: 12,
	slidesPerView: 3.4,
	loop: true,
	autoplay: {
		delay: 3000,
		disableOnInteraction: false
	},

	breakpoints: {
		320: {
			slidesPerView: 1.1,
			spaceBetween: 8
		},
		640: {
			slidesPerView: 2
		},
		768: {
			slidesPerView: 3
		},
		1024: {
			slidesPerView: 3.4
		}
	}
}

const { $axios } = useNuxtApp()
const { isPending, data } = useQuery({
	queryKey: ['products', 'top'],
	queryFn: async () => {
		const res = await $axios.get<IProductListResponse>('products/list/', { params: { limit: 8 } })
		return res.data
	}
})
</script>
