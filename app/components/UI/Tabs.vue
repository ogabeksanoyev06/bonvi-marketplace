<template>
	<div class="w-full">
		<div
			v-if="variant === 'button'"
			class="relative grid gap-1 bg-gray-1 p-0.5 rounded-full overflow-x-auto scrollbar-hide"
			:style="{ gridTemplateColumns: `repeat(${tabs.length}, 1fr)` }"
		>
			<div
				class="absolute top-0.5 bottom-0.5 bg-white rounded-full shadow-sm transition-all duration-300 ease-in-out"
				:style="{
					width: `calc(${100 / tabs.length}% - 4px)`,
					left: `calc(${activeTab * (100 / tabs.length)}% + 2px)`
				}"
			></div>
			<button
				v-for="(tab, index) in tabs"
				:key="index"
				:class="[
					'relative z-1 py-2 px-4 text-sm font-semibold leading-130 transition-all duration-300 whitespace-nowrap flex-shrink-0',
					activeTab === index ? 'text-[#020202]' : 'text-[#676767]'
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
