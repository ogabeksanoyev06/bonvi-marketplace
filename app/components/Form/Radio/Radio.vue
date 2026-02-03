<template>
	<label
		class="transition-300 flex items-center justify-between relative select-none w-full"
		:class="[mainStyles, isChecked ? mainActiveClass : '', disabled ? 'cursor-not-allowed opacity-60' : 'cursor-pointer group', { 'py-3 pl-5': border }]"
		:style="{ minHeight: computedSize, '--btn-size': computedBtnSize }"
	>
		<!-- Label slot / default -->
		<slot name="label">
			<span
				class="text-sm font-medium leading-130 transition-300"
				:class="[labelStyles, isChecked ? labelActiveClass : 'text-[#242424]', { '!text-red-600': error && !isChecked }]"
			>
				{{ label }}
			</span>
		</slot>

		<!-- Hidden radio input -->
		<input type="radio" class="absolute opacity-0 w-0 h-0 peer" :name="name" :value="value" :checked="isChecked" :disabled="disabled" @change="handleChange" />

		<!-- Custom radio -->
		<span
			class="relative shrink-0 rounded-full border-2 bg-white transition-200"
			:class="[btnStyle || computedBtnStyles, isChecked ? 'border-blue !border-[5px]' : 'border-black/10', { '!border-red': error && !isChecked }]"
			:style="{ width: computedSize, height: computedSize }"
		></span>
	</label>
</template>

<script setup lang="ts">
interface Props {
	value?: string | number | boolean
	label?: string | number
	name?: string
	disabled?: boolean
	size?: number
	btnStyles?: string
	btnStyle?: string
	labelStyles?: string
	border?: boolean
	labelActiveClass?: string
	error?: boolean
	mainStyles?: string
	mainActiveClass?: string
}

const props = withDefaults(defineProps<Props>(), {
	disabled: false,
	size: 24,
	btnStyles: 'group-hover:border-blue',
	labelActiveClass: 'text-black'
})

// defineModel bilan v-model support
const modelValue = defineModel<string | number | boolean | null>({
	default: null
})

// Check if radio is selected
const isChecked = computed(() => {
	if (props.value !== undefined) {
		return modelValue.value === props.value
	}
	return !!modelValue.value
})

// Handle change
const handleChange = () => {
	if (props.disabled) return

	if (props.value !== undefined) {
		modelValue.value = props.value
	} else {
		modelValue.value = !modelValue.value
	}
}

// Computed styles
const computedSize = computed(() => props.size + 'px')
const computedBtnSize = computed(() => props.size * 0.5 + 'px')
const computedBtnStyles = computed(() => (!props.disabled ? props.btnStyles : 'peer-checked:before:!bg-gray-100'))
</script>
