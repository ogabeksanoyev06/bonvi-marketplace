<template>
	<NuxtLinkLocale
		:to="`/profile/notifications/1`"
		class="bg-white p-4 rounded-[20px] flex flex-col gap-3 border border-transparent group hover:border-blue hover:bg-white transition-300"
	>
		<div class="flex items-center justify-between">
			<div class="flex items-center gap-3">
				<div
					class="w-[52px] h-[52px] flex items-center justify-center bg-gray p-2.5 rounded-full group-hover:bg-blue group-hover:shadow-[0_4px_10px_0_rgba(0,131,255,0.28)] transition-300"
				>
					<span class="icon-note-medical text-3xl group-hover:text-white transition-300" />
				</div>
				<div class="flex flex-col gap-1">
					<h3 class="text-xl font-bold leading-130">Bepul maslahat</h3>
					<div class="flex items-center gap-1.5 text-sm text-gray-300">
						<span>27.01.2024</span>
						<span class="size-1 rounded-full bg-gray"></span>
						<span>18:58</span>
					</div>
				</div>
			</div>
			<UIButton variant="secondary" class="text-sm font-medium hidden md:inline-flex">
				Batafsil
				<span class="icon-chevron -rotate-90 text-base" />
			</UIButton>
		</div>
		<p class="text-base leading-130">Bepul maslahatni faqat bugun sinang! Maslahatchi Bahodir.J 30 yildan ortiq tajribaga ega professional kardiolog</p>
	</NuxtLinkLocale>
</template>

<script setup lang="ts"></script>
