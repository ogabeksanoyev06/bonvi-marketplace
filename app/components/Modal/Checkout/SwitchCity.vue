<template>
	<div>
		<div class="flex items-center gap-3 px-4 cursor-pointer" @click="isOpen = true">
			<i class="icon-location-pin text-2xl leading-6 text-black shrink-0"></i>
			<div class="flex flex-col gap-1 flex-1">
				<h4 class="font-medium leading-130">Topshirish punkti tanlanmagan</h4>
				<span class="text-xs leading-130">Topshirish punkti</span>
			</div>
			<div class="flex-center size-7 p-1 rounded-full bg-gray shrink-0">
				<i class="icon-chevron text-xl leading-5 -rotate-90 ml-1"></i>
			</div>
		</div>

		<UIModal v-model="isOpen" title="Topshirish punktini tanlang">
			<div class="flex flex-col md:gap-5">
				<div class="flex flex-col gap-4 px-4 py-3 md:px-5 md:pt-5 md:pb-0">
					<FormRadio v-for="item in items" :key="item.value" v-model="selected" :value="item.value">
						<template #label>
							<div class="flex flex-col gap-1">
								<h3 class="text-sm font-bold leading-130">Toshkent filiali</h3>
								<div class="flex-y-center gap-2">
									<span class="text-xs leading-130">Adham rahmat ko'chasi, 15, Toshkent</span>
									<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
										<path
											d="M16.6654 3.33333L9.9987 9.99999M16.6654 3.33333V7.08333M16.6654 3.33333H12.9154M15.832 10.4167V14C15.832 14.9334 15.832 15.4001 15.6504 15.7566C15.4906 16.0702 15.2356 16.3252 14.922 16.485C14.5655 16.6667 14.0988 16.6667 13.1654 16.6667H5.9987C5.06528 16.6667 4.59857 16.6667 4.24205 16.485C3.92844 16.3252 3.67348 16.0702 3.51369 15.7566C3.33203 15.4001 3.33203 14.9334 3.33203 14V6.83333C3.33203 5.89991 3.33203 5.4332 3.51369 5.07668C3.67348 4.76307 3.92844 4.50811 4.24205 4.34832C4.59857 4.16666 5.06528 4.16666 5.9987 4.16666H9.58203"
											stroke="#0959DE"
											stroke-width="1.6"
											stroke-linecap="round"
											stroke-linejoin="round"
										/>
									</svg>
								</div>
							</div>
						</template>
					</FormRadio>
				</div>
				<div class="md:px-6 md:pb-6 p-3 md:pt-0 w-full">
					<UIButton text="Tasdiqlash" class="h-[46px] w-full" />
				</div>
			</div>
		</UIModal>
	</div>
</template>

<script setup lang="ts">
const isOpen = ref(false)
const selected = ref('')

const items = [
	{
		value: 'tashkent-1',
		title: 'Toshkent filiali',
		address: "Adham rahmat ko'chasi, 15, Toshkent"
	},
	{
		value: 'tashkent-2',
		title: 'Toshkent filiali 2',
		address: "Buyuk Ipak Yo'li, 10, Toshkent"
	},
	{
		value: 'samarqand',
		title: 'Samarqand filiali',
		address: "Registon ko'chasi, 25, Samarqand"
	}
]
</script>
