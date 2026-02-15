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
	productMainClass: '!p-0'
})

const settings = {
	modules: [Autoplay],
	spaceBetween: 16,
	autoplay: {
		delay: 2500,
		disableOnInteraction: false
	},
	loop: true,
	breakpoints: {
		300: { slidesPerView: 1.2 },
		768: { slidesPerView: 2.2 },
		1024: { slidesPerView: 3 },
		1280: { slidesPerView: 3.4 }
	}
}
</script>

<template>
	<div class="shrink-0">
		<ClientOnly>
			<Swiper v-bind="settings">
				<SwiperSlide v-for="item in props.products || []" :key="item.id">
					<CardProduct :item="item" imageBg="blue" :main-class="props.productMainClass" />
				</SwiperSlide>
			</Swiper>
		</ClientOnly>
	</div>
</template>
