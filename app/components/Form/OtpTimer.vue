<template>
	<Transition name="fade" mode="out-in">
		<div v-if="timer" class="flex items-center gap-1">
			<p class="text-xs font-medium">Qolgan vaqt</p>
			<div class="bg-gray rounded-full px-2 py-1 flex-center">
				<span class="text-[#999EA1] text-xs font-medium">{{ time }}</span>
			</div>
		</div>
		<button v-else class="inline-flex items-center group gap-1.5" @click="$emit('resend')">
			Kodni qayta yuborish
			<div class="size-6 flex-center bg-blue rounded-lg">
				<span class="icon-refresh text-white text-base leading-4 transition-300 group-hover:rotate-[360deg]"></span>
			</div>
		</button>
	</Transition>
</template>

<script setup>
import { ref, watch, onBeforeMount } from 'vue'

const props = defineProps({
	secondsVal: Number,
	timer: Boolean
})

const emit = defineEmits(['timeout', 'resend'])

const seconds = ref(0)
const time = ref('')

const countDown = () => {
	seconds.value--

	const mm = Math.floor(seconds.value / 60)
	const ss = Math.floor(seconds.value % 60)

	time.value = `${mm > 9 ? mm : '0' + mm}:${ss > 9 ? ss : '0' + ss}`
}

watch(
	() => props.secondsVal,
	() => {
		seconds.value = props.secondsVal
		countDown()
	},
	{ immediate: true }
)

let interval

onBeforeMount(() => {
	interval = setInterval(() => {
		countDown()

		if (seconds.value < 1) {
			clearInterval(interval)
			time.value = '00:00'
			emit('timeout')
		}
	}, 1000)
})
</script>
