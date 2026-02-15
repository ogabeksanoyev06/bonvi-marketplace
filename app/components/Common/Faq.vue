<template>
	<section class="bg-blue-light">
		<div class="container">
			<h2 class="section-title max-md:!text-xl mb-6 text-center">Tez-tez so‘raladigan savollar</h2>
			<div class="flex flex-col gap-3 bg-black rounded-[40px] p-3 shadow-faq">
				<transition name="fade" mode="out-in">
					<div v-if="isPending" key="loading" class="flex flex-col gap-3 w-full">
						<div v-for="i in 5" :key="i" class="h-12 sm:h-16 w-full rounded-3xl bg-white/5 animate-pulse border border-white/10"></div>
					</div>

					<div v-else key="content" class="flex flex-col gap-3 w-full">
						<UIAccordion
							v-for="(item, index) in data?.results"
							:key="index"
							:show="active === index"
							@toggle="toggleAccordion(index)"
							:wrapper-class="['rounded-[28px] bg-white/[0.12] border border-white/[0.16] transition-300']"
						>
							<template #header>
								<div class="flex justify-between items-center rounded-[28px] gap-4">
									<span class="text-sm md:text-2xl font-bold text-white">
										{{ item.question }}
									</span>
									<span
										class="size-8 md:size-10 p-2 flex-center rounded-full bg-white/10 border border-white/10 transition-300"
										:class="active === index ? 'rotate-45' : 'rotate-0'"
									>
										<span class="icon-plus text-2xl leading-6 text-white"></span>
									</span>
								</div>
							</template>

							<template #body>
								<div class="px-4 pb-2">
									<p class="text-sm md:text-base !leading-[140%] text-white">
										{{ item.answer }}
									</p>
								</div>
							</template>
						</UIAccordion>
					</div>
				</transition>
			</div>
		</div>
	</section>
</template>

<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query'
import type { IFaqResponse } from '~/types'

const { $axios } = useNuxtApp()

const { isPending, data } = useQuery({
	queryKey: ['section-faq'],
	queryFn: () => {
		return $axios
			.get<IFaqResponse>('common/faq/', {
				params: { limit: 12 }
			})
			.then((res) => res.data)
	}
})

const active = ref<number | null>(null)
const toggleAccordion = (index: number) => {
	active.value = active.value === index ? null : index
}
</script>

<style scoped>

.shadow-faq {
	box-shadow:
		0 179px 50px 0 rgba(0, 0, 0, 0),
		0 114px 46px 0 rgba(0, 0, 0, 0.02),
		0 64px 39px 0 rgba(0, 0, 0, 0.08),
		0 29px 29px 0 rgba(0, 0, 0, 0.14),
		0 7px 16px 0 rgba(0, 0, 0, 0.16);
}
</style>
