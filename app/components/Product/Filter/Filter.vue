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
		<!-- Brand FILTER -->
		<div class="flex flex-col gap-4">
			<h3 class="text-base font-medium">Brendlar</h3>
			<ProductFilterBrandFilter />
		</div>

		<!-- PRICE FILTER -->
		<div class="flex flex-col gap-6">
			<div class="flex flex-col gap-3">
				<div class="flex items-center justify-between">
					<span class="text-base font-medium">Narx</span>
					<span class="leading-130">UZS</span>
				</div>
				<div class="flex items-center justify-between gap-2">
					<div class="bg-white px-2 py-3 rounded-2xl flex-1">
						<span class="text-xs font-bold leading-130">
							<span class="font-normal text-[#676767]">dan:</span>
							{{ formatMoneyDecimal(minPrice) }}
						</span>
					</div>
					<div class="bg-white px-2 py-3 rounded-2xl flex-1">
						<span class="text-xs font-bold leading-130">
							<span class="font-normal text-[#676767]">gacha:</span>
							{{ formatMoneyDecimal(maxPrice) }}
						</span>
					</div>
				</div>
			</div>
			<FormRange v-model:model-min="minPrice" v-model:model-max="maxPrice" :min="140000" :max="50000000" :step="10" />
		</div>
		<!-- Discounted FILTER -->
		<div class="flex flex-col gap-2">
			<FormSwitch label="Chegirmalilar" />
			<FormSwitch label="Top mahsulotlar" />
		</div>
	</div>
</template>

<script setup lang="ts">
const minPrice = ref(140000)
const maxPrice = ref(50000000)
function clearFilters() {}
</script>
