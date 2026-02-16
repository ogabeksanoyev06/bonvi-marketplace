<template>
	<component
		:is="item.is_for_premium ? 'div' : NuxtLinkLocale"
		:to="!item.is_for_premium ? `/courses/${item.id}` : undefined"
		class="flex flex-col gap-3 bg-gray p-3 rounded-[28px] group transition-300"
		:class="[!item.is_for_premium ? 'hover:shadow-card cursor-pointer' : 'cursor-default']"
	>
		<div class="relative overflow-hidden rounded-[28px] z-10">
			<UIImage src="/images/background-patterns.webp" class="rounded-[28px] h-[204px]" />
			<div class="absolute inset-0 bg-black/20 z-10"></div>

			<div
				v-if="!item.is_for_premium"
				class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 size-12 md:size-[72px] flex-center rounded-full p-3 bg-[#0083FF33] backdrop-blur group-hover:backdrop-blur-xl transition-300"
			>
				<i class="icon-play md:text-[48px] text-2xl leading-6 md:leading-[48px] text-white"></i>
			</div>

			<div
				v-else
				class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 size-12 md:size-[72px] flex-center rounded-full p-3 outline outline-4 outline-white/10 bg-[#FF8C00] shadow-[0_0_56px_0_#FF8C00] backdrop-blur"
			>
				<div class="md:text-[48px] text-2xl leading-6 md:leading-[48px]">
					<span class="icon-lock"><span class="path1"></span><span class="path2"></span></span>
				</div>
			</div>
		</div>

		<div class="flex flex-col gap-1">
			<h3 class="text-base font-medium leading-130 text-blue">{{ item.title }}</h3>
			<p class="text-base font-bold leading-130 line-clamp-2">
				{{ item.description }}
			</p>
		</div>
	</component>
</template>

<script setup lang="ts">
const NuxtLinkLocale = resolveComponent('NuxtLinkLocale')

import type { ILesson } from '~/types/course'

const props = defineProps<{
	item: ILesson
}>()
</script>
