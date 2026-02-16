<script setup lang="ts">
import { refDebounced } from '@vueuse/core'

const route = useRoute()
const router = useRouter()

const minPrice = ref(Number(route.query.price_min) || 140000)
const maxPrice = ref(Number(route.query.price_max) || 50000000)
const hasDiscount = ref(route.query.has_discount === 'true')
const isTop = ref(route.query.is_top === 'true')

const debouncedMinPrice = refDebounced(minPrice, 500)
const debouncedMaxPrice = refDebounced(maxPrice, 500)

function clearFilters() {
	minPrice.value = 140000
	maxPrice.value = 50000000
	hasDiscount.value = false
	isTop.value = false

	router.push({ query: {} })
}

watch([debouncedMinPrice, debouncedMaxPrice, hasDiscount, isTop], ([min, max, discount, top]) => {
	const query = { ...route.query }

	if (min > 140000) query.price_min = String(min)
	else delete query.price_min

	if (max < 50000000) query.price_max = String(max)
	else delete query.price_max

	if (discount) query.has_discount = 'true'
	else delete query.has_discount

	if (top) query.is_top = 'true'
	else delete query.is_top

	router.push({ query })
})

watch(
	() => route.query,
	(newQuery) => {
		minPrice.value = Number(newQuery.price_min) || 140000
		maxPrice.value = Number(newQuery.price_max) || 50000000
		hasDiscount.value = newQuery.has_discount === 'true'
		isTop.value = newQuery.is_top === 'true'
	}
)
</script>

<template>
	<div class="flex flex-col gap-6 bg-gray rounded-2xl p-3">
		<div class="flex items-center justify-between">
			<h3 class="text-xl font-bold leading-130">Saralash</h3>
			<button class="flex-y-center gap-1 text-[#999EA1] font-bold" @click="clearFilters">
				<span>Tozalash</span>
				<span class="icon-clear text-base leading-4"></span>
			</button>
		</div>

		<div class="flex flex-col gap-4">
			<h3 class="text-base font-medium">Brendlar</h3>
			<ProductFilterBrandFilter />
		</div>

		<div class="flex flex-col gap-6">
			<div class="flex flex-col gap-3">
				<div class="flex items-center justify-between">
					<span class="text-base font-medium">Narx</span>
					<span class="leading-130">UZS</span>
				</div>
				<div class="flex items-center justify-between gap-2">
					<div class="bg-white px-2 py-3 rounded-2xl flex-1 text-center">
						<span class="text-xs font-bold leading-130">
							<span class="font-normal text-[#676767]">dan:</span>
							{{ formatMoneyDecimal(minPrice) }}
						</span>
					</div>
					<div class="bg-white px-2 py-3 rounded-2xl flex-1 text-center">
						<span class="text-xs font-bold leading-130">
							<span class="font-normal text-[#676767]">gacha:</span>
							{{ formatMoneyDecimal(maxPrice) }}
						</span>
					</div>
				</div>
			</div>
			<FormRange v-model:model-min="minPrice" v-model:model-max="maxPrice" :min="140000" :max="50000000" :step="10000" />
		</div>

		<div class="flex flex-col gap-2">
			<FormSwitch v-model="hasDiscount" label="Chegirmalilar" />
			<FormSwitch v-model="isTop" label="Top mahsulotlar" />
		</div>
	</div>
</template>
