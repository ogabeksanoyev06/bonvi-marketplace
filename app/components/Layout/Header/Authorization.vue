<template>
	<div>
		<!-- <UIDropdown v-if="isAuthenticated" :show="showDropdown" @toggle="handleDropdownToggle" body-class="!min-w-[200px] bg-white border-2 border-gray">
			<template #head="{ show }">
				<div
					class="flex items-center md:h-14 gap-1 bg-gray pr-2 md:pr-4 rounded-full border-2 border-transparent overflow-hidden cursor-pointer transition-300"
					:class="{ '!border-blue bg-white': show }"
				>
					<img src="/images/user.png" alt="user" class="rounded-full size-10 md:size-14 aspect-square" />
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
					<span class="size-7 flex-center rounded-full p-1 shrink-0" :class="[item.key === 'logout' ? 'text-red bg-[#F110001F]' : 'bg-gray']">
						<i class="text-xl leading-5 transition-300" :class="item.icon" />
					</span>
					<span class="text-sm font-medium leading-140 transition-300">
						{{ item.label }}
					</span>
				</div>
			</template>
		</UIDropdown> -->

		<UIButton text="Kirish" icon="icon-logout text-2xl leading-6 lg:block hidden" class="font-medium lg:max-w-[100px] w-full h-8 lg:h-auto" @click="authModal = true" />

		<ModalAuth v-model="authModal" />
	</div>
</template>

<script setup>
const showDropdown = ref(false)

const auth = useAuthStore()

const { isAuthenticated, authModal } = storeToRefs(auth)
const { logout } = auth

const profileMenu = [
	{
		key: 'profile',
		label: 'Profil ma’lumotlari',
		icon: 'icon-user',
		route: '/profile'
	},
	{
		key: 'orders',
		label: 'Buyurtmalarim',
		icon: 'icon-order',
		route: '/profile/orders'
	},
	{
		key: 'cards',
		label: 'Kartalarim',
		icon: 'icon-card',
		route: '/profile/my-cards'
	},
	{
		key: 'logout',
		label: 'Tizimdan chiqish',
		icon: 'icon-logout',
		route: null
	}
]

function handleDropdownToggle(val) {
	showDropdown.value = val
}

function handleItemClick(item) {
	showDropdown.value = false

	if (item.key === 'logout') {
		logout()
		return
	}

	if (item.route) {
		navigateTo(item.route)
	}
}
</script>
