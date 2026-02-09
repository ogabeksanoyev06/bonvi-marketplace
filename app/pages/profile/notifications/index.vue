<template>
	<div class="flex flex-col gap-4">
		<div class="flex items-center justify-between gap-5">
			<h3 class="text-xl leading-130 font-bold">Xabarnomalar</h3>
			<UIButton class="!bg-white !text-dark !h-11">
				<img src="/images/check_all.svg" alt="check_all icon" />
				<span class="hidden md:block">O‘qildi deb belgilash</span>
			</UIButton>
		</div>
		<transition name="fade" mode="out-in">
			<div v-if="isPending" key="loading" class="flex flex-col gap-3">
				<CardNotificationLoading v-for="i in 5" :key="i" />
			</div>

			<div v-else key="loaded" class="flex flex-col gap-3">
				<CardNotification v-for="i in 5" :key="i" />
			</div>
		</transition>
	</div>
</template>

<script setup lang="ts">
const isPending = ref(true)

onMounted(() => {
	setTimeout(() => {
		isPending.value = false
	}, 2000)
})
</script>
