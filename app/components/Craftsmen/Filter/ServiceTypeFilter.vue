<template>
	<div class="bg-white rounded-3xl w-full">
		<FormCheckbox
			label="Barchasi"
			:model-value="isAllSelected"
			:indeterminate="isIndeterminate"
			@click="toggleAll"
			class="!flex justify-between flex-row-reverse border-b border-gray p-3"
		/>
		<FormCheckbox
			v-for="item in filtersData"
			:key="item.id"
			v-model="selected"
			:label="item.title"
			:value="item.id"
			class="!flex justify-between flex-row-reverse border-b border-gray last:border-b-0 p-3"
		/>
	</div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface FilterItem {
	id: number | string
	title: string
}

const props = defineProps<{
	filtersData: FilterItem[]
}>()

const selected = defineModel<(string | number)[]>({
	default: []
})

const options = computed<(string | number)[]>(() => props.filtersData.map((item) => item.id))

const isAllSelected = computed(() => selected.value.length === options.value.length && options.value.length > 0)

const isIndeterminate = computed(() => selected.value.length > 0 && selected.value.length < options.value.length)

const toggleAll = () => {
	selected.value = isAllSelected.value ? [] : [...options.value]
}
</script>
