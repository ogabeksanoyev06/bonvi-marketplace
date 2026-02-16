<template>
	<div class="flex flex-col items-start gap-3 border-[1.5px] border-gray py-3 rounded-xl transition-300 hover:shadow-card">
		<div class="flex-center-between gap-4 px-3">
			<div class="flex-y-center gap-1">
				<img :src="item?.avatar_url || '/images/user.png'" alt="user" class="rounded-full size-10 sm:size-11 aspect-square" />
				<h2 class="text-sm sm:text-base font-bold !leading-130 line-clamp-2">
					{{ item?.full_name }}
				</h2>
			</div>
			<div class="size-8 hidden sm:flex-center bg-blue rounded-full flex-shrink-0 p-1">
				<img src="/images/phone_call.svg" alt="phone" />
			</div>
		</div>

		<div class="w-full h-[1.5px] bg-gray" />

		<div class="flex flex-col items-start px-3">
			<h3 class="text-xs leading-130">Xizmati:</h3>
			<p class="text-xs sm:text-sm font-medium leading-30 text-blue">{{ item?.service_type }}</p>
		</div>

		<div class="flex flex-col items-start px-3">
			<h3 class="text-xs leading-130">Telefon raqam:</h3>
			<a v-if="item" :href="`tel:`" class="text-xs sm:text-sm font-medium leading-30 text-blue"> {{ phoneNumberFormat('+998930819140') }} </a>
			<span v-else class="text-xs sm:text-sm font-medium leading-30 text-gray-500">Mavjud emas</span>
		</div>

		<div class="flex flex-col items-start px-3">
			<h3 class="text-xs leading-130">Manzili:</h3>
			<p class="text-xs sm:text-sm font-medium leading-30 text-blue">{{ item?.address }}</p>
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
import type { ICraftsmenItem } from '~/types/craftsmen.d'

interface Props {
	item: ICraftsmenItem
}

const { item } = defineProps<Props>()
</script>
