<template>
	<header class="lg:container sticky top-0 z-50 lg:pt-4 w-full">
		<div
			class="flex items-center p-4 h-[60px] border-b border-[#E6E6E6] lg:border lg:border-transparent lg:p-5 lg:h-20 lg:rounded-full bg-white/95 transition-300 w-full"
			:class="[y > 100 ? 'lg:backdrop-blur-md lg:!border-gray lg:shadow-header' : '']"
		>
			<UIButton text="" icon="icon-menu text-white text-2xl leading-6" class="!size-8 !flex-center lg:hidden" @click="isMenuOpen = true" />
			<NuxtLinkLocale to="/" class="hidden lg:flex items-center shrink-0 mr-4 xl:mr-11">
				<img class="h-8 xl:h-10" src="/images/logo.svg" alt="bonvi logo" />
			</NuxtLinkLocale>
			<nav class="items-center hidden lg:flex gap-2 xl:gap-4">
				<NuxtLinkLocale
					v-for="(link, index) in navigationLinks"
					:key="index"
					:to="link.route"
					class="text-black text-base leading-130 font-medium px-2 py-1 rounded-full bg-transparent hover:text-blue transition-300"
					active-class="text-blue !bg-[#0083FF14]"
				>
					{{ link.label }}
				</NuxtLinkLocale>
			</nav>
			<div class="flex items-center gap-6 lg:gap-3 xl:gap-5 flex-1 justify-end">
				<!-- <LayoutHeaderLocationSelector class="lg:flex hidden" /> -->
				<NuxtLinkLocale to="/" class="flex lg:hidden items-center shrink-0">
					<img class="h-8 object-contain" src="/images/logo.svg" alt="bonvi logo" />
				</NuxtLinkLocale>
				<div class="flex items-center gap-3">
					<LayoutHeaderLangSwitcher class="lg:flex hidden" />
					<div class="w-0.5 h-[30px] rounded-full bg-gray shrink-0 hidden lg:block" />
					<!-- <LayoutHeaderSearch /> -->
					<NuxtLinkLocale to="/favorites" class="relative hidden lg:flex-center size-9 bg-[#F6E03929] rounded-full p-1">
						<img src="/images/header/favourite.svg" alt="icon favorites" />
					</NuxtLinkLocale>
					<NuxtLinkLocale to="/cart" class="relative flex-center size-8 lg:size-9 bg-[#37E76329] rounded-full p-1 shrink-0">
						<img src="/images/header/basket.svg" alt="icon cart" />
					</NuxtLinkLocale>
					<div class="w-0.5 h-[30px] rounded-full bg-gray shrink-0 lg:block hidden" />
					<!-- <LayoutHeaderAuthorization /> -->
				</div>
			</div>
		</div>

		<LayoutHeaderMobileMenu v-model="isMenuOpen" />
	</header>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import { useWindowScroll, useWindowSize } from '@vueuse/core'

const { y } = useWindowScroll()
const { t } = useI18n()
const { width } = useWindowSize()

const isMenuOpen = ref(false)

const navigationLinks = [
	{ id: 'home', label: 'Asosiy', route: '/' },
	{ id: 'about', label: 'Biz haqimizda', route: '/about' },
	{ id: 'courses', label: 'Darsliklar', route: '/courses' },
	{ id: 'products', label: 'Mahsulotlar', route: '/products' },
	{ id: 'blog', label: 'Blog', route: '/blog' }
]

watch(isMenuOpen, (val) => {
	document.body.style.overflow = val ? 'hidden' : 'auto'
})
</script>

<style scoped>
.shadow-header {
	box-shadow:
		0 581px 163px 0 rgba(0, 0, 0, 0),
		0 372px 149px 0 rgba(0, 0, 0, 0.01),
		0 209px 126px 0 rgba(0, 0, 0, 0.03),
		0 93px 93px 0 rgba(0, 0, 0, 0.04),
		0 23px 51px 0 rgba(0, 0, 0, 0.05);
}
</style>
