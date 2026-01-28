<template>
	<div class="flex flex-col gap-2 w-full">
		<UIAccordion
			v-for="(brand, index) in brands"
			:key="brand.id"
			:show="active === index"
			@toggle="toggleAccordion(index)"
			:wrapper-class="['rounded-[16px] bg-white transition-300']"
			header-class="!p-3"
		>
			<!-- HEADER -->
			<template #header>
				<div class="flex-center-between">
					<div class="flex-y-center gap-2">
						<img :src="brand.logo" alt="brand" class="h-7 aspect-[10/7]" />
						<span class="text-xs font-medium leading-130">{{ brand.brand }}</span>
					</div>
					<button class="flex-center size-7 bg-gray rounded-full p-1" :class="active === index ? '!bg-[#0083FF14]' : ''">
						<span class="icon-chevron text-xl leading-5 transition-300" :class="{ 'rotate-180 text-blue': active === index }" />
					</button>
				</div>
			</template>

			<!-- BODY -->
			<template #body>
				<div class="pb-3 flex flex-col gap-2">
					<FormCheckbox
						label="Barchasi"
						:model-value="isAllSelected(brand)"
						:indeterminate="isIndeterminate(brand)"
						@click="toggleAll(brand)"
						class="!flex justify-between flex-row-reverse px-3"
					/>
					<FormCheckbox v-for="item in brand.items" :key="item.id" :label="item.label" v-model="item.checked" class="!flex justify-between flex-row-reverse px-3" />
				</div>
			</template>
		</UIAccordion>
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const active = ref<number | null>(null)

const toggleAccordion = (index: number) => {
	active.value = active.value === index ? null : index
}

const brands = ref([
	{
		id: 1,
		logo: '/images/filter-bonvi-logo.svg',
		brand: 'Bonvi',
		items: [
			{ id: 1, label: 'Premium', checked: false },
			{ id: 2, label: 'Standart', checked: false },
			{ id: 3, label: 'Lux', checked: false }
		]
	},
	{
		id: 2,
		logo: '/images/filter-dark-logo.svg',
		brand: 'Dark',
		items: [
			{ id: 1, label: 'Original', checked: false },
			{ id: 2, label: 'Econom', checked: false }
		]
	},
	{
		id: 3,
		logo: '/images/filter-vikor-logo.svg',
		brand: 'Vikor',
		items: [
			{ id: 1, label: 'New', checked: false },
			{ id: 2, label: 'Used', checked: false }
		]
	}
])

// ✅ Hamma tanlanganmı
const isAllSelected = (brand: any) => brand.items.length > 0 && brand.items.every((item: any) => item.checked)

// ✅ Yarim tanlangan holat
const isIndeterminate = (brand: any) => brand.items.some((item: any) => item.checked) && !isAllSelected(brand)

// ✅ Barchasi bosilganda
const toggleAll = (brand: any) => {
	const newValue = !isAllSelected(brand)
	brand.items.forEach((item: any) => {
		item.checked = newValue
	})
}
</script>
