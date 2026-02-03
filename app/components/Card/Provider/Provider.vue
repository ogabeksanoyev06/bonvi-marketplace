<template>
	<div class="grid grid-cols-1 gap-3">
		<FormRadio
			v-for="provider in providers"
			:key="provider.value"
			v-model="selected"
			:value="provider.value"
			name="provider"
			main-styles="!border px-4 py-3 rounded-[16px] border-gray bg-gray"
			main-active-class="!border-blue !border-[1.5px] bg-white"
		>
			<template #label>
				<div class="flex items-center gap-2">
					<img :src="provider.icon" :alt="provider.label" />
					<div class="flex flex-col gap-1">
						<span :class="selected === provider.value ? 'text-blue' : ''">{{ provider.label }}</span>
						<span class="text-base font-semibold leading-130">{{ maskCardNumber(provider.code) }}</span>
					</div>
				</div>
			</template>
		</FormRadio>
	</div>
</template>

<script setup lang="ts">
const selected = defineModel<string>()

const providers = [
	{
		label: 'Humo',
		icon: 'images/payments/humo.webp',
		value: 'humo',
		code: '9860190101289999'
	},
	{
		label: 'Uzcard',
		icon: 'images/payments/uzcard.webp',
		value: 'uzcard',
		code: '8600002036441144'
	},
	{
		label: 'Visa',
		icon: 'images/payments/humo.webp',
		value: 'visa',
		code: '8600002036441144'
	},
	{
		label: 'Mastercard',
		icon: 'images/payments/humo.webp',
		value: 'mastercard',
		code: '8600002036441144'
	}
]
</script>
