<template>
	<div class="overflow-hidden py-6 md:pb-8 md:pt-7">
		<div class="container shrink-0 relative z-0 w-full">
			<div class="flex items-center justify-between mb-3 sm:mb-4 md:mb-6">
				<h3 class="text-3xl font-bold leading-130">Mijozlar fikri</h3>
				<UIButton text="Barchasi" icon="icon-chevron -rotate-90 text-2xl leading-6" class="!bg-transparent !text-black !text-lg !font-medium !p-0 !h-auto" />
			</div>
			<div class="relative">
				<div class="overflow-hidden px-[150px] -mx-[150px] relative z-0">
					<transition name="fade" mode="out-in">
						<div v-if="false" class="flex gap-6 overflow-hidden w-full">
							<CardReviewLoading v-for="key in 6" :key="key" />
						</div>
						<Swiper v-else v-bind="settings" class="!overflow-visible">
							<SwiperSlide v-for="(item, index) in 6" :key="index">
								<CardReview />
							</SwiperSlide>
						</Swiper>
					</transition>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import { Autoplay } from 'swiper/modules'

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
		1024: { slidesPerView: 3.3 },
		1280: { slidesPerView: 3.4 }
	}
}
</script>
