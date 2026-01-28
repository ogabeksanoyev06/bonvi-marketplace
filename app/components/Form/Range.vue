<template>
	<div ref="container">
		<div class="relative select-none touch-none w-full h-1">
			<!-- Track -->
			<div class="relative w-full h-1 bg-white rounded-full overflow-hidden">
				<!-- Active range -->
				<div class="absolute h-full bg-blue rounded-full" :style="rangeStyle" />
			</div>

			<!-- Thumb MIN -->
			<div
				class="absolute top-1/2 -translate-y-1/2 size-5 rounded-full bg-white border-2 border-blue cursor-pointer"
				:style="{ left: `calc(${minPercent}% - 0px)` }"
				@mousedown.prevent="startDrag('min')"
			/>

			<!-- Thumb MAX -->
			<div
				class="absolute top-1/2 -translate-y-1/2 size-5 rounded-full bg-white border-2 border-blue cursor-pointer"
				:style="{ left: `calc(${maxPercent}% - 20px)` }"
				@mousedown.prevent="startDrag('max')"
			/>
		</div>
	</div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
	min: { type: Number, default: 0 },
	max: { type: Number, default: 100 },
	step: { type: Number, default: 1 },
	modelMin: Number,
	modelMax: Number
})

const emit = defineEmits(['update:modelMin', 'update:modelMax'])

const container = ref(null)
const dragging = ref(null)

const minValue = ref(props.modelMin ?? props.min)
const maxValue = ref(props.modelMax ?? props.max)

const percent = (val) => ((val - props.min) / (props.max - props.min)) * 100

const minPercent = computed(() => percent(minValue.value))
const maxPercent = computed(() => percent(maxValue.value))

const rangeStyle = computed(() => ({
	left: minPercent.value + '%',
	width: maxPercent.value - minPercent.value + '%'
}))

const startDrag = (type) => {
	dragging.value = type
	document.addEventListener('mousemove', onDrag)
	document.addEventListener('mouseup', stopDrag)
}

const onDrag = (e) => {
	if (!dragging.value || !container.value) return

	const rect = container.value.getBoundingClientRect()
	let percentValue = ((e.clientX - rect.left) / rect.width) * 100
	percentValue = Math.min(100, Math.max(0, percentValue))
	const value = props.min + Math.round(((props.max - props.min) * percentValue) / 100 / props.step) * props.step
	if (dragging.value === 'min' && value < maxValue.value) {
		minValue.value = value
		emit('update:modelMin', value)
	}
	if (dragging.value === 'max' && value > minValue.value) {
		maxValue.value = value
		emit('update:modelMax', value)
	}
}

const stopDrag = () => {
	dragging.value = null
	document.removeEventListener('mousemove', onDrag)
	document.removeEventListener('mouseup', stopDrag)
}
</script>
