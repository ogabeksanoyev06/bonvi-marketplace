<template>
	<div class="transition-300 h-full max-sm:bg-white sm:hover:scale-105 sm:hover:shadow-card rounded-[32px] sm:hover:bg-white py-4 sm:hover:px-4 group flex flex-col">
		<div class="bg-white mb-4 relative rounded-[20px] overflow-hidden sm:group-hover:bg-gray">
			<Swiper v-bind="settings" @swiper="onSwiper" @slideChange="onSlideChange">
				<SwiperSlide v-for="(image, key) in images" :key="key">
					<UIImage :src="image" image-class="!size-[221px] aspect-square !object-contain" class="flex justify-center pb-7 pt-4" />
				</SwiperSlide>
			</Swiper>
			<div class="absolute bottom-3 left-1/2 -translate-x-1/2 flex justify-center gap-2 z-10 w-full">
				<div
					v-for="(image, key) in images"
					:key="key"
					class="max-w-16 w-full h-[3px] rounded-full cursor-pointer"
					:class="activeIndex === key ? 'bg-dark' : 'bg-gray-1'"
					@click="goToSlide(key)"
				/>
			</div>
			<img
				:src="brand === 'dark' ? '/images/brand-logo/dark.png' : brand === 'bonvi' ? '/images/brand-logo/bonvi.svg' : '/images/brand-logo/vikor.svg'"
				alt="brand logo"
				class="absolute top-2.5 left-2.5 w-[75px] aspect-[75/21.21] animate-pulse"
			/>
			<div class="absolute top-3 right-3 size-9 flex-center bg-white rounded-full p-1.5 cursor-pointer z-5">
				<i class="icon-saved text-2xl leading-6"></i>
			</div>
		</div>
		<div class="flex flex-col flex-1 justify-between gap-4">
			<div class="flex flex-col gap-1 px-3 group-hover:px-0 transition-300">
				<h3 class="text-lg sm:text-2xl !leading-130 font-[900] line-clamp-1">{{ title }}</h3>
				<p class="text-sm leading-130 text-ellipsis line-clamp-2">{{ description }}</p>
				<div class="">
					<span class="text-base sm:text-xl font-bold leading-130">{{ formatMoneyDecimal(originalPrice) }} <span class="font-normal">UZS</span></span>
					<span class="text-sm sm:text-base !leading-130 line-through ml-2 opacity-60">{{ formatMoneyDecimal(discountedPrice) }} UZS</span>
				</div>
			</div>
			<UIButton class="w-full !bg-[#0083FF14] !text-blue !font-medium">
				Savatga qo‘shish
				<img src="/images/shopping-bag.svg" alt="" />
			</UIButton>
		</div>
	</div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/autoplay'

defineProps<{
	images: string[]
	title: string
	description: string
	originalPrice: number
	discountedPrice: number
	discountPercent: string
	brand: string
}>()

const swiper = ref<any>(null)
const activeIndex = ref(0)

const settings = {
	modules: [Autoplay],
	slidesPerView: 1,
	spaceBetween: 24,
	loop: true,
	autoplay: {
		delay: 3000,
		disableOnInteraction: false
	}
}

/* Swiper instance ni olish */
function onSwiper(instance: any) {
	swiper.value = instance
	activeIndex.value = instance.realIndex
}

/* Slide o‘zgarganda */
function onSlideChange() {
	if (!swiper.value) return
	activeIndex.value = swiper.value.realIndex
}

/* Pagination bosilganda */
function goToSlide(index: number) {
	if (!swiper.value) return
	swiper.value.slideToLoop(index)
}
</script>
