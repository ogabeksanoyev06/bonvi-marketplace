<template>
	<div class="flex flex-col gap-6">
		<div class="flex flex-col md:flex-row md:items-center md:justify-between gap-5">
			<h3 class="text-xl leading-130 font-bold">Buyurtmalarim</h3>
			<UITabs main-class="bg-gray" class="sm:max-w-[400px] rounded-full" v-model="activeTab" :tabs="ordersTab" @change="handleOrdersTabChange" content-class="!mt-0" />
		</div>

		<transition name="fade" mode="out-in">
			<div v-if="isPending" key="loading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
				<CardOrderLoading v-for="(key, i) in 4" :key="i" />
			</div>

			<div v-else key="loaded" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
				<CardOrder v-for="key in 4" :key="key" />
			</div>
		</transition>
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const activeTab = ref(0)
const isPending = ref(true)

const ordersTab = [
	{ label: 'Faol buyurtmalar', value: 'all' },
	{ label: 'Buyurtmalar tarixi', value: 'new' }
]

const handleOrdersTabChange = (val: string) => {
	console.log('Tanlangan tab:', val)
}

onMounted(() => {
	setTimeout(() => {
		isPending.value = false
	}, 2000)
})
</script>
