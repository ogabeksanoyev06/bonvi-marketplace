<template>
	<UIDropdown :show="showDropdown" @toggle="handleDropdownToggle" :body-class="['!min-w-[200px] bg-white border-2 border-gray']">
		<template #head="{ show }">
			<div class="flex items-center h-9 gap-1 bg-[#0083FF14] py-1.5 px-2 rounded-full cursor-pointer transition-300" :class="[show ? 'bg-dark' : '']">
				<i class="icon-location-pin text-blue flex-center text-xl leading-5 aspect-square transition-300" :class="[show ? 'text-white' : '']" />
				<span class="text-base leading-130 font-bold text-blue transition-300" :class="[show ? 'text-white' : '']">
					{{ currentRegion?.name || 'Toshkent shahri' }}
				</span>
				<i class="icon-chevron text-blue flex-center text-xl leading-5 aspect-square transition-300" :class="[show ? '!rotate-180 text-white' : '']" />
			</div>
		</template>

		<template #body>
			<div
				v-for="region in regionsList"
				:key="region.code"
				class="w-full group flex items-center justify-between gap-4 p-3 cursor-pointer border-b border-gray last:border-b-0 transition-300"
				@click="handleRegionChange(region)"
			>
				<span class="text-sm font-medium leading-140 transition-300">
					{{ region.name }}
				</span>
				<div v-if="region.code === currentRegion?.code" class="icon-radio-tick text-blue flex-center text-2xl leading-6 aspect-square">
					<span class="icon-radio-tick"><span class="path1"></span><span class="path2"></span></span>
				</div>
				<i v-else class="icon-radio text-gray flex-center text-2xl leading-6 aspect-square" />
			</div>
		</template>
	</UIDropdown>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const showDropdown = ref(false)

const regionsList = [
	{ name: 'Toshkent shahri', code: 'toshkent' },
	{ name: 'Buxoro viloyati', code: 'buxoro' },
	{ name: 'Andijon viloyati', code: 'andijon' },
	{ name: 'Sirdaryo viloyati', code: 'sirdaryo' },
	{ name: 'Navoiy viloyati', code: 'navoiy' },
	{ name: 'Jizzax viloyati', code: 'jizzax' },
	{ name: 'Qarshi viloyati', code: 'qarshi' },
	{ name: 'Termiz', code: 'termiz' },
	{ name: 'Surxandaryo', code: 'surxandaryo' }
]

const currentRegion = ref(regionsList[0])

function handleDropdownToggle(val: boolean) {
	showDropdown.value = val
}

function handleRegionChange(region: { name: string; code: string }) {
	currentRegion.value = region
	showDropdown.value = false
}
</script>
