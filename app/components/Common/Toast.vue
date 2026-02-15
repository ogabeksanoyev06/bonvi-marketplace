<template>
	<div class="relative flex items-center justify-between gap-2 bg-black overflow-hidden pl-3 pr-4 py-3 rounded-xl z-50">
		<div class="flex items-center gap-2">
			<div
				class="size-7 flex-center rounded-lg p-1"
				:class="{
					'bg-[#35C04C]': type === 'success',
					'bg-red-500': type === 'error',
					'bg-yellow-400': type === 'warning',
					'bg-blue-500': type === 'info'
				}"
			>
				<img src="/svg/toast/success.svg" alt="icon" v-if="type === 'success'" />
				<img src="/svg/toast/error.svg" alt="icon" v-if="type === 'error'" />
				<img src="/svg/toast/warning.svg" alt="icon" v-if="type === 'warning'" />
				<img src="/svg/toast/info.svg" alt="icon" v-if="type === 'info'" />
			</div>

			<h2 class="text-white font-medium text-sm">{{ text }}</h2>
		</div>
		<div id="countdown" class="relative h-7 w-7 text-center bg-transparent rounded-full flex items-center justify-center">
			<div id="countdown-number">
				<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
					<path d="M5 5L15 15M15 5L5 15" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
				</svg>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
const props = defineProps({
	text: {
		type: String,
		required: true
	},
	type: {
		type: String,
		required: true
	}
})
</script>

<style>
.Vue-Toastification__toast {
	align-items: flex-start;
	border-radius: 14px !important;
	border: 1px rgba(255, 255, 255, 0.08) !important;
	background: transparent !important;
	box-shadow: 0px 4px 20px 0px rgba(17, 16, 20, 0.16) !important;
	backdrop-filter: blur(4px) !important;
	display: flex !important;
	justify-content: space-between !important;
	min-height: auto !important;
	overflow: visible !important;
	padding: 0 !important;
}
</style>
