<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import { Autoplay } from 'swiper/modules'

interface Product {
	id: number
	images: string[]
	title: string
	description: string
	originalPrice: number
	discountedPrice: number
	discountPercent: string
	brand: string
}

interface Props {
	products?: Product[]
	productMainClass?: string
}

const props = withDefaults(defineProps<Props>(), {
	products: () => [
		{
			id: 1,
			images: ['/images/bonvi-product.png', '/images/bonvi-product.png', '/images/bonvi-product.png', '/images/bonvi-product.png'],
			title: 'Qariyalar uchun mapet',
			description: '12V tizimlar uchun ishonchli quvvat manbai. Barqaror kuchlanish beradi, o‘rnatish oson va uzoq muddat xizmat qiladi.',
			originalPrice: 2000000,
			discountedPrice: 1200000,
			discountPercent: '51%',
			brand: 'bonvi'
		}
	],
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

const isPending = ref(true)

onMounted(() => {
	setTimeout(() => {
		isPending.value = false
	}, 2000)
})
</script>

<template>
	<div class="shrink-0">
		<Swiper v-bind="settings">
			<SwiperSlide v-for="item in props.products" :key="item.id">
				<CardProduct
					:images="item.images"
					:title="item.title"
					:description="item.description"
					:originalPrice="item.originalPrice"
					:discountedPrice="item.discountedPrice"
					:discountPercent="item.discountPercent"
					:brand="item.brand"
					imageBg="blue"
					:main-class="props.productMainClass"
				/>
			</SwiperSlide>
		</Swiper>
	</div>
</template>
