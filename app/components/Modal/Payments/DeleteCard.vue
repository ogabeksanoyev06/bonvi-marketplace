<template>
	<UIModal v-model="isOpen" :no-header="true" bodyClass="!max-w-[480px]">
		<div class="flex flex-col items-center gap-5 py-6 px-6">
			<div class="size-[112px] flex-center rounded-full bg-red p-6 shadow-[0_10px_40px_0_rgba(241,16,0,0.3)]">
				<i class="icon-trash text-[64px] leading-[64px] text-white"></i>
			</div>
			<div class="flex flex-col items-center text-center gap-2 w-full">
				<h3 class="text-2xl leading-130 font-bold">Kartani o‘chirish</h3>
				<p class="text-base leading-130">Haqiqatdan ham kartangizni o’chirmoqchimisiz?</p>
			</div>
			<div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5 w-full">
				<UIButton text="Bekor qilish" @click="isOpen = false" />
				<UIButton text="O`chirish" class="!text-red !bg-red/15" />
			</div>
		</div>
	</UIModal>
</template>

<script setup lang="ts">
const isOpen = defineModel<boolean>('modelValue', { required: true })
</script>
