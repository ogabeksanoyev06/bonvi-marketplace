<template>
	<div :class="['code-input', className, { error }]">
		<label v-if="label" class="mb-2 block text-sm leading-130 font-medium text-dark" :for="`${uid}-0`">
			{{ label }}
		</label>

		<div class="flex-y-center gap-2">
			<div v-for="(_, index) in values" :key="`${uid}-${index}`" class="relative overflow-hidden !rounded-none">
				<input
					:id="`${uid}-${index}`"
					:ref="
						(el) => {
							if (el) inputs[index] = el
						}
					"
					class="w-[60px] aspect-[30/29] text-center outline-none transition-300 border-2 border-transparent bg-gray rounded-[14px] focus-within:border-primary focus-within:bg-white focus-within:border-blue font-bold text-2xl text-dark leading-140 overflow-hidden"
					:class="inputClass"
					:value="values[index]"
					:data-id="index"
					inputmode="numeric"
					autocomplete="one-time-code"
					pattern="[0-9]*"
					maxlength="1"
					:aria-invalid="error || null"
					@input="onInput($event, index)"
					@focus="onFocus($event, index)"
					@keydown="onKeyDown($event, index)"
					@paste="onPaste"
					@blur="activeIndex = null"
				/>
			</div>
		</div>
	</div>
</template>

<script setup>
import { nextTick, onBeforeUpdate, onMounted, ref, watch } from 'vue'

const props = defineProps({
	modelValue: { type: String, default: '' }, // v-model
	fields: { type: Number, default: 6 },
	step: { type: Number, default: 1 },
	label: { type: String, default: '' },
	className: { type: String, default: '' },
	inputClass: { type: String, default: '' },
	error: { type: Boolean, default: false },
	autoFocus: { type: Boolean, default: true } // ixtiyoriy
})
const emit = defineEmits(['change', 'complete', 'update:modelValue'])

const uid = `otp-${Math.random().toString(36).slice(2, 8)}`
const values = ref(Array.from({ length: props.fields }, (_, i) => props.modelValue[i] || ''))
const inputs = ref([]) // 0-based refs
const activeIndex = ref(null)

const focusIndex = (i) => {
	const el = inputs.value[i]
	if (el) {
		el.focus()
		el.select?.()
	}
}

const firstEmpty = () => {
	const idx = values.value.findIndex((v) => v === '')
	return idx === -1 ? props.fields - 1 : idx
}

const syncFromModel = (val) => {
	const digits = (val || '').replace(/\D/g, '').slice(0, props.fields)
	for (let i = 0; i < props.fields; i++) {
		values.value[i] = digits[i] || ''
	}
}

const triggerChange = () => {
	const joined = values.value.join('')
	emit('update:modelValue', joined)
	emit('change', joined)
	if (joined.length === props.fields) {
		emit('complete', joined)
	}
}

const onFocus = (e, index) => {
	activeIndex.value = index
	e.target.select?.()
}

const fillFromIndex = (index, text) => {
	const digits = (text || '').replace(/\D/g, '')
	if (!digits) return

	let cursor = index
	for (let i = 0; i < digits.length && cursor < props.fields; i++, cursor++) {
		values.value[cursor] = digits[i]
	}

	triggerChange()
	const next = Math.min(firstEmpty(), props.fields - 1)
	focusIndex(next)
}

const onInput = (e, index) => {
	const raw = e.target.value
	// Bir nechta raqam kirsa (mobil klaviatura takliflari / paste) — tarqatamiz
	if (raw.length > 1) {
		fillFromIndex(index, raw)
		return
	}

	const digit = raw.replace(/\D/g, '')
	if (digit === '') {
		values.value[index] = ''
		triggerChange()
		return
	}

	values.value[index] = digit
	triggerChange()

	// keyingi xonaga o‘tish
	const next = index + 1
	if (next < props.fields) focusIndex(next)
}

const onKeyDown = (e, index) => {
	const { key } = e
	if (key === 'Backspace') {
		e.preventDefault()
		if (values.value[index] !== '') {
			values.value[index] = ''
			triggerChange()
			return
		}
		// Oldingisiga qaytib, o‘chirish
		if (index > 0) {
			const prev = index - 1
			values.value[prev] = ''
			triggerChange()
			focusIndex(prev)
		}
		return
	}

	if (key === 'ArrowLeft') {
		e.preventDefault()
		if (index > 0) focusIndex(index - 1)
		return
	}
	if (key === 'ArrowRight') {
		e.preventDefault()
		if (index < props.fields - 1) focusIndex(index + 1)
		return
	}

	// faqat raqam
	if (key.length === 1 && !/^\d$/.test(key)) {
		e.preventDefault()
	}
}

const onPaste = (e) => {
	e.preventDefault()
	const start = activeIndex.value ?? 0
	const text = e.clipboardData?.getData('text') || ''
	fillFromIndex(start, text)
}

watch(
	() => props.modelValue,
	(val) => {
		const joined = values.value.join('')
		if ((val || '') !== joined) syncFromModel(val)
	}
)

watch(
	() => props.step,
	async (v) => {
		if (v === 2 && props.autoFocus) {
			await nextTick()
			focusIndex(firstEmpty())
		}
	},
	{ immediate: true }
)

onBeforeUpdate(() => {
	inputs.value = []
})

onMounted(() => {
	if (props.autoFocus && props.step !== 2) {
		setTimeout(() => focusIndex(firstEmpty()), 300)
	}
})
</script>

<style>
.error input {
	border-color: #ff334c !important;
}
</style>
