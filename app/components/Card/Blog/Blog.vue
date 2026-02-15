<template>
	<NuxtLinkLocale :to="`/blog/${item?.id}`" class="bg-white rounded-2xl md:p-2 w-full flex flex-col gap-6 group">
		<img :src="item?.image" :alt="item?.title" class="rounded-[20px] h-[258px] w-full object-cover" />

		<div class="flex flex-col gap-3">
			<div class="flex-y-center gap-1 border border-gray px-2 py-1.5 rounded-[20px] w-max">
				<span class="icon-calendar text-xl leading-5 text-gray-3"></span>
				<span class="text-gray-3 font-medium">{{ dayjs(item?.created_at).format('D-MMMM, HH:mm') }}</span>
			</div>

			<h3 class="text-2xl text-dark-1 font-bold !leading-130 line-clamp-2 transition-300 group-hover:text-blue">
				{{ item?.title }}
			</h3>

			<p class="text-sm !leading-130 text-black text-ellipsis line-clamp-3">
				{{ item?.description }}
			</p>
		</div>
	</NuxtLinkLocale>
</template>

<script lang="ts" setup>
import type { IBlogItem } from '~/types/blogs.d'
interface Props {
	item: IBlogItem
}

const props = defineProps<Props>()

const dayjs = useDayjs()
</script>
