<template>
	<div class="lg:container lg:flex lg:justify-between lg:gap-8 gap-6 pt-8">
		<div class="lg:flex items-stretch justify-between gap-4 lg:!max-w-[calc(100%-488px)] w-full">
			<div class="lg:block hidden w-[120px] shrink-0">
				<Swiper @swiper="setThumbsSwiper" v-bind="thumbsSettings" class="h-[482px] rounded-3xl thumbs">
					<SwiperSlide
						v-for="(item, i) in product?.images"
						:key="item.id"
						class="bg-white !flex !items-center !justify-center !h-[110px] aspect-square !p-2.5 rounded-3xl border-2 cursor-pointer transition-300"
						:class="activeIndex === i ? 'border-blue' : 'border-transparent'"
					>
						<img :src="item.image_url" :alt="product?.name" class="w-full h-full object-contain" />
					</SwiperSlide>
				</Swiper>
			</div>

			<div class="relative lg:max-w-[calc(100%-120px)] w-full">
				<Swiper v-bind="settings" :thumbs="{ swiper: thumbsSwiper }" @slideChange="onSlideChange" class="h-full w-full rounded-[32px] bg-white">
					<SwiperSlide v-for="item in product?.images" :key="item.id" class="!flex !items-center !justify-center !h-full py-10 px-4">
						<img :src="item.image_url" :alt="product?.name" class="max-h-[400px] w-full object-contain" />
					</SwiperSlide>

					<button
						class="absolute product-prev left-2.5 top-1/2 -translate-y-1/2 z-10 size-11 flex-center rounded-full bg-black/10 border border-white/20 active:scale-90 transition-300"
					>
						<i class="icon-chevron text-white text-2xl rotate-90"></i>
					</button>
					<button
						class="absolute product-next right-2.5 top-1/2 -translate-y-1/2 z-10 size-11 flex-center rounded-full bg-black/10 border border-white/20 active:scale-90 transition-300"
					>
						<i class="icon-chevron text-white text-2xl -rotate-90"></i>
					</button>
				</Swiper>
			</div>
		</div>

		<div class="content-right w-full flex flex-col gap-6 px-4 py-6 lg:py-0 lg:px-0">
			<div>
				<img src="/images/brand-logo/bonvi.svg" alt="" class="h-[27px] aspect-[96.00/27.15]" />
			</div>
			<div class="flex flex-col gap-3 w-full">
				<div class="flex flex-col gap-1">
					<h3 class="text-2xl font-semibold leading-130 text-blue font-adero-trial">{{ product?.name }}</h3>
					<span class="text-[40px] font-bold leading-140">{{ formatMoneyDecimal(product?.price) }} UZS</span>
					<div class="flex-y-center gap-1.5">
						<i class="icon-star text-xl leading-5 text-blue"></i>
						<span class="text-lg font-bold leading-130">{{ product?.rating }}</span>
					</div>
				</div>
				<div class="flex flex-col gap-2">
					<h4 class="text-xl font-bold leading-140">Mahsulot haqida</h4>
					<p class="text-base !leading-140 text-black">
						{{ product?.description }}
					</p>
				</div>
			</div>
			<div class="flex items-center gap-2">
				<UIButtonAddToCart class="max-w-[250px]" :product-slug="product?.slug" :initial-quantity="product?.in_cart_quantity || 0" :max-stock="product?.count" />
				<UIButtonSave v-if="product" :model-value="product.is_saved" :slug="product.slug" />
				<UIButtonShare />
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation, FreeMode, Thumbs } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/free-mode'
import 'swiper/css/thumbs'

import type { IProductItem } from '~/types/products.d'

const props = defineProps<{
	product?: IProductItem
}>()

const mainSwiper = ref(null)
const thumbsSwiper = ref(null)

const activeIndex = ref(0)

const setThumbsSwiper = (swiper: any) => {
	thumbsSwiper.value = swiper
}

const onSlideChange = (swiper: any) => {
	activeIndex.value = swiper.realIndex
}

const settings = {
	modules: [FreeMode, Navigation, Thumbs],
	spaceBetween: 16,
	loop: true,
	loopedSlides: 4,
	navigation: {
		nextEl: '.product-next',
		prevEl: '.product-prev'
	},
	breakpoints: {
		300: { slidesPerView: 1 },
		768: { slidesPerView: 2 }
	},
	watchSlidesProgress: true
}

const thumbsSettings = {
	modules: [Thumbs, FreeMode],
	spaceBetween: 12,
	slidesPerView: 4,
	direction: 'vertical' as const,
	freeMode: true,
	watchSlidesProgress: true,
	slideToClickedSlide: true
}
</script>

<style></style>
