<template>
	<label
		class="group inline-flex items-center relative select-none"
		:class="disabled ? 'cursor-not-allowed' : 'cursor-pointer'"
		@click="handleClick"
		@keydown.space.prevent="handleClick"
	>
		<span role="checkbox" :aria-checked="indeterminate ? 'mixed' : modelValue" :aria-disabled="disabled" tabindex="0" class="checkbox-box flex-center" :class="checkboxClasses">
			<svg v-if="modelValue && !indeterminate" xmlns="http://www.w3.org/2000/svg" width="11" height="8" viewBox="0 0 11 8" fill="none">
				<path d="M1 4.6L3.4 7L9.4 1" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
			</svg>

			<svg v-if="indeterminate" class="absolute inset-0 m-auto transition-all duration-200" xmlns="http://www.w3.org/2000/svg" width="10" height="2" viewBox="0 0 10 2" fill="none">
				<path d="M1 1H9" stroke="white" stroke-width="2" stroke-linecap="round" />
			</svg>
		</span>

		<span v-if="label || $slots.label" class="ml-2 leading-130 text-sm text-[#1F1F24]">
			<slot name="label">
				<span class="leading-130 text-sm text-[#1F1F24] font-medium" :class="labelStyles">
					{{ label }}
				</span>
			</slot>
		</span>
	</label>
</template>

<script setup lang="ts">
interface Props {
	label?: string
	disabled?: boolean
	error?: boolean
	labelStyles?: string | string[]
	indeterminate?: boolean
	checkboxStyles?: string | string[]
}

const props = withDefaults(defineProps<Props>(), {
	disabled: false,
	error: false,
	indeterminate: false
})

const modelValue = defineModel<boolean>({ default: false })

const handleClick = () => {
	if (props.disabled) return

	if (props.indeterminate) {
		modelValue.value = true
	} else {
		modelValue.value = !modelValue.value
	}
}

const checkboxClasses = computed(() => [
	// Base styles
	'shrink-0 duration-200 ease-in-out inline-block h-6 w-6 rounded-md border-[1.5px] bg-white border-[#D9DCDC] relative',

	// Checked state
	modelValue.value && '!border-blue !bg-blue',

	// Indeterminate state
	props.indeterminate && '!border-blue !bg-blue',

	// Error state
	props.error && '!border-red bg-white',

	// Hover effect
	!props.disabled && 'group-hover:border-blue group-hover:bg-white',

	// Custom styles
	props.checkboxStyles
])
</script>

<style scoped>
.checkbox-box {
	outline: none;
}

.checkbox-box:focus-visible {
	@apply ring-2 ring-blue ring-offset-2;
}
</style>
