<template>
	<div class="flex flex-col items-start gap-3 border-[1.5px] border-gray py-3 rounded-xl">
		<div class="flex-center-between gap-4 px-3">
			<div class="flex-y-center gap-1">
				<img src="/images/user.png" alt="user" class="rounded-full size-10 sm:size-14 aspect-square animate-pulse" />
				<h2 class="text-sm sm:text-lg font-bold !leading-130 line-clamp-2">
					{{ name }}
				</h2>
			</div>
			<div class="size-8 hidden sm:flex-center bg-blue rounded-full flex-shrink-0 p-1">
				<img src="/images/phone_call.svg" alt="phone" />
			</div>
		</div>

		<div class="w-full h-[1.5px] bg-gray" />

		<div class="flex flex-col items-start px-3">
			<h3 class="text-xs leading-130">Xizmati:</h3>
			<p class="text-xs sm:text-sm font-medium leading-30 text-blue">{{ service }}</p>
		</div>

		<div class="flex flex-col items-start px-3">
			<h3 class="text-xs leading-130">Telefon raqam:</h3>
			<a :href="`tel:${phone}`" class="text-xs sm:text-sm font-medium leading-30 text-blue">{{ phoneNumberFormat(phone) }}</a>
		</div>

		<div class="flex flex-col items-start px-3">
			<h3 class="text-xs leading-130">Manzili:</h3>
			<p class="text-xs sm:text-sm font-medium leading-30 text-blue">Toshkent shahri</p>
		</div>

		<div class="px-3 flex sm:hidden">
			<UIButton class="h-8 w-full text-xs">
				Bog‘lanish
				<img src="/images/phone_call.svg" alt="phone" class="size-6" />
			</UIButton>
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
