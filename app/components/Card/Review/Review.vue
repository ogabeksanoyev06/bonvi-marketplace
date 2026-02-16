<template>
	<div class="flex flex-col gap-2.5 rounded-2xl bg-[linear-gradient(180deg,_#FFF_0%,_rgba(255,255,255,0.62)_100%)] p-3 min-h-[200px] h-full shadow-sm">
		<div class="flex-y-center gap-2">
			<UIImage :src="item?.user_avatar" class="size-10 rounded-full object-cover border border-gray" alt="user avatar" />
			<h3 class="text-base font-semibold font-adero-trial leading-normal whitespace-pre-line">
				{{ item?.user_name || 'Mijoz' }}
			</h3>
		</div>

		<div class="flex-y-center gap-3">
			<div class="flex-y-center gap-1 bg-gray rounded-full py-1 px-1.5">
				<i class="icon-star text-base leading-4 text-[#14A463]" />
				<span class="font-medium">{{ item?.rating || 5 }}</span>
			</div>
			<span class="text-xs leading-130 text-[#676767]">
				{{ dayjs(item?.created_at).format('DD.MM.YYYY, HH:mm') }}
			</span>
		</div>

		<p class="text-sm leading-130 text-black line-clamp-6">"{{ item?.text }}"</p>
	</div>
</template>

<script setup lang="ts">
import type { IReview } from '~/types'

const props = defineProps<{
	item: IReview
}>()

const dayjs = useDayjs()
</script>
