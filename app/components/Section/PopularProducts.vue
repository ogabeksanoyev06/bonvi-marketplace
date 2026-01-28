<template>
	<section class="container px-0 py-10">
		<div class="bg-white rounded-[40px] p-8 overflow-hidden w-full">
			<div class="flex-center-between mb-8">
				<div class="flex-y-center gap-1">
					<img src="/images/scooter.svg" alt="fire-icon" class="size-10" />
					<h2 class="section-title">Ommabop mahsulotlar</h2>
				</div>
			</div>

			<transition name="fade" mode="out-in">
				<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
					<template v-if="isPending">
						<CardProductLoading v-for="key in 4" :key="key" />
					</template>
					<template v-else>
						<CardProduct
							v-for="item in items"
							:key="item.id"
							:images="item.images"
							:title="item.title"
							:description="item.description"
							:originalPrice="item.originalPrice"
							:discountedPrice="item.discountedPrice"
							:discountPercent="item.discountPercent"
							:brand="item.brand"
							imageBg="blue"
						/>
					</template>
				</div>
			</transition>

			<!-- <transition name="fade" mode="out-in">
				<div class="md:hidden block">
					<template v-if="isPending">
						<div class="flex overflow-hidden gap-4 md:gap-5">
							<CardProductLoading v-for="key in 8" :key="key" class="!w-[278px] shrink-0" />
						</div>
					</template>
					<template v-else>
						<Swiper v-bind="settings" class="!overflow-visible">
							<SwiperSlide v-for="item in items" :key="item.id">
								<CardProduct
									:images="item.images"
									:title="item.title"
									:description="item.description"
									:originalPrice="item.originalPrice"
									:discountedPrice="item.discountedPrice"
									:discountPercent="item.discountPercent"
									:brand="item.brand"
								/>
							</SwiperSlide>
						</Swiper>
					</template>
				</div>
			</transition> -->

			<NuxtLinkLocale to="/products" class="mx-auto flex justify-center mt-8">
				<UIButton text="Barchasini ko'rish" icon="icon-chevron -rotate-90 text-2xl leading-6" />
			</NuxtLinkLocale>
		</div>
	</section>
</template>
<script lang="ts" setup>
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/autoplay'
const isPending = ref(true)

const items = ref([
	{
		id: 1,
		images: ['/images/bonvi-product.png', '/images/bonvi-product.png', '/images/bonvi-product.png', '/images/bonvi-product.png'],
		title: 'Qariyalar uchun mapet',
		description: '12V tizimlar uchun ishonchli quvvat manbai. Barqaror kuchlanish beradi, o‘rnatish oson va uzoq muddat xizmat qiladi.',
		originalPrice: 2000000,
		discountedPrice: 1200000,
		discountPercent: '51%',
		brand: 'bonvi'
	},
	{
		id: 2,
		images: ['/images/bonvi-product.png', '/images/bonvi-product.png'],
		title: 'LED chiroq',
		description: 'Yuqori sifatli LED chiroq, energiya tejamkor va uzoq xizmat qiladi.',
		originalPrice: 500000,
		discountedPrice: 350000,
		discountPercent: '30%',
		brand: 'bonvi'
	},
	{
		id: 3,
		images: ['/images/vikor-product.png', '/images/vikor-product.png'],
		title: 'Avtomobil akkumulyatori',
		description: '12V tizimlar uchun ideal, ishonchli va uzoq umrli akkumulyator.',
		originalPrice: 1800000,
		discountedPrice: 1500000,
		discountPercent: '17%',
		brand: 'vikor'
	},
	{
		id: 4,
		images: ['/images/dark-product.png', '/images/dark-product.png'],
		title: 'Uy uchun Mapet',
		description: 'Barqaror kuchlanish va oson o‘rnatish bilan uy tizimlari uchun qulay.',
		originalPrice: 1200000,
		discountedPrice: 900000,
		discountPercent: '25%',
		brand: 'dark'
	}
])

const settings = {
	modules: [Autoplay],
	spaceBetween: 24,
	slidesPerView: 4,
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
			slidesPerView: 4
		}
	},
	centerSlides: true
}
onMounted(() => {
	setTimeout(() => {
		isPending.value = false
	}, 2000)
})
</script>
