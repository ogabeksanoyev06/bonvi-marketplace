<template>
	<div class="flex items-center justify-between p-3 bg-white rounded-2xl cursor-pointer" :class="mainClass" @click="modelValue = !modelValue">
		<div class="text-xs font-medium" :class="labelClass">
			<slot name="label">
				<span v-if="label">{{ label }}</span>
			</slot>
		</div>
		<label
			class="transition select-none duration-200 ease-in-out inline-flex items-center w-12 h-7 relative overflow-hidden rounded-[48px] cursor-pointer p-0.5 shrink-0"
			:class="modelValue ? 'bg-blue' : 'bg-gray'"
		>
			<div class="bg-red w-full h-full absolute inset-0 opacity-0 transition-300" :class="{ '!opacity-100': modelValue }" />
			<span
				class="absolute w-[22px] h-[22px] shadow-[0_4px_4px_0_rgba(0,0,0,0.02),_0_2px_4px_0_rgba(0,0,0,0.28)] rounded-full transition bg-white duration-200 ease-in-out z-[1]"
				:class="modelValue ? 'translate-x-5' : 'translate-x-0'"
			/>
		</label>
	</div>
</template>

<script setup lang="ts">
interface Props {
	label?: string
	labelClass?: string | string[]
	mainClass?: string | string[]
}

defineProps<Props>()

const modelValue = defineModel<boolean>({ default: false })
</script>

<style>
.click-bg {
	background: linear-gradient(0deg, #0073ff -1.25%, #00c2ff 100%);
}
</style>
