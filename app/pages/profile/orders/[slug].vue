<template>
	<div>
		<div class="mt-10">
			<div class="grid lg:grid-cols-[minmax(0,1fr)_380px] gap-6">
				<!-- main status orders -->
				<div class="flex flex-col gap-6 max-sm:-mx-4">
					<div class="flex flex-col gap-4 bg-white rounded-2xl p-5">
						<div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
							<div class="flex-y-center gap-2">
								<img :src="statusData.img" alt="" class="size-6 sm:size-8" />
								<h3 class="text-xl sm:text-2xl font-medium leading-130">{{ statusData.text }}</h3>
							</div>
							<div class="flex items-center gap-2">
								<i class="icon-calendar text-xl leading-5 text-[#6B6B6E]"></i>
								<h4 class="text-sm sm:text-base !leading-130 font-medium text-[#6B6B6E]">
									Taxminiy yetkazilish sanasi:
									<span class="font-bold text-black ml-2">20.06.2025</span>
								</h4>
							</div>
						</div>
						<div class="flex items-center justify-between gap-1">
							<div
								v-for="(step, index) in statusSteps"
								:key="index"
								class="h-1 w-full rounded-full transition-colors duration-300"
								:class="index <= statusIndex ? statusData.bgProgressColor : 'bg-gray-200'"
							></div>
						</div>
					</div>
					<transition name="fade" mode="out-in">
						<!-- LOADING -->
						<div v-if="isPending" key="loading" class="bg-white rounded-[28px] h-fit overflow-hidden">
							<CardOrderDetailLoading v-for="i in 4" :key="i" />
						</div>

						<!-- LOADED -->
						<div v-else key="loaded" class="bg-white rounded-[28px] h-fit overflow-hidden">
							<div v-for="(key, index) in 4" :key="index">
								<CardOrderDetail />
								<div v-if="index !== 3" class="w-full h-px bg-gray ml-[164px]"></div>
							</div>
						</div>
					</transition>
				</div>

				<!-- sidebar -->
				<div class="flex flex-col gap-5">
					<div class="flex flex-col gap-4 bg-white rounded-[20px] pb-3 pt-4 px-5 overflow-hidden">
						<h3 class="text-lg font-bold leading-130">Dostavka ma’lumotlari</h3>
						<div class="flex flex-col gap-3">
							<div class="flex items-center gap-3">
								<i class="icon-location-pin text-2xl leading-6"></i>
								<div class="flex flex-col gap-0.5">
									<span class="text-sm leading-130 font-medium">Adham rahmat ko'chasi, 15, Toshkent</span>
									<span class="text-xs leading-130">Toshkent, O‘zbekiston</span>
								</div>
							</div>
							<div class="w-full h-px bg-gray ml-[38px]"></div>
							<div class="flex items-center gap-3">
								<i class="icon-phone text-2xl leading-6"></i>
								<div class="flex flex-col gap-0.5">
									<span class="text-sm leading-130 font-medium">Xushnudbek Saytkulov</span>
									<span class="text-xs leading-130">+998 (71) 200-70-07</span>
								</div>
							</div>
						</div>
					</div>
					<div class="flex flex-col gap-4 bg-white rounded-[20px] py-4 px-5 overflow-hidden">
						<h3 class="text-lg font-medium text-gray-4">To‘lov usuli: <span class="font-bold text-black">Karta orqali</span></h3>
						<div class="w-full h-px bg-gray"></div>
						<div class="flex items-center gap-3">
							<img src="/images/Small.png" alt="" />
							<div class="flex flex-col gap-0.5">
								<span class="text-sm font-bold leading-130">**** 3232</span>
								<span class="text-xs leading-130">Karta orqali</span>
							</div>
						</div>
					</div>
					<div class="flex flex-col gap-2 bg-white rounded-[20px] pb-3 pt-4 overflow-hidden">
						<h3 class="text-base font-bold leading-140 px-5">To‘lov cheki</h3>
						<div class="flex flex-col gap-3 mt-3">
							<div class="flex items-center justify-between px-5">
								<span>Mahsulotlar soni</span>
								<span class="text-base font-bold leading-130">15 dona</span>
							</div>
							<div class="w-full h-px bg-gray ml-5"></div>
							<div class="flex items-center justify-between px-5">
								<span>Mahsulotlar narxi</span>
								<span class="text-base font-bold leading-130">15 <span class="text-xs font-normal">UZS</span></span>
							</div>
							<div class="w-full h-px bg-gray ml-5"></div>

							<div class="flex items-center justify-between px-5">
								<span>Chegirma</span>
								<span class="text-base font-bold leading-130">15 <span class="text-xs font-normal">UZS</span></span>
							</div>
							<div class="w-full h-px bg-gray ml-5"></div>

							<div class="flex items-center justify-between px-5">
								<span>Yetkazib berish narxi</span>
								<span class="text-base font-bold leading-130">15 <span class="text-xs font-normal">UZS</span></span>
							</div>
							<div class="w-full h-px bg-gray ml-5"></div>

							<div class="flex items-center justify-between px-5">
								<span class="font-bold">Umumiy:</span>
								<span class="text-lg font-bold leading-130">14 300 000 <span class="text-[13px] font-normal">UZS</span></span>
							</div>
						</div>
					</div>
					<UIButton text="Buyurtmani bekor qilish" variant="secondary" class="h-[46px]" />
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
definePageMeta({ sidebar: false })

const isPending = ref(true)

const statusKey = ref('pending')

const statusSteps = ['pending', 'accepted', 'delivering', 'delivered']

const statusIndex = computed(() => {
	if (statusKey.value === 'cancelled') return -1
	return statusSteps.indexOf(statusKey.value)
})

const statusMap = {
	pending: {
		text: 'Ko‘rib chiqilmoqda',
		img: '/images/order/pending.svg',
		bgProgressColor: 'bg-orange-500'
	},
	accepted: {
		text: 'Qabul qilindi',
		img: '/images/order/accepted.svg',
		bgProgressColor: 'bg-blue-500'
	},
	delivering: {
		text: 'Yetkazilmoqda',
		img: '/images/order/delivering.svg',
		bgProgressColor: 'bg-purple-500'
	},
	delivered: {
		text: 'Yetkazildi',
		img: '/images/order/delivered.svg',
		bgProgressColor: 'bg-green-500'
	},
	cancelled: {
		text: 'Bekor qilindi',
		img: '/images/order/cancelled.svg',
		bgProgressColor: 'bg-gray-400'
	}
}

const statusData = computed(() => statusMap[statusKey.value])

onMounted(() => {
	setTimeout(() => {
		isPending.value = false
	}, 2000)
})
</script>
