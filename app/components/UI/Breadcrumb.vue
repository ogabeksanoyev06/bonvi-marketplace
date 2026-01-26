<template>
	<div class="container hidden-on-print max-md:hidden py-2.5">
		<div class="bg-white h-9 rounded-full flex items-center px-4 py-2 w-fit">
			<nuxt-link-locale to="/" aria-label="home" class="text-black text-sm leading-130 flex items-center font-bold hover:text-blue transition-300 group">
				{{ $t('home') }}
			</nuxt-link-locale>
			<span class="icon-chevron text-xl leading-5 -rotate-90 text-[#0E0F11]/50 block mx-2" />
			<template v-for="(link, index) in routes" :key="index">
				<nuxt-link-locale
					v-if="index !== routes.length - 1"
					:to="link.path"
					class="text-[#B3B3B3] text-sm leading-130 font-bold flex items-center hover:text-blue transition-300 capitalize"
				>
					{{ $t(link.name) }}
				</nuxt-link-locale>
				<span v-if="index !== routes.length - 1" class="icon-chevron text-xl leading-5 -rotate-90 text-[#0E0F11]/50 block mx-2" />
				<span v-if="index === routes.length - 1" class="text-sm font-bold leading-130 text-[#B3B3B3]">
					{{ link.name }}
				</span>
			</template>
		</div>
	</div>
</template>
<script setup lang="ts">
interface IBreadcrumb {
	name: string
	path: string
}

interface Props {
	routes: IBreadcrumb[]
	transparent?: boolean
}
defineProps<Props>()
</script>
