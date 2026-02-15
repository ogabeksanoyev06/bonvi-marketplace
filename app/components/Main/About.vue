<template>
	<section class="mb-8 md:mb-10 container px-0 relative overflow-hidden rounded-[40px] py-7 md:py-14">
		<img src="/images/background-patterns.webp" alt="" class="absolute inset-0 w-full h-full z-[-1] object-top object-cover" />

		<div class="flex flex-col gap-7 sm:gap-10 max-w-[1280px] w-full mx-auto max-sm:px-4">
			<div class="flex flex-col items-center text-center gap-[14px] md:gap-6">
				<h1 class="text-3xl md:text-4xl lg:text-6xl xl:text-7xl leading-[90%] font-bold md:tracking-[-4px] font-adero-trial text-shadow">Biz haqimizda</h1>

				<p class="text-sm sm:text-2xl !leading-130 text-white">
					O’zbekistondagi milliy brend 3 ta brendni birlashtirgan korxona. O’zbekistondagi milliy brend 3 ta brendni birlashtirgan korxona.O’zbekistondagi milliy brend 3 ta brendni
					birlashtirgan korxona.
				</p>
			</div>

			<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
				<div
					v-for="item in data?.results"
					:key="item.id"
					class="flex flex-col items-start min-h-[327px] sm:min-h-[383px] gap-6 rounded-[40px] border-2 border-white/10 bg-black/10 backdrop-blur-[20px] px-8 pt-8 relative overflow-hidden z-10 hover:backdrop-blur-2xl transition-300"
				>
					<img :src="item.logo" :alt="item.title" class="h-14 object-contain" />
					<p class="text-base leading-140 text-white">{{ item.description }}</p>
					<a :href="item.link" target="_blank">
						<UIButton text="Batafsil" class="!bg-white !text-dark" icon="icon-more text-2xl leading-6" />
					</a>
					<img
						:src="item.image"
						:alt="item.title"
						class="absolute -bottom-8 z-[-1] right-2 w-[186px] aspect-[186.10/186.10] sm:w-[280px] sm:aspect-[280.06/254.06] object-contain"
					/>
				</div>
			</div>
		</div>
	</section>
</template>

<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query'

import type { IAboutResponse } from '~/types'

const { $axios } = useNuxtApp()

const { isPending, data } = useQuery({
	queryKey: ['about'],
	queryFn: async () => {
		const res = await $axios.get<IAboutResponse>('common/about-us/', { params: { limit: 3 } })
		return res.data
	}
})
</script>

<style scoped>
.text-shadow {
	text-shadow:
		81px 67px 30px rgba(255, 255, 255, 0),
		52px 43px 27px rgba(255, 255, 255, 0.02),
		29px 24px 23px rgba(255, 255, 255, 0.06),
		13px 11px 17px rgba(255, 255, 255, 0.1),
		3px 3px 9px rgba(255, 255, 255, 0.12);

	background: linear-gradient(180deg, #fff 46.5%, rgba(255, 255, 255, 0.52) 80.33%, rgba(255, 255, 255, 0.3) 95.53%, rgba(255, 255, 255, 0) 111.43%);

	background-clip: text;

	-webkit-background-clip: text;

	-webkit-text-fill-color: transparent;
}
</style>
