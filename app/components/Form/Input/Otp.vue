<template>
	<div class="flex space-x-2">
		<input
			v-for="(_, index) in digits"
			:key="index"
			ref="inputRefs"
			type="text"
			inputmode="numeric"
			maxlength="1"
			:class="[digitClass, { 'border !border-red-500': error }]"
			:value="code[index] || ''"
			@input="handleInput(index, $event)"
			@focus="handleFocus($event)"
			@paste="handlePaste($event)"
			@keydown="handleKeydown(index, $event)"
			:autofocus="index === 0"
			class="text-center outline-none caret-blue text-2xl leading-130 font-bold"
		/>
	</div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, nextTick } from 'vue'

interface Props {
	digits?: number
	error?: boolean
	digitClass?: string
}

const props = withDefaults(defineProps<Props>(), {
	digits: 6,
	error: false,
	digitClass: 'w-[60px] h-[58px] aspect-[30/29] rounded-[14px] p-[14px_0_13px_0] transition-300 bg-gray border-[1.5px] border-transparent focus:border-blue focus:bg-white'
})

const model = defineModel<string>({ default: '' })

const emit = defineEmits<{
	submit: []
}>()

const inputRefs = ref<HTMLInputElement[]>([])
const code = computed(() => model.value.split(''))

const focusInput = (index: number) => {
	nextTick(() => {
		inputRefs.value[index]?.focus()
	})
}

const updateValue = (newCode: string[]) => {
	model.value = newCode.join('')

	if (model.value.length === props.digits) {
		emit('submit')
	}
}

const handleInput = (index: number, event: Event) => {
	const target = event.target as HTMLInputElement
	const value = target.value.replace(/\D/g, '')

	const char = value.at(-1)
	if (!char) return

	const newCode = [...code.value]
	newCode[index] = char
	updateValue(newCode)

	if (index < props.digits - 1) {
		focusInput(index + 1)
	}
}

const handleKeydown = (index: number, event: KeyboardEvent) => {
	if (event.key === 'Backspace') {
		event.preventDefault()
		const newCode = [...code.value]

		if (newCode[index]) {
			newCode[index] = ''
			updateValue(newCode)
		} else if (index > 0) {
			newCode[index - 1] = ''
			updateValue(newCode)
			focusInput(index - 1)
		}
	}

	if (event.key === 'ArrowLeft' && index > 0) {
		event.preventDefault()
		focusInput(index - 1)
	}

	if (event.key === 'ArrowRight' && index < props.digits - 1) {
		event.preventDefault()
		focusInput(index + 1)
	}

	if (!/^\d$/.test(event.key) && !['Backspace', 'Delete', 'Tab', 'ArrowLeft', 'ArrowRight'].includes(event.key)) {
		event.preventDefault()
	}
}

const handleFocus = (event: Event) => {
	const target = event.target as HTMLInputElement
	target.select()
}

const handlePaste = (event: ClipboardEvent) => {
	event.preventDefault()
	const paste = event.clipboardData?.getData('text').replace(/\D/g, '') || ''

	if (!paste) return

	const pasteDigits = paste.slice(0, props.digits).split('')
	const newCode = [...code.value]

	pasteDigits.forEach((digit, i) => {
		newCode[i] = digit
	})

	updateValue(newCode)

	const nextIndex = Math.min(pasteDigits.length, props.digits - 1)
	focusInput(nextIndex)
}

onMounted(() => {
	focusInput(0)
})

defineExpose({
	focus: () => focusInput(0),
	clear: () => (model.value = '')
})
</script>
