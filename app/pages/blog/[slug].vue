<template>
	<div>
		<transition name="fade" mode="out-in">
			<div v-if="true" class="bg-white rounded-[40px] px-4 py-6 md:px-10 md:py-6">
				<div class="container flex flex-col gap-6 max-w-[1120px] mx-auto w-full animate-pulse">
					<div class="h-10 md:h-12 skeleton rounded-xl w-3/4"></div>
					<div class="flex flex-col gap-3">
						<div class="h-5 skeleton rounded-md w-full"></div>
						<div class="h-5 skeleton rounded-md w-full"></div>
						<div class="h-5 skeleton rounded-md w-1/2"></div>
					</div>

					<div class="h-[350px] md:h-[440px] skeleton rounded-3xl w-full"></div>
				</div>
			</div>
			<div v-else>
				<UIBreadcrumb :routes="breadcrumbItems" />
				<NuxtLinkLocale to="/blog" class="container max-w-[1120px] flex-y-center gap-3 py-3 md:py-5">
					<div class="flex-center size-9 md:size-10 bg-white rounded-full">
						<span class="icon-chevron text-black text-[28px] leading-7 rotate-90"></span>
					</div>
					<h3 class="text-[28px] leading-130 font-bold">Bloglar</h3>
				</NuxtLinkLocale>

				<div class="bg-white rounded-[40px] px-4 py-6 md:px-10 md:py-6">
					<div class="container flex flex-col gap-5 max-w-[1120px] mx-auto w-full">
						<h1 class="text-2xl md:text-3xl lg:text-[42px] !font-bold leading-130">
							{{ blog?.title }}
						</h1>
						<p class="text-base md:text-xl !leading-130 text-black">
							{{ blog?.description }}
						</p>
						<UIImage :src="blog?.image" image-class="rounded-3xl" class="h-[350px] md:h-[440px] rounded-3xl" />
					</div>
				</div>
			</div>
		</transition>
	</div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { useQuery } from '@tanstack/vue-query'
import type { IBlogItem } from '~/types/blogs.d'

const { $axios } = useNuxtApp()

const route = useRoute()
const slug = route.params.slug as string

const { data: blog, isPending } = useQuery({
	queryKey: ['blog', slug],
	queryFn: async () => {
		const res = await $axios.get<IBlogItem>(`common/blogs/${slug}/`)
		return res.data
	},
	enabled: !!slug
})

const breadcrumbItems = computed(() => [
	{ name: 'Blog', path: '/blog' },
	{ name: blog.value?.title || '...', path: '' }
])
</script>
