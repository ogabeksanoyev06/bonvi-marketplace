<template>
	<div class="overflow-hidden py-6 md:pb-8 md:pt-7">
		<div class="container shrink-0 relative z-0 w-full">
			<div class="flex items-center justify-between mb-3 sm:mb-4 md:mb-6">
				<h3 class="text-3xl font-bold leading-130">Mijozlar fikri</h3>
				<UIButton
					to="/reviews"
					text="Barchasi"
					icon="icon-chevron -rotate-90 text-2xl leading-6"
					class="!bg-transparent !text-black !text-lg !font-medium !p-0 !h-auto hover:text-blue transition-300"
				/>
			</div>

			<div class="relative">
				<div class="overflow-hidden px-[150px] -mx-[150px] relative z-0">
					<transition name="fade" mode="out-in">
						<div v-if="isPending" class="flex gap-4 overflow-hidden w-full">
							<CardReviewLoading v-for="key in 4" :key="key" class="min-w-[300px]" />
						</div>

						<Swiper v-else-if="data?.results?.length" v-bind="settings" class="!overflow-visible">
							<SwiperSlide v-for="review in data.results" :key="review.id">
								<CardReview :item="review" />
							</SwiperSlide>
						</Swiper>

						<div v-else class="py-10 text-center opacity-50">Hozircha sharhlar mavjud emas.</div>
					</transition>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay } from 'swiper/modules'
import 'swiper/css'

import { useQuery } from '@tanstack/vue-query'
import type { IReviewResponse } from '~/types'

const props = defineProps<{
	slug: string
}>()

const { $axios } = useNuxtApp()

const settings = {
	modules: [Autoplay],
	spaceBetween: 16,
	autoplay: {
		delay: 3000,
		disableOnInteraction: false,
		pauseOnMouseEnter: true
	},
	loop: true,
	breakpoints: {
		300: { slidesPerView: 1.2 },
		768: { slidesPerView: 2.2 },
		1024: { slidesPerView: 3.2 },
		1280: { slidesPerView: 4 }
	}
}

const { isPending, data } = useQuery({
	queryKey: ['reviews', () => props.slug],
	queryFn: async () => {
		const res = await $axios.get<IReviewResponse>(`common/products/${props.slug}/reviews/`, {
			params: { limit: 10 }
		})
		return res.data
	},
	enabled: computed(() => !!props.slug)
})
</script>

<style scoped></style>
