<template>
	<header class="container sticky top-0 z-50 pt-4">
		<div
			class="flex items-center border border-transparent p-5 rounded-full bg-white/95 h-20 transition-300"
			:class="[y > 100 ? 'backdrop-blur-md !border-gray shadow-header' : '']"
		>
			<NuxtLinkLocale to="/" class="flex items-center shrink-0 mr-5 lg:mr-11">
				<img class="h-10" src="/images/logo.svg" alt="bonvi logo" />
			</NuxtLinkLocale>
			<nav class="items-center hidden lg:flex gap-4">
				<NuxtLinkLocale
					v-for="(link, index) in navigationLinks"
					:key="index"
					:to="link.route"
					class="text-black text-base leading-130 font-medium px-2 py-1 rounded-full bg-transparent hover:text-blue transition-300"
					active-class="text-blue !bg-[#0083FF14]"
				>
					{{ link.title }}
				</NuxtLinkLocale>
			</nav>
			<div class="ml-auto flex items-center gap-5 flex-1 justify-end">
				<LayoutHeaderLocationSelector />
				<div class="flex items-center gap-3">
					<LayoutHeaderLangSwitcher />
					<div class="w-0.5 h-[30px] rounded-full bg-gray shrink-0" />
					<LayoutHeaderSearch />
					<NuxtLinkLocale to="/favorites" class="relative flex-center size-9 bg-[#F6E03929] rounded-full p-1">
						<img src="/images/header/favourite.svg" alt="icon favorites" />
					</NuxtLinkLocale>
					<NuxtLinkLocale to="/cart" class="relative flex-center size-9 bg-[#37E76329] rounded-full p-1">
						<img src="/images/header/basket.svg" alt="icon cart" />
					</NuxtLinkLocale>
					<div class="w-0.5 h-[30px] rounded-full bg-gray shrink-0" />
					<LayoutHeaderAuthorization />
				</div>
			</div>
		</div>
	</header>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import { useWindowScroll } from '@vueuse/core'

const { y } = useWindowScroll()
const { t } = useI18n()

const navigationLinks = computed(() => [
	{
		title: t('home'),
		route: '/'
	},
	{
		title: t('about'),
		route: '/about'
	},
	{
		title: t('courses'),
		route: '/courses'
	},
	{
		title: t('products'),
		route: '/products'
	},
	{
		title: t('blog'),
		route: '/blog'
	}
])
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
