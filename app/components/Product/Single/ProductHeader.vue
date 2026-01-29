<template>
	<div class="lg:container lg:grid lg:grid-cols-[1fr_456px] lg:gap-8 gap-6">
		<div class="content-left w-full"></div>

		<div class="content-right flex flex-col gap-6 px-4 py-6 lg:py-0 lg:px-0">
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
				<UIButtonAddToCart />
				<UIButtonSave />
				<UIButtonShare />
			</div>
		</div>
	</div>
</template>

<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation, FreeMode, Thumbs } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/free-mode'
import 'swiper/css/thumbs'

const settings = {
	spaceBetween: 10,
	grabCursor: true,
	breakpoints: {
		300: { slidesPerView: 1.1 },
		768: { slidesPerView: 2.2 }
	},
	modules: [FreeMode, Navigation]
}
</script>
