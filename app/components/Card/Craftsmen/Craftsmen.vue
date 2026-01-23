<template>
	<div class="flex flex-col items-start gap-3 border-[1.5px] border-gray py-3 rounded-xl">
		<h2 class="text-lg font-bold leading-130 px-3 whitespace-pre-line">
			{{ name }}
		</h2>

		<div class="w-full h-[1.5px] bg-gray" />

		<div class="flex flex-col items-start px-3">
			<h3 class="text-xs leading-130">Xizmati:</h3>
			<p class="text-sm font-medium leading-30 text-blue">{{ service }}</p>
		</div>

		<div class="flex flex-col items-start px-3">
			<h3 class="text-xs leading-130">Telefon raqam:</h3>
			<a :href="`tel:${phone}`" class="text-sm font-medium leading-30 text-blue">{{ phoneNumberFormat(phone) }}</a>
		</div>
	</div>
</template>

<script lang="ts" setup>
interface Props {
	name: string
	service: string
	phone: string
}
defineProps<Props>()
</script>
