<template>
	<div>
		<UIBreadcrumb :routes="breadcrumbItems" />

		<div class="container flex items-center gap-3 py-3 md:py-5">
			<img src="/images/header/basket.svg" alt="favourite" />
			<h3 class="text-[28px] leading-130 font-bold">Savatcha</h3>
			<p class="bg-[#0066FF1F] rounded-full text-blue px-1.5 py-0.5 text-sm leading-130 font-medium">3 ta mahsulot</p>
		</div>
		<div class="md:container grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-6">
			<!-- cartitem list -->
			<div class="">
				<div class="bg-white rounded-[28px]">
					<template v-if="isPending">
						<CardProductCartItemLoading v-for="key in 8" :key="key" />
					</template>
					<template v-else>
						<CardProductCartItem v-for="key in 3" :key />
					</template>
				</div>
			</div>

			<div class="max-md:container flex flex-col gap-6 checkoutSidebar w-full">
				<!-- delivery -->
				<div class="bg-white rounded-[20px] shadow-main flex flex-col">
					<h3 class="text-xl font-bold leading-130 p-4 border-b border-b-gray">Xizmat</h3>
					<UITabs class="p-3" v-model="activeTabDelivery" :tabs="deliveryTabs" @change="handleDeliveryTabChange" content-class="!mt-0" />
					<div class="flex flex-col gap-3 py-4 overflow-hidden">
						<transition name="fade" mode="out-in">
							<div v-if="activeTabDelivery === 0">
								<ModalCheckoutSwitchCity />
							</div>
							<div v-else="activeTabDelivery === 1">
								<ModalCheckoutDelivery />
							</div>
						</transition>
						<div class="w-full h-px bg-gray ml-14"></div>
						<div class="flex items-center gap-3 px-4 cursor-pointer" @click="isReceiverModalOpen = true">
							<i class="icon-phone text-2xl leading-6 text-black shrink-0"></i>
							<div class="flex flex-col gap-0.5 flex-1">
								<span class="font-medium text-blue">Qabul qiluvchi</span>
								<h4 class="font-medium leading-130">Odiljon Sanoyev</h4>
								<span class="text-xs leading-130">+998 (93) 472-93-35</span>
							</div>
							<div class="flex-center size-7 p-1 rounded-full bg-gray shrink-0">
								<i class="icon-chevron text-xl leading-5 -rotate-90 ml-1"></i>
							</div>
						</div>
					</div>
					<ModalCheckoutReceiver v-model="isReceiverModalOpen" />
				</div>

				<!-- payments -->
				<div class="bg-white rounded-[20px] shadow-main flex flex-col">
					<h3 class="text-xl font-bold leading-130 p-4 border-b border-b-gray">To‘lov usuli</h3>
					<UITabs class="p-3 border-b border-gray" v-model="activeTab" :tabs="productTabs" contentClass="!mt-3" @change="handleTabChange">
						<div v-if="activeTab === 0" class="grid grid-cols-2 gap-3">
							<FormRadio
								v-for="(payment, i) in paymentMethods"
								:key="i"
								v-model="selected"
								:value="payment.value"
								name="payments"
								main-styles="!border p-2.5 rounded-[12px] border-gray bg-white"
								main-active-class="!border-blue !border-[1.5px]"
							>
								<template #label>
									<img :src="payment.img" alt="" />
								</template>
							</FormRadio>
						</div>
						<div v-if="activeTab === 1" class="flex flex-col gap-4">
							<transition name="fade" mode="out-in">
								<CardProvider v-model="selectedProvider" v-if="!isPending" key="provider" />
								<CardProviderLoading v-else key="loading" />
							</transition>
							<UIButton
								text="Karta qo‘shish"
								icon="icon-plus text-2xl leading-6 text-blue"
								class="w-full !text-blue !text-base !font-bold !bg-[#0083FF14]"
								@click="isAddCardModalOpen = true"
							/>
							<ModalPaymentsAddCard v-model="isAddCardModalOpen" />
						</div>
					</UITabs>
					<FormSwitch main-class="!p-4">
						<template #label>
							<div class="flex items-center gap-3">
								<div class="bg-black h-9 w-14 rounded-xl"></div>
								<div class="flex flex-col gap-0.5">
									<span class="text-sm font-medium leading-130">500 000 UZS</span>
									<span class="text-xs font-medium leading-130">Umumiy balans</span>
								</div>
							</div>
						</template>
					</FormSwitch>
				</div>

				<!-- promo-code -->
				<FormSwitch label="Promokod" label-class="!text-xl !font-bold" main-class="!p-4" />

				<!-- order-summary -->
				<div class="bg-white rounded-[20px] shadow-main flex flex-col">
					<h3 class="text-xl font-bold leading-130 pt-4 pb-3 px-4 border-b border-b-gray">Chek</h3>
					<div class="flex items-center justify-between px-4 py-3 border-b border-b-gray">
						<span class="text-sm leading-140 font-medium">Mahsulotlar soni:</span>
						<span class="text-base leading-140 font-medium">4 dona</span>
					</div>

					<div class="flex items-center justify-between px-4 py-3 border-b border-b-gray">
						<span class="text-sm leading-140 font-medium">Olinayotgan sana:</span>
						<span class="text-base leading-140 font-medium">15.11.2025, 16:58</span>
					</div>

					<div class="flex items-center justify-between px-4 py-3 border-b border-b-gray">
						<span class="text-sm leading-140 font-medium">Mahsulotlar narxi:</span>
						<span class="text-base leading-140 font-medium">3 418 900 000 UZS</span>
					</div>

					<div class="flex items-center justify-between px-4 py-3 border-b border-b-gray">
						<span class="text-sm leading-140 font-medium">Yetkazib berish narxi:</span>
						<span class="text-base leading-140 font-medium">35 000 UZS</span>
					</div>

					<div class="flex items-center justify-between px-4 py-3">
						<span class="text-sm leading-140 font-bold">Umumiy:</span>
						<span class="text-2xl leading-140 font-bold text-blue">4 800 000 UZS</span>
					</div>
				</div>

				<UIButton text="Rasmiylashtirish" class="!py-3 h-12" />
			</div>
		</div>
		<ModalCheckoutStatus v-model="isStatusModalOpen" status="pending" />
		<SectionPopularProducts />
	</div>
</template>

<script setup lang="ts">
const breadcrumbItems = [
	{
		name: 'Savatcha',
		path: ''
	}
]

const isPending = ref(false)

const activeTab = ref(0)
const activeTabDelivery = ref(0)
const selected = ref('uzum')
const selectedProvider = ref('')

const isReceiverModalOpen = ref(false)
const isAddCardModalOpen = ref(false)
const isStatusModalOpen = ref(false)

const productTabs = [{ label: 'To‘lov tizimlari' }, { label: 'Kartalar orqali' }]
const deliveryTabs = [{ label: 'Topshirish punkti' }, { label: 'Yetkazib berish' }]

const paymentMethods = [
	{ value: 'uzum', title: 'Uzum bank', img: '/images/payments/uzum-bank.svg' },
	{ value: 'click', title: 'Click', img: '/images/payments/click.svg' },
	{ value: 'payme', title: 'Payme', img: '/images/payments/payme.svg' },
	{ value: 'paynet', title: 'Paynet', img: '/images/payments/paynet.svg' }
]

const handleTabChange = (index: number, tab: any) => {
	console.log('Tab changed:', index, tab)
}
const handleDeliveryTabChange = (index: number, tab: any) => {
	console.log('Tab changed:', index, tab)
}

onMounted(() => {
	setTimeout(() => {
		isPending.value = false
	}, 2000)
})
</script>
