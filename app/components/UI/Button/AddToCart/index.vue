<template>
	<div class="w-full">
		<Transition name="fade" mode="out-in">
			<!-- Quantity selector -->
			<div v-if="counter" class="flex items-center gap-2 py-2 px-3 h-10 border border-blue rounded-full bg-white w-full">
				<button @click="decrease" :disabled="disableDecrease" class="counterClass">
					<span class="icon-minus shrink-0 text-2xl leading-6 transition-300"></span>
				</button>

				<span class="flex-1 text-center text-base font-bold leading-130 cursor-not-allowed">7</span>

				<button @click="increase" :disabled="disableIncrease" class="counterClass relative">
					<span class="icon-plus shrink-0 text-2xl leading-6 transition-300"></span>
					<UITooltip with-trigger :show="false" class="whitespace-nowrap"> Max 4 </UITooltip>
				</button>
			</div>

			<!-- Add to Cart button (hozircha yashirin) -->
			<UIButton v-else class="!bg-[#0083FF14] !text-blue !w-full" @click="counter = true">
				Savatga qo‘shish
				<img src="/images/shopping-bag.svg" alt="" class=" size-5 sm:size-6" />
			</UIButton>
		</Transition>
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const disableIncrease = ref(false)
const disableDecrease = ref(false)

const counter = ref(false)

const increase = () => {
	console.log('Increase clicked')
}

const decrease = () => {
	console.log('Decrease clicked')
}
</script>
