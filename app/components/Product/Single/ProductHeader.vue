<template>
	<div class="lg:container lg:flex lg:justify-between lg:gap-8 gap-6 pt-8">
		<div class="lg:flex items-stretch justify-between gap-4 lg:!max-w-[calc(100%-488px)] w-full">
			<div class="lg:block hidden">
				<Swiper v-bind="thumbsSettings" @swiper="setThumbsSwiper" class="h-[482px] rounded-3xl thumbs">
					<SwiperSlide
						v-for="(key, i) in 10"
						:key="key"
						class="bg-white !flex !items-center !justify-center !h-[120px] aspect-square !p-2.5 rounded-3xl border-2 border-transparent"
						:class="activeIndex === i ? '!border-blue' : ''"
					>
						<img src="/images/image.png" alt="" class="w-[106px] aspect-square object-contain" />
					</SwiperSlide>
				</Swiper>
			</div>

			<div class="relative lg:max-w-[calc(100%-120px)] w-full">
				<Swiper v-bind="settings" :thumbs="{ swiper: thumbsSwiper }" @slideChange="onSlideChange" @swiper="setMainSwiper" class="h-full w-full rounded-[32px]">
					<SwiperSlide v-for="key in 10" :key="key" class="bg-white !flex !items-center !justify-center !h-full pt-6 sm:py-16 px-2 rounded-[32px]">
						<img src="/images/image.png" alt="" class="sm:w-[355px] sm:aspect-[355/354] object-contain" />
					</SwiperSlide>
				</Swiper>

				<button
					class="absolute product-prev left-2.5 top-1/2 -translate-y-1/2 z-10 size-11 flex-center rounded-full p-2 bg-black/10 border-2 border-white/20 pl-1 active:scale-95 transition-300"
				>
					<i class="icon-chevron text-white text-[28px] leading-7 rotate-90"></i>
				</button>
				<button
					class="absolute product-next right-2.5 top-1/2 -translate-y-1/2 z-10 size-11 flex-center rounded-full p-2 bg-black/10 border-2 border-white/20 pr-1 active:scale-95 transition-300"
				>
					<i class="icon-chevron text-white text-[28px] leading-7 -rotate-90"></i>
				</button>
			</div>
		</div>

		<!-- Right content -->
		<div class="content-right w-full flex flex-col gap-6 px-4 py-6 lg:py-0 lg:px-0">
			<div>
				<img src="/images/brand-logo/bonvi.svg" alt="" class="h-[27px] aspect-[96.00/27.15]" />
			</div>
			<div class="flex flex-col gap-3 w-full">
				<div class="flex flex-col gap-1">
					<h3 class="text-2xl font-semibold leading-130 text-blue font-adero-trial">Qariyalar uchun mapet</h3>
					<span class="text-[40px] font-bold leading-140">1 328 000 UZS</span>
					<div class="flex-y-center gap-1.5">
						<i class="icon-star text-xl leading-5 text-blue"></i>
						<span class="text-lg font-bold leading-130">5.0</span>
					</div>
				</div>
				<div class="flex flex-col gap-2">
					<h4 class="text-xl font-bold leading-140">Mahsulot haqida</h4>
					<p class="text-base !leading-140 text-black">
						Kärcher MIC 34C — bu to‘liq g‘ildirakli harakatga ega, manevr qobiliyatli mashina bo‘lib, ko‘cha tozalash, qor tozalash va boshqa kommunal ishlar uchun mo‘ljallangan.
						Jamoat va shaxsiy hududlarda foydalanish uchun mos.
					</p>
				</div>
			</div>
			<div class="flex items-center gap-2">
				<UIButtonAddToCart class="max-w-[250px]" />
				<UIButtonSave />
				<UIButtonShare />
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation, FreeMode, Thumbs } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/free-mode'
import 'swiper/css/thumbs'

const mainSwiper = ref(null)
const thumbsSwiper = ref(null)

const activeIndex = ref(0)

const setMainSwiper = (swiper) => {
	mainSwiper.value = swiper
}
const setThumbsSwiper = (swiper) => {
	thumbsSwiper.value = swiper
}

const onSlideChange = (swiper) => {
	activeIndex.value = swiper.activeIndex
}

const settings = {
	spaceBetween: 16,
	breakpoints: {
		300: { slidesPerView: 1 },
		768: { slidesPerView: 2 }
	},
	navigation: {
		nextEl: '.product-next',
		prevEl: '.product-prev'
	},
	modules: [FreeMode, Navigation, Thumbs],
	watchOverflow: true,
	watchSlidesVisibility: true,
	watchSlidesProgress: true,
	preventInteractionOnTransition: true
}

const thumbsSettings = {
	spaceBetween: 12,
	slidesPerView: 3,
	modules: [Thumbs],
	direction: 'vertical'
}
</script>

<style></style>
