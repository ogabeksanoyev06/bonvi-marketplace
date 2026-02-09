<template>
	<div class="flex flex-col gap-5 bg-white rounded-3xl p-5">
		<div class="flex items-center justify-between pb-3">
			<h3 class="text-xl leading-130 font-bold">Kartalarim</h3>
			<UIButton class="h-11 hidden md:inline-flex !font-medium" @click="isOpen = true">
				<i class="icon-plus text-2xl"></i>
				<span>Karta qo‘shish</span>
			</UIButton>
		</div>
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
			<CardPayment v-for="key in 3" :key />
		</div>

		<UIButton class="h-11 md:hidden !font-medium" @click="isOpen = true">
			<i class="icon-plus text-2xl"></i>
			<span>Karta qo‘shish</span>
		</UIButton>

		<ModalPaymentsAddCard v-model="isOpen" />
	</div>
</template>

<script setup lang="ts">
const isOpen = ref(false)
</script>
