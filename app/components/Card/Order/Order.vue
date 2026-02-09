<template>
	<NuxtLinkLocale to="/profile/orders/1" class="flex flow-row max-sm:items-center sm:flex-col gap-3 bg-white rounded-2xl transition-300 hover:shadow-card overflow-hidden">
		<UIImage
			src="/images/bonvi-product.png"
			class="sm:max-h-[234px] w-[124px] sm:w-full h-full flex-center md:py-8 md:px-9"
			image-class="h-[184px] sm:!h-[172px] sm:!w-[207px] !object-contain"
		/>
		<div class="flex flex-col gap-2.5 sm:gap-3 py-3 pr-3 sm:px-3 sm:pb-3 flex-1">
			<div class="flex items-center justify-between">
				<span class="text-[13px] sm:text-base leading-130 font-bold">#123456</span>
				<div class="flex items-center gap-1 sm:gap-1.5">
					<img src="/images/order/accepted.svg" alt="status" class="size-4 sm:size-5 shrink-0" />
					<span class="text-[13px] sm:text-base !leading-130 font-medium">Ko‘rib chiqilmoqda</span>
				</div>
			</div>
			<div class="w-full h-px bg-gray"></div>

			<div class="flex flex-col gap-2.5 sm:gap-3">
				<div class="flex flex-col gap-0.5 sm:flex-row sm:items-center sm:justify-between">
					<span class="text-xs leading-130 font-normal text-gray-4">Qabul qilingan vaqti:</span>
					<span class="text-xs leading-130 font-medium">20.10.2024</span>
				</div>
				<div class="flex flex-col gap-0.5 sm:flex-row sm:items-center sm:justify-between">
					<span class="text-xs leading-130 font-normal text-gray-4">Taxminiy yetkazilish vaqti:</span>
					<span class="text-xs leading-130 font-medium">21.10.2024</span>
				</div>
			</div>
			<div class="w-full h-px bg-gray"></div>
			<div class="flex items-center justify-between">
				<span class="text-xs leading-130 font-medium text-gray-4">Narxi:</span>
				<span class="text-base leading-130 font-bold">320 000 UZS</span>
			</div>
		</div>
	</NuxtLinkLocale>
</template>

<script setup lang="ts"></script>
