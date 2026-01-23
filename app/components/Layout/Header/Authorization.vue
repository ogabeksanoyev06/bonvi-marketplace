<template>
	<UIDropdown :show="showDropdown" @toggle="handleDropdownToggle" :body-class="['!min-w-[200px] bg-white border-2 border-gray']">
		<template #head="{ show }">
			<div
				class="flex items-center h-14 gap-1 bg-gray pr-4 rounded-full border-2 border-transparent overflow-hidden cursor-pointer transition-300"
				:class="[show ? '!border-blue bg-white' : '']"
			>
				<img src="/images/user.png" alt="user" class="rounded-full size-14 aspect-square" />
				<i class="icon-chevron flex-center text-2xl leading-6 aspect-square transition-300" :class="[show ? '!rotate-180' : '']" />
			</div>
		</template>

		<template #body>
			<div
				v-for="item in profileMenu"
				:key="item.key"
				class="w-full group flex items-center gap-2 p-3 cursor-pointer border-b border-gray last:border-b-0 transition-300 hover:bg-gray/50"
				@click="handleItemClick(item)"
			>
				<span class="size-7 flex-center rounded-full p-1 shrink-0" :class="[item.key === 'logout' ? 'text-[#F11000] bg-[#F110001F]' : 'bg-gray']">
					<i class="text-xl leading-5 transition-300" :class="item.icon" />
				</span>
				<span class="text-sm font-medium leading-140 transition-300">
					{{ item.label }}
				</span>
			</div>
		</template>
	</UIDropdown>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const showDropdown = ref(false)

const profileMenu = [
	{
		key: 'profile',
		label: 'Profil ma’lumotlari',
		icon: 'icon-user'
	},
	{
		key: 'orders',
		label: 'Buyurtmalarim',
		icon: 'icon-order'
	},
	{
		key: 'cards',
		label: 'Kartalarim',
		icon: 'icon-card'
	},
	{
		key: 'logout',
		label: 'Tizimdan chiqish',
		icon: 'icon-logout'
	}
]

function handleDropdownToggle(val: boolean) {
	showDropdown.value = val
}

function handleItemClick(item: { key: string }) {
	showDropdown.value = false

	if (item.key === 'logout') {
		console.log('Logout')
		return
	}
}
</script>
