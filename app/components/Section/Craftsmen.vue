<template>
	<section class="container">
		<div class="space-y-8 bg-white rounded-[40px] p-5 md:p-8 overflow-hidden">
			<div class="flex-center-between">
				<div class="flex-y-center gap-1">
					<img src="/images/fire-icon.svg" alt="fire-icon" class="size-10 md:block hidden" />
					<h2 class="section-title">Mohir ustalarimiz</h2>
				</div>
				<NuxtLinkLocale to="/craftsmen">
					<UIButton class="md:flex hidden" text="Barchasini ko'rish" icon="icon-chevron -rotate-90 text-2xl leading-6" />
				</NuxtLinkLocale>
			</div>

			<transition name="fade" mode="out-in">
				<template v-if="isPending">
					<div class="flex overflow-hidden gap-4 md:gap-5">
						<CardCraftsmenLoading v-for="key in 8" :key="key" class="!w-[278px] shrink-0" />
					</div>
				</template>
				<template v-else>
					<Swiper v-bind="settings" class="!overflow-visible">
						<SwiperSlide v-for="item in data.results" :key="item.id">
							<CardCraftsmen :item="item" />
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
import { useQuery } from '@tanstack/vue-query'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/autoplay'

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

const { $axios } = useNuxtApp()
const dayjs = useDayjs()

const { isPending, data } = useQuery({
	queryKey: ['craftsman-section'],
	queryFn: async () => {
		const res = await $axios.get('common/carpenter-list/', {
			params: {
				limit: 12
			}
		})
		return res.data
	}
})
</script>
