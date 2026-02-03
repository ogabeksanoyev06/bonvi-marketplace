<template>
	<UIModal :no-header="true" v-model="isOpen">
		<div v-if="status === 'error'" class="py-6 flex flex-col gap-5">
			<div class="px-4 flex flex-col items-center gap-6">
				<div class="flex-center size-[112px] rounded-full bg-[#F78229] shadow-[0_10px_40px_0_rgba(247,130,41,0.30)]">
					<img src="/images/checkout/error.svg" alt="warnig" class="size-16" />
				</div>
				<div class="flex flex-col items-center text-center gap-2">
					<h3 class="text-2xl font-bold leading-130">To'lov xatosi</h3>
					<p class="text-base leading-130">To'lovni qayta ishlashda kutilmagan xato yuz berdi. Iltimos, yana urinib ko'ring.</p>
				</div>
			</div>
			<div class="grid grid-cols-1 md:grid-cols-2 gap-2.5 px-6">
				<UIButton text="Asosiyga qaytish" variant="secondary" class="h-[46px]" />
				<UIButton text="Takrorlash" class="h-[46px]" />
			</div>
		</div>

		<div v-else-if="status === 'pending'" class="py-6 flex flex-col gap-5">
			<div class="px-4 flex flex-col items-center gap-6">
				<div class="flex-center size-[112px] rounded-full bg-[#FAD231] shadow-[0_10px_40px_0_rgba(250,210,49,0.30)]">
					<img src="/images/checkout/pending.svg" alt="warnig" class="size-16" />
				</div>
				<div class="flex flex-col items-center text-center gap-2">
					<h3 class="text-2xl font-bold leading-130">Kutish jarayonida</h3>
					<p class="text-base leading-130">Buyurtma javobi kutilmoqda, iltimos biroz kuting.</p>
				</div>
			</div>
			<div class="grid grid-cols-1 md:grid-cols-2 gap-2.5 px-6">
				<UIButton text="Ortga qaytish" variant="secondary" class="h-[46px]" />
				<UIButton text="Takrorlash" class="h-[46px]" />
			</div>
		</div>

		<div v-else-if="status === 'success'" class="py-6 flex flex-col gap-5">
			<div class="px-4 flex flex-col items-center gap-6">
				<div class="flex-center size-[112px] rounded-full bg-[#35C04C] shadow-[0_10px_40px_0_rgba(53,192,76,0.20)]">
					<img src="/images/checkout/success.svg" alt="warnig" class="size-16" />
				</div>
				<div class="flex flex-col items-center text-center gap-2">
					<h3 class="text-2xl font-bold leading-130">Muvafaqiyatli</h3>
					<p class="text-base leading-130">To’lov muvafaqiyatli tarzda amalga oshirildi</p>
				</div>
			</div>

			<div class="px-6 flex flex-col">
				<div class="flex items-center justify-between border-b border-gray py-3">
					<span>Mahsulotlar soni</span>
					<span class="text-base font-bold leading-130">15 dona</span>
				</div>
				<div class="flex items-center justify-between border-b border-gray py-3">
					<span>Mahsulotlar narxi</span>
					<span class="text-base font-bold leading-130">15 <span class="text-xs font-normal">UZS</span></span>
				</div>
				<div class="flex items-center justify-between border-b border-gray py-3">
					<span>Chegirma</span>
					<span class="text-base font-bold leading-130">15 <span class="text-xs font-normal">UZS</span></span>
				</div>
				<div class="flex items-center justify-between border-b border-gray py-3">
					<span>Yetkazib berish narxi</span>
					<span class="text-base font-bold leading-130">15 <span class="text-xs font-normal">UZS</span></span>
				</div>
				<div class="flex items-center justify-between border-b border-gray py-3">
					<span class="font-bold">Umumiy:</span>
					<span class="text-base font-bold leading-130">103 900 <span class="text-xs font-normal">UZS</span></span>
				</div>
			</div>
			<div class="grid grid-cols-1 md:grid-cols-2 gap-2.5 px-6">
				<UIButton text="Asosiyga qaytish" variant="secondary" class="h-[46px]" />
				<UIButton text="Kuzatish" class="h-[46px]" />
			</div>
		</div>
	</UIModal>
</template>

<script setup lang="ts">
const isOpen = defineModel<boolean>('modelValue', { required: true })

const props = defineProps<{
	status: 'error' | 'pending' | 'success'
}>()
</script>
