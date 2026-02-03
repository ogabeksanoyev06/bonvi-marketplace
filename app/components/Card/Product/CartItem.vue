<template>
	<div class="flex items-center p-4 gap-4 w-full h-full">
		<UIImage
			src="/images/bonvi-product.png"
			class="shrink-0 flex-center w-[130px] h-full md:aspect-square rounded-[28px] bg-blue-light"
			image-class="!object-contain w-[130px] aspect-square"
		/>
		<div class="flex items-start md:items-center md:flex-row flex-col w-full gap-4 md:flex-1 md:justify-between">
			<div class="flex flex-col gap-3">
				<div class="flex flex-col justify-between gap-2">
					<h4 class="text-base md:text-lg font-semibold">Qariyalar uchun mapet</h4>
					<p class="md:text-sm text-xs !leading-130 line-clamp-2">
						12V tizimlar uchun ishonchli quvvat manbai. Barqaror kuchlanish beradi, o‘rnatish oson ва uzoq muddat xizmat qiladi.
					</p>
				</div>
				<span class="text-sm md:text-base font-semibold !leading-130">6 500 000 UZS</span>
			</div>
			<div class="flex flex-col items-center gap-2 max-md:w-full">
				<div class="flex items-center gap-3 h-9 bg-black p-1.5 rounded-full w-full md:w-auto min-w-[161px]">
					<button class="icon-minus text-2xl leading-6 text-white"></button>
					<div class="w-px h-6 bg-white/30" />
					<span class="flex-1 text-white text-center">2</span>
					<div class="w-px h-6 bg-white/30" />
					<button class="icon-plus text-2xl leading-6 text-white"></button>
				</div>
				<span class="text-base font-bold leading-130">13 000 000 UZS</span>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts"></script>
