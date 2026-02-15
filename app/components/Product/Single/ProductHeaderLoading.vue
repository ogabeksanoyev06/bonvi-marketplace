<template>
	<div class="container flex flex-col gap-8 mt-6 sm:mt-10">
		<div class="grid grid-cols-1 lg:grid-cols-[100px_1fr_1fr] gap-4 lg:gap-8 bg-white rounded-[32px] p-4 sm:p-8">
			<div class="hidden lg:flex flex-col gap-3">
				<div v-for="i in 3" :key="i" class="w-[94px] h-[94px] skeleton rounded-xl"></div>
			</div>

			<div class="aspect-square lg:aspect-auto lg:h-[450px] skeleton rounded-[32px] relative">
				<div class="absolute left-4 top-1/2 -translate-y-1/2 size-10 bg-gray-300 rounded-full opacity-50"></div>
				<div class="absolute right-4 top-1/2 -translate-y-1/2 size-10 bg-gray-300 rounded-full opacity-50"></div>
			</div>

			<div class="flex flex-col gap-4 py-2">
				<div class="w-24 h-6 skeleton rounded-md"></div>

				<div class="space-y-2">
					<div class="w-full h-8 skeleton rounded-lg"></div>
					<div class="w-2/3 h-8 skeleton rounded-lg"></div>
				</div>

				<div class="w-32 h-10 skeleton rounded-lg mt-2"></div>

				<div class="w-16 h-5 skeleton rounded-md"></div>

				<div class="space-y-2 mt-4">
					<div v-for="i in 3" :key="i" class="w-full h-4 skeleton rounded"></div>
				</div>

				<div class="flex items-center gap-3 mt-6">
					<div class="w-48 h-12 skeleton rounded-full"></div>
					<div class="size-11 skeleton rounded-full"></div>
					<div class="size-11 skeleton rounded-full"></div>
				</div>
			</div>
		</div>

		<div class="p-6 bg-white rounded-[32px] border border-gray-100 space-y-6">
			<div class="flex gap-4">
				<div v-for="i in 4" :key="i" class="w-24 h-10 skeleton rounded-full"></div>
			</div>
			<div class="space-y-3">
				<div class="w-full h-4 skeleton rounded"></div>
				<div class="w-3/4 h-4 skeleton rounded"></div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
// Skeleton uchun qo'shimcha mantiq shart emas
</script>

<style scoped>
/* Yaltirash effektini yanada mayinlashtirish uchun */
.animate-pulse {
	animation: pulse 1.8s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse {
	0%,
	100% {
		opacity: 1;
	}
	50% {
		opacity: 0.4;
	}
}
</style>
