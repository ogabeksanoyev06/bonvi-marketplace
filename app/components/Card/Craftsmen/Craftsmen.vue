<template>
	<div class="flex flex-col items-start gap-3 border-[1.5px] border-gray py-3 rounded-xl">
		<div class="flex-center-between gap-2.5 px-3">
			<h2 class="text-lg font-bold leading-130 whitespace-pre-line line-clamp-2">
				{{ name }}
			</h2>
			<div class="size-8 flex-center bg-blue rounded-full flex-shrink-0 p-1">
				<img src="/images/phone_call.svg" alt="" />
			</div>
		</div>

		<div class="w-full h-[1.5px] bg-gray" />

		<div class="flex flex-col items-start px-3">
			<h3 class="text-xs leading-130">Xizmati:</h3>
			<p class="text-sm font-medium leading-30 text-blue">{{ service }}</p>
		</div>

		<div class="flex flex-col items-start px-3">
			<h3 class="text-xs leading-130">Telefon raqam:</h3>
			<a :href="`tel:${phone}`" class="text-sm font-medium leading-30 text-blue">{{ phoneNumberFormat(phone) }}</a>
		</div>

		<div class="flex flex-col items-start px-3">
			<h3 class="text-xs leading-130">Manzili:</h3>
			<p class="text-sm font-medium leading-30 text-blue">Toshkent shahri</p>
		</div>
	</div>
</template>

<script lang="ts" setup>
interface Props {
	name: string
	service: string
	phone: string
	city: string
}
defineProps<Props>()
</script>
