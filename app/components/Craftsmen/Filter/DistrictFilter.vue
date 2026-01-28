<template>
	<div class="bg-white rounded-3xl">
		<FormRadio
			v-for="region in filtersData"
			:key="region.id"
			v-model="selected"
			:value="region.id"
			:label="region.title"
			name="district-filter"
			class="p-3 border-b last:border-b-0"
		/>
	</div>
</template>

<script setup lang="ts">
interface FilterOption {
	id: number
	title: string
}

interface Props {
	filtersData: FilterOption[]
}

defineProps<Props>()

const selected = defineModel<number | null>({ default: null })
</script>
