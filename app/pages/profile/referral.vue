<template>
	<div class="grid grid-cols-1 md:grid-cols-[1fr_280px] gap-6">
		<div class="bg-white rounded-t-3xl shadow-main overflow-x-hidden max-h-[650px] h-full pb-5 scrollbar-hide order-2 md:order-1">
			<div class="flex items-center justify-between bg-white px-5 pt-5 sticky top-0">
				<h3 class="text-lg font-bold">Do’stlarim</h3>
				<UIDropdown :show="showDropdown" @toggle="handleDropdownToggle" :body-class="['!min-w-[200px] bg-white border-2 border-gray max-sm:!left-0']">
					<template #head="{ show }">
						<div
							class="flex items-center justify-center h-9 gap-1 bg-blue-light px-3 rounded-full border-2 border-transparent overflow-hidden cursor-pointer transition-300"
							:class="[show ? '!border-blue bg-white' : '']"
						>
							<span class="text-xs leading-130">{{ selectedLabel }}</span>
							<i class="icon-chevron flex-center text-xl leading-5 aspect-square transition-300" :class="[show ? '!rotate-180 text-blue' : '']" />
						</div>
					</template>

					<template #body>
						<div class="flex flex-col">
							<FormRadio
								v-for="(option, index) in options"
								:key="index"
								name="district-filter"
								:value="option.value"
								v-model="selectedOption"
								:label="option.label"
								class="p-3 border-b last:border-b-0 cursor-pointer"
							/>
						</div>
					</template>
				</UIDropdown>
			</div>
			<div class="flex flex-col px-5">
				<div class="flex flex-col" v-for="key in 20" :key>
					<div class="flex items-center gap-3 w-full py-4">
						<UIImage src="/images/user.png" class="w-[55px] aspect-[55/59] !rounded-full" image-class="!object-contain" />
						<div class="flex flex-col items-start gap-2 w-full">
							<h3 class="text-base font-bold leading-130">Sunnat Xoldorboev</h3>
							<span class="bg-gray rounded-full px-2 py-0.5 text-sm leading-130">10.05.2025, 12:40</span>
						</div>
					</div>
					<div class="w-full h-px bg-gray ml-[64px]"></div>
				</div>
			</div>
		</div>
		<div class="flex md:flex-col flex-col-reverse gap-4 order-1 md:order-2">
			<div class="flex flex-col gap-7 bg-white rounded-3xl p-5">
				<p class="text-base leading-130 text-center">
					Referal dastur orqali taklif qilgan har bir do‘stingizdan <span class="font-bold text-[#1CBA49]">1% gacha Keshbek</span> oling!
				</p>

				<UIReferralChart :userCount="1000" />
			</div>
			<div class="flex flex-col gap-4">
				<div class="bg-white rounded-[20px] p-3">
					<img src="/images/referral-qr.png" alt="" />
				</div>
				<UIButton text="EM32KE" icon="icon-file-copy text-2xl text-black" class="h-12 !bg-white !text-black" />
				<UIButton text="Ulashish" icon="icon-share text-2xl text-white" class="h-12" />
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
const showDropdown = ref(false)
const selectedOption = ref('all')

const options = [
	{ label: 'Barcha vaqtlar', value: 'all' },
	{ label: 'Bepul', value: 'free' },
	{ label: 'Premium', value: 'premium' }
]

function handleDropdownToggle(val: boolean) {
	showDropdown.value = val
}

const customData = [
	{
		range: '1-100',
		percentage: 0.1,
		users: 75,
		color: '#FF6B6B',
		label: '1M gacha'
	},
	{
		range: '100-500',
		percentage: 0.25,
		users: 320,
		color: '#4ECDC4',
		label: '1M - 5M'
	},
	{
		range: '500+',
		percentage: 0.5,
		users: 890,
		color: '#45B7D1',
		label: '5M+'
	}
]

const selectedLabel = computed(() => {
	const found = options.find((o) => o.value === selectedOption.value)
	return found ? found.label : ''
})
</script>
