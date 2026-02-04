<template>
	<section class="container">
		<div class="space-y-8 bg-white rounded-[40px] p-5 md:p-8 overflow-hidden">
			<div class="flex-center-between">
				<div class="flex-y-center gap-1">
					<img src="/images/fire-icon.svg" alt="fire-icon" class="size-10 md:block hidden" />
					<h2 class="section-title">Mohir ustalarimiz</h2>
				</div>
				<UIButton class="md:flex hidden" text="Barchasini ko'rish" icon="icon-chevron -rotate-90 text-2xl leading-6" />
			</div>

			<transition name="fade" mode="out-in">
				<template v-if="isPending">
					<div class="flex overflow-hidden gap-4 md:gap-5">
						<CardCraftsmenLoading v-for="key in 8" :key="key" class="!w-[278px] shrink-0" />
					</div>
				</template>
				<template v-else>
					<Swiper v-bind="settings" class="!overflow-visible">
						<SwiperSlide v-for="item in 8" :key="item">
							<CardCraftsmen :name="'Abdurahim Eshonjonov'" :service="'Avtomobil shinalarini almashtirish'" :phone="'+998 90 123 45 67'" :city="'Toshkent shahri'" />
						</SwiperSlide>
					</Swiper>
				</template>
			</transition>

			<NuxtLinkLocale to="/" class="mx-auto max-sm:w-full mt-5 block md:hidden">
				<UIButton text="Barchasini ko'rish" icon="icon-chevron -rotate-90 text-2xl leading-6" class="w-full" />
			</NuxtLinkLocale>
		</div>
	</section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/autoplay'
const isPending = ref(true)

const settings = {
	modules: [Autoplay],
	spaceBetween: 16,
	slidesPerView: 4,
	loop: true,
	autoplay: {
		delay: 3000,
		disableOnInteraction: false
	},

	breakpoints: {
		320: {
			slidesPerView: 1.4,
			spaceBetween: 12
		},
		640: {
			slidesPerView: 2.2,
			spaceBetween: 16
		},
		768: {
			slidesPerView: 3,
			spaceBetween: 20
		},
		1024: {
			slidesPerView: 5.3,
			spaceBetween: 24
		}
	}
}

onMounted(() => {
	setTimeout(() => {
		isPending.value = false
	}, 2000)
})
</script>
