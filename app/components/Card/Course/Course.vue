<template>
	<NuxtLinkLocale to="/courses/1" class="flex flex-col gap-3 bg-gray p-3 rounded-[28px] group">
		<div class="relative overflow-hidden rounded-[28px] z-10">
			<UIImage src="/images/background-patterns.webp" class="rounded-[28px] h-[204px]" />
			<div class="absolute inset-0 bg-black/20 z-10"></div>
			<div
				v-if="!isLocked"
				class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 size-12 md:size-[72px] flex-center rounded-full p-3 bg-[#0083FF33] backdrop-blur cursor-pointer group-hover:backdrop-blur-xl transition-300"
			>
				<i class="icon-play md:text-[48px] text-2xl leading-6 md:leading-[48px] text-white"></i>
			</div>

			<div
				v-else
				class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 size-12 md:size-[72px] flex-center rounded-full p-3 outline outline-4 outline-white/10 bg-[#FF8C00] shadow-[0_0_56px_0_#FF8C00] backdrop-blur cursor-not-allowed group-hover:backdrop-blur-xl transition-300"
			>
				<div class="md:text-[48px] text-2xl leading-6 md:leading-[48px]">
					<span class="icon-lock"><span class="path1"></span><span class="path2"></span></span>
				</div>
			</div>
		</div>
		<div class="flex flex-col gap-1">
			<h3 class="text-base font-medium leading-130 text-blue">{{ lessonNumber }}-darslik</h3>
			<p class="text-base font-bold leading-130 text-ellipsis">
				{{ title }}
			</p>
		</div>
	</NuxtLinkLocale>
</template>
<script lang="ts" setup>
interface Props {
	title: string
	lessonNumber: number
	image: string
	isLocked: boolean
}
defineProps<Props>()
</script>
