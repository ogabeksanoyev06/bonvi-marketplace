<template>
	<section class="md:container">
		<div class="md:space-y-8 bg-[#0083FF14] rounded-[40px] px-4 py-5 md:px-8 md:py-8 overflow-hidden">
			<div class="flex-y-center gap-1 max-md:mb-5">
				<img src="/images/fire-icon.svg" alt="fire-icon" class="size-10 md:block hidden" />
				<h2 class="section-title">Top mahsulotlar</h2>
			</div>

			<transition name="fade" mode="out-in">
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
								imageBg="white"
							/>
						</SwiperSlide>
					</Swiper>
				</template>
			</transition>

			<div class="flex justify-center max-md:mt-8">
				<UIButton class="max-md:w-full" text="Barchasini ko'rish" icon="icon-chevron -rotate-90 text-2xl leading-6" />
			</div>
		</div>
	</section>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/autoplay'

const isPending = ref(true)

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

const items = ref([
	{
		id: 1,
		images: ['/images/bonvi-product.png', '/images/bonvi-product.png'],
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
	},
	{
		id: 5,
		images: ['/images/bonvi-product.png', '/images/bonvi-product.png'],
		title: 'Mobil Powerbank',
		description: 'Tez quvvatlanadi, uzun xizmat muddati bilan xavfsiz.',
		originalPrice: 600000,
		discountedPrice: 450000,
		discountPercent: '25%',
		brand: 'bonvi'
	},
	{
		id: 6,
		images: ['/images/vikor-product.png', '/images/vikor-product.png'],
		title: 'LED lampochka',
		description: 'Yorqin va kam energiya sarf qiluvchi lampochka.',
		originalPrice: 200000,
		discountedPrice: 150000,
		discountPercent: '25%',
		brand: 'vikor'
	},
	{
		id: 7,
		images: ['/images/dark-product.png', '/images/dark-product.png'],
		title: 'Avtomobil chiroqlari',
		description: 'Yuqori sifatli va uzoq xizmat qiluvchi avtomobil chiroqlari.',
		originalPrice: 800000,
		discountedPrice: 600000,
		discountPercent: '25%',
		brand: 'dark'
	},
	{
		id: 8,
		images: ['/images/bonvi-product.png', '/images/bonvi-product.png'],
		title: 'Uy sharoitida Mapet',
		description: 'Barqaror kuchlanish, oson o‘rnatish va uzoq xizmat muddati.',
		originalPrice: 1000000,
		discountedPrice: 750000,
		discountPercent: '25%',
		brand: 'bonvi'
	}
])

onMounted(() => {
	setTimeout(() => {
		isPending.value = false
	}, 2000)
})
</script>
