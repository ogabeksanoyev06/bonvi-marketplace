<template>
	<div class="flex sm:items-center p-4 gap-2 sm:gap-4 w-full max-sm:h-[200px]">
		<UIImage
			src="/images/bonvi-product.png"
			class="w-[128px] sm:w-[130px] h-full md:aspect-square rounded-[28px] bg-blue-light"
			image-class="!object-contain w-[130px] aspect-square"
		/>
		<div class="flex items-start md:items-end md:flex-row flex-col w-full gap-4 flex-1 md:justify-between">
			<div class="flex flex-col gap-3 max-w-[574px] flex-1">
				<div class="flex flex-col justify-between gap-2">
					<h4 class="text-base md:text-lg font-semibold">Qariyalar uchun mapet</h4>
					<p class="md:text-sm text-xs !leading-130 line-clamp-2">
						12V tizimlar uchun ishonchli quvvat manbai. Barqaror kuchlanish beradi, o‘rnatish oson ва uzoq muddat xizmat qiladi.
					</p>
				</div>
				<div class="flex gap-1.5 items-center">
					<span class="text-sm sm:text-base !leading-130 font-medium">4 dona</span>
					<span class="size-1.5 rounded-full bg-gray"></span>
					<span class="text-sm sm:text-base !leading-130 font-medium">1 300 000 UZS dan</span>
				</div>
			</div>
			<div class="flex items-center gap-2">
				<span class="text-lg font-medium text-[#6B6B6E]">Jami:</span>
				<span class="text-lg sm:text-xl font-bold leading-130">2 600 000 UZS</span>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts"></script>
