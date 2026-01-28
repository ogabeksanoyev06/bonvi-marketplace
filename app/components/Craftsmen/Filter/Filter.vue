<template>
	<div class="flex flex-col gap-6 bg-gray rounded-2xl p-3">
		<!-- HEADER -->
		<div class="flex items-center justify-between">
			<h3 class="text-xl font-bold leading-130">Saralash</h3>
			<button class="flex-y-center gap-1 text-[#999EA1] font-bold" @click="clearFilters">
				<span>Tozalash</span>
				<span class="icon-clear text-base leading-4"></span>
			</button>
		</div>
		<!-- SERVICE FILTER -->
		<div class="flex flex-col gap-4">
			<h3 class="text-base font-medium">Xizmat turi</h3>
			<CraftsmenFilterServiceTypeFilter v-model="selectedCategories" :filters-data="categories" />
		</div>

		<!-- REGION FILTER -->
		<div class="flex flex-col gap-4">
			<h3 class="text-base font-medium">Viloyat bo‘yicha</h3>
			<CraftsmenFilterRegionFilter v-model="selectedRegion" :filters-data="regions" />
		</div>

		<!-- DISTRICT FILTER -->
		<div class="flex flex-col gap-4">
			<h3 class="text-base font-medium">Tuman bo‘yicha</h3>
			<CraftsmenFilterDistrictFilter v-model="selectedDistrict" :filters-data="districts" />
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import { useRouteQuery } from '@vueuse/router'

const selectedCategories = ref<(string | number)[]>([])
const selectedRegion = ref<number | null>(null)
const selectedDistrict = ref<number | null>(null)

// FILTER DATA
const categories = [
	{ id: 22, title: 'Dekorativ Elementlar' },
	{ id: 23, title: 'Yoritish tizimlari' },
	{ id: 24, title: 'Interyer bezaklari' }
]

const regions = [
	{ id: 1, title: 'Toshkent shahri' },
	{ id: 2, title: 'Toshkent viloyati' },
	{ id: 3, title: 'Samarqand viloyati' },
	{ id: 4, title: 'Buxoro viloyati' },
	{ id: 5, title: 'Farg‘ona viloyati' },
	{ id: 6, title: 'Andijon viloyati' },
	{ id: 7, title: 'Namangan viloyati' },
	{ id: 8, title: 'Qashqadaryo viloyati' },
	{ id: 9, title: 'Surxondaryo viloyati' },
	{ id: 10, title: 'Xorazm viloyati' }
]

const districts = [
	{ id: 1, title: 'Yunusobod tumani' },
	{ id: 2, title: 'Mirzo Ulug‘bek tumani' },
	{ id: 3, title: 'Mirobod tumani' },
	{ id: 4, title: 'Chilonzor tumani' },
	{ id: 5, title: 'Yakkasaroy tumani' },
	{ id: 6, title: 'Olmazor tumani' },
	{ id: 7, title: 'Shayxontohur tumani' },
	{ id: 8, title: 'Uchtepa tumani' },
	{ id: 9, title: 'Sergeli tumani' },
	{ id: 10, title: 'Bektemir tumani' }
]

// ROUTE QUERY (TypeScript safe)
const serviceQuery = useRouteQuery<string>('service', '')
const regionQuery = useRouteQuery<string>('region', '')
const districtQuery = useRouteQuery<string>('district', '')

watch(
	selectedCategories,
	(val) => {
		serviceQuery.value = val.length ? val.join(',') : ''
	},
	{ deep: true }
)

watch(selectedRegion, (val) => {
	regionQuery.value = val !== null ? val.toString() : ''
})

watch(selectedDistrict, (val) => {
	districtQuery.value = val !== null ? val.toString() : ''
})

// load
if (serviceQuery.value) selectedCategories.value = serviceQuery.value.split(',').map(Number)
if (regionQuery.value) selectedRegion.value = Number(regionQuery.value)
if (districtQuery.value) selectedDistrict.value = Number(districtQuery.value)

// CLEAR BUTTON
function clearFilters() {
	selectedCategories.value = []
	selectedRegion.value = null
	selectedDistrict.value = null

	serviceQuery.value = ''
	regionQuery.value = ''
	districtQuery.value = ''
}
</script>
