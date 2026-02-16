<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay } from 'swiper/modules'
import 'swiper/css'

import type { IProductItem } from '~/types/products.d'

interface Props {
	products?: IProductItem[]
	productMainClass?: string
}

const props = withDefaults(defineProps<Props>(), {
	products: () => [],
	productMainClass: '!p-0'
})

const swiperModules = [Autoplay]

const swiperBreakpoints = {
	300: { slidesPerView: 1.2 },
	768: { slidesPerView: 2.2 },
	1024: { slidesPerView: 3 },
	1280: { slidesPerView: 3.4 }
}
</script>

<template>
	<div class="shrink-0">
		<Swiper
			:modules="swiperModules"
			:space-between="16"
			:autoplay="{
				delay: 2500,
				disableOnInteraction: false
			}"
			:loop="true"
			:breakpoints="swiperBreakpoints"
			class="mySwiper"
		>
			<SwiperSlide v-for="item in props.products" :key="item.id">
				<CardProduct :item="item" image-bg="blue" :main-class="props.productMainClass" />
			</SwiperSlide>
		</Swiper>
	</div>
</template>
