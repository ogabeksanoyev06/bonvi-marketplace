<template>
	<div class="flex flex-col gap-5">
		<NuxtLinkLocale to="/profile/notifications">
			<UIButton text="Ortga qaytish" icon-left="icon-chevron rotate-90 text-2xl left-6" class="!bg-white !text-dark" />
		</NuxtLinkLocale>
		<div class="bg-white p-6 rounded-3xl flex flex-col gap-5">
			<h1 class="text-2xl font-bold">Bepul maslahat</h1>
			<!-- <img v-if="notification.image" :src="notification.image" alt="" class="w-full h-full rounded-xl" /> -->
			<p>Bepul maslahatni faqat bugun sinang! Maslahatchi Bahodir.J 30 yildan ortiq tajribaga ega professional kardiolog</p>
		</div>
	</div>
</template>

<script setup lang="ts"></script>
