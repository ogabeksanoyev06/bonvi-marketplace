<template>
	<div class="flex items-center justify-between bg-gray rounded-2xl transition-300 p-3 sm:hover:-translate-y-1">
		<div class="flex items-center gap-2">
			<div class="size-10 flex-center p-1.5 bg-white rounded-[10px]">
				<img src="/images/uzcard-logo.svg" alt="" class="size-7 object-contain" />
			</div>
			<div class="flex flex-col gap-1">
				<span class="text-sm leading-130 font-bold">Uzcard</span>
				<span class="text-xs leading-130 text-[#77828A]">**** 2743</span>
			</div>
		</div>
		<UIButton text="" icon="icon-trash text-xl text-gray-4 group-hover:text-red" class="!size-10 !rounded-lg !bg-white" @click="isOpen = true" />

		<ModalPaymentsDeleteCard v-model="isOpen" />
	</div>
</template>

<script setup lang="ts">
const isOpen = ref(false)
</script>
