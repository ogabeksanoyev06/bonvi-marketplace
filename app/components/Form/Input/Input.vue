<template>
	<div
		class="bg-gray border border-transparent transition-300 focus-within:border-blue focus-within:bg-white flex items-center rounded-xl w-full"
		:class="[{ '!border-red-600': error }]"
	>
		<div v-if="$slots.prefix" class="h-max pl-3 flex-center pointer-events-none transition-300" :class="prefixClass">
			<slot name="prefix" />
		</div>

		<input
			:id="inputId ?? id"
			ref="inputRef"
			v-model="model"
			:type="type"
			:placeholder="placeholder"
			:disabled="disabled"
			:readonly="readonly"
			:minlength="minlength"
			:maxlength="maxlength"
			:max="max"
			:min="min"
			:autocomplete="autocomplete"
			class="w-full h-full py-3 text-sm caret-blue font-medium bg-transparent outline-none text-black leading-130 placeholder:text-[#919392]"
			:class="inputClass"
			@keyup.enter="emit('enter', $event)"
			@blur="emit('blur', $event)"
			@focusout="emit('focusout', $event)"
			@focus="emit('focus', $event)"
		/>

		<div v-if="$slots.suffix" class="h-max px-3 flex-center pointer-events-none transition-300" :class="suffixClass">
			<slot name="suffix" />
		</div>
	</div>
</template>

<script setup lang="ts">
interface Props {
	id?: string
	type?: string
	placeholder?: string
	modelValue?: string | number
	disabled?: boolean
	error?: boolean
	focus?: boolean
	maxlength?: number
	minlength?: number
	max?: number
	min?: number
	inputClass?: string | string[]
	prefixClass?: string | string[] | object
	suffixClass?: string | string[] | object
	autocomplete?: string
	inputId?: string
	readonly?: boolean
}

const props = withDefaults(defineProps<Props>(), {
	type: 'text',
	modelValue: '',
	maxlength: 99,
	autocomplete: 'new-password'
})

const emit = defineEmits<{
	blur: [event: FocusEvent]
	focusout: [event: FocusEvent]
	focus: [event: FocusEvent]
	enter: [event: KeyboardEvent]
}>()

const model = defineModel<string | number>({ default: '' })

const inputRef = ref<HTMLInputElement | null>(null)

defineExpose({
	input: inputRef,
	focus: () => inputRef.value?.focus(),
	blur: () => inputRef.value?.blur()
})

watch(
	() => props.focus,
	(shouldFocus) => {
		if (shouldFocus) {
			nextTick(() => inputRef.value?.focus())
		}
	},
	{ immediate: true }
)
</script>
