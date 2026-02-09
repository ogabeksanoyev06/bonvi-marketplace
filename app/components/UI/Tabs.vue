<template>
	<div class="w-full">
		<div
			v-if="variant === 'button'"
			:style="{ gridTemplateColumns: `repeat(${tabs.length}, 1fr)` }"
			:class="['relative grid gap-1 bg-blue-light p-1 rounded-full overflow-x-auto scrollbar-hide', mainClass]"
		>
			<div
				class="absolute top-[3px] bottom-[3px] bg-white rounded-full shadow-[0_5px_12px_0_rgba(0,0,0,0.12)] transition-all duration-300 ease-in-out"
				:style="{
					width: `calc(${100 / tabs.length}% - 4px)`,
					left: `calc(${activeTab * (100 / tabs.length)}% + 3px)`
				}"
			></div>
			<button
				v-for="(tab, index) in tabs"
				:key="index"
				:class="[
					'relative z-1 py-2.5 px-[14px] text-dark-2 text-sm leading-130 transition-all duration-300 whitespace-nowrap flex-shrink-0',
					activeTab === index ? 'font-bold' : 'font-medium'
				]"
				@click="selectTab(index)"
			>
				{{ tab.label }}
			</button>
		</div>

		<div v-else-if="variant === 'pill'" class="flex gap-5 overflow-x-auto scrollbar-hide">
			<button
				v-for="(tab, index) in tabs"
				:key="index"
				:class="[
					'bg-gray px-3 py-1.5 text-base font-medium leading-140 rounded-full transition-300 whitespace-nowrap shrink-0',
					activeTab === index ? '!bg-[#0084FF] text-white font-bold' : 'bg-[#F5F5F5] text-[#020202]'
				]"
				@click="selectTab(index)"
			>
				{{ tab.label }}
			</button>
		</div>

		<div class="mt-4 md:mt-6" :class="contentClass">
			<Transition name="tab-fade" mode="out-in">
				<div :key="activeTab">
					<slot :activeTab="activeTab" :activeTabData="tabs[activeTab]" />
				</div>
			</Transition>
		</div>
	</div>
</template>

<script setup lang="ts">
interface Tab {
	label: string
	[key: string]: any
}

interface Props {
	tabs: Tab[]
	variant?: 'button' | 'pill'
	contentClass?: string
	mainClass?: string
}
const props = withDefaults(defineProps<Props>(), {
	variant: 'button'
})

const activeTab = defineModel<number>('modelValue', { required: true })

const selectTab = (index: number) => {
	activeTab.value = index
}
</script>

<style scoped>
.scrollbar-hide {
	-ms-overflow-style: none;
	scrollbar-width: none;
}

.scrollbar-hide::-webkit-scrollbar {
	display: none;
}
</style>
