<template>
	<div :class="['transition-300 h-full sm:hover:shadow-card rounded-[32px] bg-white p-4 group flex flex-col', mainClass]">
		<div
			class="mb-4 relative rounded-[20px] overflow-hidden sm:group-hover:bg-gray shrink-0"
			:class="imageBg === 'white' ? 'bg-white' : '!bg-gray'"
			@mouseenter="stopAutoplay"
			@mouseleave="startAutoplay"
		>
			<Swiper
				:modules="[Autoplay]"
				:slides-per-view="1"
				:space-between="0"
				:loop="true"
				:speed="650"
				:autoplay="{
					delay: 2600,
					disableOnInteraction: false,
					pauseOnMouseEnter: true
				}"
				@swiper="onSwiper"
				@slide-change="onSlideChange"
			>
				<SwiperSlide v-for="(image, key) in item?.images || []" :key="image.id || key">
					<UIImage :src="image.image_url" :image-class="`!w-[221px] aspect-square !object-contain ${imageClasses || ''}`" class="flex justify-center pb-5 sm:pb-7 pt-4" />
				</SwiperSlide>
			</Swiper>

			<div class="md:flex absolute left-0 top-0 w-full h-full z-[1] hidden">
				<div v-for="(image, key) in item?.images || []" :key="'hover-' + (image.id || key)" class="h-full flex-1 cursor-pointer" @mouseenter="goToSlide(key)" />
			</div>

			<div class="absolute bottom-3 left-1/2 px-3 -translate-x-1/2 flex justify-center gap-2 z-10 w-full h-[3px]">
				<div
					v-for="(image, key) in item?.images || []"
					:key="'dot-' + (image.id || key)"
					class="w-full h-full rounded-full cursor-pointer transition-all duration-300"
					:class="activeIndex === key ? 'bg-dark' : 'bg-gray-1'"
					@click="goToSlide(key)"
				/>
			</div>

			<img :src="getBrandLogo(item?.brand)" alt="brand logo" class="absolute top-2.5 left-2.5 w-[75px] aspect-[75/21.21] z-10 object-contain" />

			<div class="absolute top-2 right-2 sm:top-3 sm:right-3 z-[5]">
				<UIButtonSave :model-value="item.is_saved" :slug="item?.slug" class="!size-9" @button-clicked="$emit('toggle-favourite')" />
			</div>

			<div class="absolute bottom-0 right-0 z-[5]" v-if="item?.discount_price">
				<div class="relative">
					<img src="/images/discount.svg" alt="discount" />
					<span class="absolute top-[57px] left-[52px] -translate-y-1/2 text-xs leading-130 font-normal text-white"> {{ item?.discount_percent || 51 }}% </span>
				</div>
			</div>
		</div>

		<div class="flex flex-col flex-1 justify-between gap-4">
			<NuxtLinkLocale :to="`/products/${item?.slug}`" class="flex flex-col gap-1 transition-300">
				<h3 class="text-lg sm:text-2xl !leading-130 font-[900] line-clamp-1 text-dark">{{ item?.name }}</h3>
				<p class="text-sm leading-130 text-ellipsis line-clamp-2 text-gray-2">{{ item?.description }}</p>

				<div class="mt-auto">
					<span class="text-base sm:text-xl font-bold leading-130 text-dark"> {{ formatMoneyDecimal(item?.price) }} <span class="font-normal text-sm">UZS</span> </span>
					<span class="text-sm sm:text-base !leading-130 line-through ml-2 opacity-60" v-if="item?.discount_price"> {{ formatMoneyDecimal(item?.discount_price) }} UZS </span>
				</div>
			</NuxtLinkLocale>

			<UIButtonAddToCart class="!mt-auto" :product-slug="item?.slug" :initial-quantity="item?.in_cart_quantity || 0" :max-stock="item?.count" />
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/autoplay'
import type { IProductItem } from '~/types/products'

const props = withDefaults(
	defineProps<{
		item: IProductItem
		imageBg?: 'white' | 'blue'
		mainClass?: string
		imageClasses?: string
	}>(),
	{
		imageBg: 'blue',
		mainClass: '',
		imageClasses: ''
	}
)

defineEmits(['toggle-favourite'])

const swiperInstance = ref<any>(null)
const activeIndex = ref(0)

function onSwiper(instance: any) {
	swiperInstance.value = instance
}

function onSlideChange() {
	if (swiperInstance.value) {
		activeIndex.value = swiperInstance.value.realIndex
	}
}

function stopAutoplay() {
	swiperInstance.value?.autoplay?.stop()
}

function startAutoplay() {
	swiperInstance.value?.autoplay?.start()
}

function goToSlide(index: number) {
	swiperInstance.value?.slideToLoop(index)
}

// Brand logoni aniqlash uchun yordamchi funksiya
function getBrandLogo(brand: string | null | undefined) {
	if (brand === 'dark') return '/images/brand-logo/dark.png'
	if (brand === 'bonvi') return '/images/brand-logo/bonvi.svg'
	return '/images/brand-logo/vikor.svg'
}
</script>
