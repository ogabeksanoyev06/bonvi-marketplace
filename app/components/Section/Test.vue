<template>
	<div class="space-y-3">
		<FormCheckbox v-model="selectAll" :indeterminate="isIndeterminate" label="Barchasi" @update:model-value="handleSelectAll" />
		<div class="pl-6 space-y-2">
			<FormCheckbox v-for="item in items" :key="item.value" v-model="item.checked" :label="item.label" @update:model-value="handleItemChange" />
		</div>
	</div>
</template>

<script setup lang="ts">
interface FilterItem {
	label: string
	value: string
	checked: boolean
}

const items = ref<FilterItem[]>([
	{ label: 'Mapetlar', value: 'mapetlar', checked: false },
	{ label: 'Mataklar', value: 'mataklar', checked: false },
	{ label: 'Veliklarr', value: 'veliklar', checked: false },
	{ label: 'Yuk tashish uchun', value: 'yuk_tashish', checked: false }
])

// "Barchasi" checkbox holati
const selectAll = ref(false)

// Indeterminate holat (ba'zi birlar tanlangan)
const isIndeterminate = computed(() => {
	const checkedCount = items.value.filter((item) => item.checked).length
	return checkedCount > 0 && checkedCount < items.value.length
})

// "Barchasi" bosilganda
const handleSelectAll = (value: boolean) => {
	items.value.forEach((item) => {
		item.checked = value
	})
}

// Biror item o'zgarganda
const handleItemChange = () => {
	const allChecked = items.value.every((item) => item.checked)
	selectAll.value = allChecked
}

// Tanlangan qiymatlarni olish
const selectedValues = computed(() => {
	return items.value.filter((item) => item.checked).map((item) => item.value)
})

// Tanlangan labellarni olish
const selectedLabels = computed(() => {
	return items.value.filter((item) => item.checked).map((item) => item.label)
})

// Export qilish (agar kerak bo'lsa)
defineExpose({
	selectedValues,
	selectedLabels,
	items
})
</script>
