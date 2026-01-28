<template>
	<div>
		<!-- Buttons -->
		<div class="flex gap-2">
			<UIButton
				variant="secondary"
				text="Xizmat turi"
				icon="icon-chevron text-xl !leading-130"
				class="h-8 !px-2.5 !py-1.5 !rounded-[10px] !font-medium"
				mainClass="!text-sm !leading-130 !gap-1.5"
				@click="openModal('service')"
			/>
			<UIButton
				variant="secondary"
				text="Viloyat"
				icon="icon-chevron text-xl !leading-130"
				class="h-8 !px-2.5 !py-1.5 !rounded-[10px] !font-medium"
				mainClass="!text-sm !leading-130 !gap-1.5"
				@click="openModal('region')"
			/>
			<UIButton
				variant="secondary"
				text="Tuman"
				icon="icon-chevron text-xl !leading-130"
				class="h-8 !px-2.5 !py-1.5 !rounded-[10px] !font-medium"
				mainClass="!text-sm !leading-130 !gap-1.5"
				@click="openModal('district')"
			/>
		</div>

		<!-- Modal -->
		<UIModal v-model="isOpen" :no-header="true" variant="mobile">
			<!-- Header -->
			<div class="px-4 py-3 flex-center-between sticky top-0 bg-white z-50">
				<h3 class="text-[28px] font-bold leading-130">{{ modalTitle }}</h3>
				<button class="size-10 flex-center bg-gray rounded-full active:scale-95" @click="isOpen = false">
					<span class="icon-x-mark text-2xl" />
				</button>
			</div>

			<!-- Content -->
			<div class="px-4 py-3">
				<CraftsmenFilterServiceTypeFilter v-if="modalType === 'service'" v-model="selectedCategories" :filters-data="categories" class="!bg-gray !shadow-main" />
				<CraftsmenFilterRegionFilter v-if="modalType === 'region'" v-model="selectedRegion" :filters-data="regions" />
				<CraftsmenFilterDistrictFilter v-if="modalType === 'district'" v-model="selectedDistrict" :filters-data="districts" />
			</div>

			<!-- Footer -->
			<div class="pb-3 px-4 sticky bottom-0">
				<UIButton text="Tasdiqlash" class="w-full" @click="applyFilters" />
			</div>
		</UIModal>
	</div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouteQuery } from '@vueuse/router'

// Modal state
const isOpen = ref(false)
const modalType = ref<'service' | 'region' | 'district' | null>(null)

// Selected filters
const selectedCategories = ref<(string | number)[]>([])
const selectedRegion = ref<number | null>(null)
const selectedDistrict = ref<number | null>(null)

// Modal title
const modalTitle = computed(() => {
	switch (modalType.value) {
		case 'service':
			return 'Xizmat turi'
		case 'region':
			return 'Viloyat'
		case 'district':
			return 'Tuman'
		default:
			return ''
	}
})

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

const serviceQuery = useRouteQuery<string | undefined>('service', undefined)
const regionQuery = useRouteQuery<string | undefined>('region', undefined)
const districtQuery = useRouteQuery<string | undefined>('district', undefined)

function openModal(type: 'service' | 'region' | 'district') {
	modalType.value = type
	isOpen.value = true
}

function applyFilters() {
	if (modalType.value === 'service') {
		serviceQuery.value = selectedCategories.value.length ? selectedCategories.value.join(',') : undefined
	}
	if (modalType.value === 'region') {
		regionQuery.value = selectedRegion.value !== null ? selectedRegion.value.toString() : undefined
	}
	if (modalType.value === 'district') {
		districtQuery.value = selectedDistrict.value !== null ? selectedDistrict.value.toString() : undefined
	}
	isOpen.value = false
}

if (serviceQuery.value) selectedCategories.value = serviceQuery.value.split(',').map(Number)
if (regionQuery.value) selectedRegion.value = Number(regionQuery.value)
if (districtQuery.value) selectedDistrict.value = Number(districtQuery.value)
</script>
