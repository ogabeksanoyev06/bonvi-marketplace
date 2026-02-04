<template>
	<Transition
		enter-active-class="transition-all duration-300 ease-out"
		enter-from-class="opacity-0 translate-x-[-100%]"
		enter-to-class="opacity-100 translate-x-0"
		leave-active-class="transition-all duration-200 ease-in"
		leave-from-class="opacity-100 translate-x-0"
		leave-to-class="opacity-0 translate-x-[-100%]"
	>
		<div v-if="modelValue" class="bg-white fixed z-[999] top-0 left-0 right-0 w-full h-screen overflow-hidden">
			<div class="h-full overflow-y-auto pb-6">
				<div class="flex items-center justify-between px-4 py-3 sticky top-0 bg-white z-20">
					<button @click="modelValue = false" class="flex-center size-8 p-1 bg-blue rounded-full transition-300 cursor-pointer">
						<i class="icon-x-mark text-2xl leading-6 text-white" />
					</button>
					<div class="flex items-center gap-1">
						<LayoutHeaderLocationSelector />
						<LayoutHeaderLangSwitcher />
						<NuxtLinkLocale to="/favorites" class="relative flex-center size-9 bg-[#F6E03929] rounded-full p-1">
							<img src="/images/header/favourite.svg" alt="icon favorites" />
						</NuxtLinkLocale>
					</div>
				</div>
				<div class="flex flex-col gap-6 px-4 py-4">
					<FormInput v-model="search" class="h-[54px] !rounded-[20px]" @focus="isFocused = true" input-class="!text-base" placeholder="Qidirish" prefix-class="mr-2">
						<template #prefix v-if="!isFocused">
							<button class="shrink-0 transition-300">
								<img src="/images/header/search.svg" alt="icon search" class="size-6" />
							</button>
						</template>

						<template #suffix>
							<button class="w-8 h-8 bg-[#EDF2F7] rounded-full flex-center active:scale-95 transition-300 shrink-0" :class="search ? 'opacity-100 scale-100' : 'opacity-0 scale-0'">
								<span class="icon-x-mark text-xl" />
							</button>
						</template>
					</FormInput>
					<nav class="flex flex-col gap-6">
						<NuxtLinkLocale v-for="(link, index) in [...navigationLinks]" :key="index" :to="link.route" class="text-black text-lg leading-130 font-bold" active-class="text-blue">
							{{ link.title }}
						</NuxtLinkLocale>
					</nav>
				</div>
			</div>
		</div>
	</Transition>
</template>

<script setup lang="ts">
const modelValue = defineModel<boolean>({ default: false })

const route = useRoute()
const { t } = useI18n()

const isFocused = ref(false)
const search = ref('')

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

watch(
	() => route.fullPath,
	() => {
		if (modelValue.value) {
			modelValue.value = false
		}
	}
)
</script>
