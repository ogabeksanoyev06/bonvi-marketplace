<template>
	<div class="flex flex-col p-4 sm:p-5 bg-white rounded-3xl shadow-main">
		<div class="flex items-center justify-between pb-3">
			<h3 class="text-xl leading-130 font-bold">Ma’lumotlarim</h3>
			<NuxtLinkLocale to="/profile/edit">
				<UIButton variant="secondary" class="sm:h-11 font-medium">
					<span class="hidden md:block">Ma’lumotlarni tahrirlash</span>
					<i class="icon-edit-profile text-2xl"></i>
				</UIButton>
			</NuxtLinkLocale>
		</div>
		<div class="flex-y-center gap-3 py-3">
			<UIImage src="/images/user.png" class="w-[64px] aspect-[16/17] rounded-full" image-class="object-contain rounded-full" />
			<div class="flex flex-col gap-2">
				<h3 class="text-xl leading-130 font-bold">Odiljon Sanoyev</h3>
				<a href="" class="text-sm leading-130 font-medium">+998 71 200 77 07</a>
			</div>
		</div>
		<div class="flex flex-col gap-4 pt-3">
			<div class="flex items-center justify-between">
				<span class="text-sm leading-140">Tug‘ilgan sana</span>
				<span class="text-base font-bold leading-130">01.05.2003</span>
			</div>
			<div class="w-full h-px bg-gray"></div>
			<div class="flex items-center justify-between">
				<span class="text-sm leading-140">Jinsi</span>
				<span class="text-base font-bold leading-130">Erkak</span>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts"></script>
