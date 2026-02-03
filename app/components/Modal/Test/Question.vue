<template>
	<UIModal v-model="isOpen" body-class="!max-w-[800px]" header-style="max-md:!px-4 max-md:py-3">
		<!-- Header -->
		<template #header-title>
			<div class="flex items-center gap-2">
				<h4 class="text-lg font-medium !leading-130">Savol:</h4>
				<span class="text-xl font-bold leading-130 text-blue font-mtse-extended"> {{ currentIndex + 1 }}/{{ questions.length }} </span>
			</div>
		</template>

		<div class="px-6 md:pb-6 pb-3 overflow-x-hidden">
			<!-- Timer -->
			<div class="flex-y-center gap-0.5 py-4">
				<span class="timer-box font-astro-head">1</span>
				<span class="timer-box font-astro-head">0</span>
				<span class="text-sm font-bold text-[#FFBD14]">:</span>
				<span class="timer-box font-astro-head">0</span>
				<span class="timer-box font-astro-head">0</span>
			</div>

			<!-- Animated Savol blok -->
			<transition name="fade" mode="out-in">
				<div :key="currentIndex">
					<!-- Savol matni -->
					<h3 class="text-base md:text-xl font-bold !leading-140 mb-5">
						{{ activeQuestion.question }}
					</h3>

					<!-- Javoblar -->
					<div class="flex flex-col gap-3 p-3 bg-blue-light rounded-[28px] mb-4">
						<span class="text-sm font-medium text-gray-4 text-center"> Javoblardan birini tanlang: </span>
						<FormRadio
							v-for="answer in activeQuestion.answers"
							:key="answer.id"
							v-model="selected"
							:value="answer.id"
							:label="answer.title"
							name="answer"
							class="border border-gray p-3 rounded-xl bg-white"
							main-active-class="!border-blue"
							label-styles="!text-base !font-medium !leading-130"
							label-active-class="!font-bold"
						/>
					</div>
				</div>
			</transition>

			<!-- Navigation -->
			<div class="grid grid-cols-2 gap-2.5 max-md:pt-3 -mx-2">
				<UIButton variant="secondary" class="h-12" @click="prevQuestion">
					<svg width="24" height="24" fill="none">
						<path d="M5 12H19M5 12L11 6M5 12L11 18" stroke="black" stroke-width="2" stroke-linecap="round" />
					</svg>
					<span>Ortga qaytish</span>
				</UIButton>

				<UIButton class="h-12" @click="nextQuestion">
					<span>Davom etish</span>
					<svg width="24" height="24" fill="none">
						<path d="M5 12H19M19 12L13 6M19 12L13 18" stroke="white" stroke-width="2" stroke-linecap="round" />
					</svg>
				</UIButton>
			</div>
		</div>
	</UIModal>
	<ModalTestFinish v-model="isFinishOpen" />
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
	questions: {
		type: Array,
		required: true
	}
})

const isOpen = defineModel('modelValue', { required: true })
const isFinishOpen = ref(false)

const answersState = ref(Array(props.questions.length).fill(null))
const currentIndex = ref(0)
const direction = ref('next')

const activeQuestion = computed(() => props.questions[currentIndex.value])

const selected = computed({
	get() {
		return answersState.value[currentIndex.value]
	},
	set(val) {
		answersState.value[currentIndex.value] = val
	}
})

// Keyingi savol
function nextQuestion() {
	if (selected.value === null) return
	if (currentIndex.value < props.questions.length - 1) {
		direction.value = 'next'
		currentIndex.value++
	}
}

// Oldingi savol
function prevQuestion() {
	if (currentIndex.value > 0) {
		direction.value = 'prev'
		currentIndex.value--
	}
}
</script>

<style scoped>
.timer-box {
	@apply px-1.5 py-1 bg-[#FFBD141F] rounded flex items-center justify-center w-7 h-[26px] text-[#FFBD14] text-xl font-bold;
}

/* Fade animatsiya */
.fade-enter-active,
.fade-leave-active {
	transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
	opacity: 0;
}
.fade-enter-to,
.fade-leave-from {
	opacity: 1;
}
</style>
