<template>
	<label
		class="group inline-flex items-center relative select-none"
		:class="disabled ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'"
		@click="handleClick"
		@keydown.space.prevent="handleClick"
	>
		<!-- Checkbox box -->
		<span
			role="checkbox"
			tabindex="0"
			:aria-checked="indeterminate ? 'mixed' : isChecked"
			:aria-disabled="disabled"
			class="flex-center shrink-0 h-6 w-6 rounded-md border-[2px] relative transition-300"
			:class="checkboxClasses"
		>
			<!-- Checked -->
			<svg v-if="isChecked && !indeterminate" xmlns="http://www.w3.org/2000/svg" width="11" height="8" viewBox="0 0 11 8" fill="none">
				<path d="M1 4.6L3.4 7L9.4 1" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
			</svg>

			<!-- Indeterminate -->
			<svg v-if="indeterminate" xmlns="http://www.w3.org/2000/svg" width="12" height="2" viewBox="0 0 12 2" fill="none">
				<path d="M1 1H11" stroke="white" stroke-width="2" stroke-linecap="round" />
			</svg>
		</span>

		<!-- Label -->
		<span v-if="label || $slots.label" class="text-sm leading-130 text-[#1F1F24]">
			<slot name="label">
				<span class="font-medium" :class="labelStyles">
					{{ label }}
				</span>
			</slot>
		</span>
	</label>
</template>

<script setup lang="ts">
import { computed } from 'vue'

type CheckboxValue = string | number

interface Props {
	label?: string
	value?: CheckboxValue
	disabled?: boolean
	error?: boolean
	indeterminate?: boolean
	labelStyles?: string | string[]
	checkboxStyles?: string | string[]
}

const props = withDefaults(defineProps<Props>(), {
	disabled: false,
	error: false,
	indeterminate: false
})

const modelValue = defineModel<boolean | CheckboxValue[]>({
	default: false
})

const isChecked = computed<boolean>(() => {
	if (Array.isArray(modelValue.value)) {
		return props.value !== undefined ? modelValue.value.includes(props.value) : false
	}
	return modelValue.value
})

const handleClick = () => {
	if (props.disabled) return

	if (Array.isArray(modelValue.value)) {
		if (props.value === undefined) return

		const index = modelValue.value.indexOf(props.value)

		if (index === -1) {
			modelValue.value.push(props.value)
		} else {
			modelValue.value.splice(index, 1)
		}
		return
	}

	modelValue.value = !modelValue.value
}

const checkboxClasses = computed(() => [
	'bg-white border-[#D9DCDC]',
	isChecked.value && '!bg-blue !border-blue',
	props.indeterminate && '!bg-blue !border-blue',
	props.error && '!border-red bg-white',
	!props.disabled && 'group-hover:border-blue',
	props.checkboxStyles
])
</script>

<style scoped></style>
