<template>
	<div>
		<div class="size-11 flex-center p-1.5 bg-white rounded-full cursor-pointer" @click="isOpen = true">
			<i class="icon-share text-gray-4 text-2xl leading-6"></i>
		</div>

		<UIModal v-model="isOpen" :no-header="true" :has-close-icon="true" :disable-outer-close="true" body-class="!max-w-[400px]">
			<div class="p-5">
				<p class="text-dark leading-6 text-xl font-bold mb-6">Ulashish</p>

				<div class="flex items-center justify-center rounded-lg cursor-pointer overflow-hidden border border-gray-200 bg-gray-100 gap-5 h-12 px-4 py-1.5 w-full">
					<span v-for="(i, idx) in links" :key="idx" :class="i.icon" class="transition-200 text-black text-2xl leading-6 cursor-pointer" @click="share(i.network)"></span>
				</div>

				<div class="flex items-center rounded-lg border border-gray-200 bg-gray-100 gap-3 pl-4 mt-3 w-full">
					<p class="font-semibold text-sm truncate flex-1">
						{{ fullUrl }}
					</p>

					<button class="w-10 h-12 flex-center bg-white border-l border-white rounded-r-lg duration-200 relative" @click="copyUrl">
						<Transition
							enter-active-class="transition-all duration-200"
							enter-from-class="opacity-0 scale-50"
							enter-to-class="opacity-100 scale-100"
							leave-active-class="transition-all duration-150"
							leave-from-class="opacity-100 scale-100"
							leave-to-class="opacity-0 scale-50"
							mode="out-in"
						>
							<i v-if="!copied" key="copy" class="icon-copy text-xl leading-5 text-gray-4"></i>
							<i v-else key="copied" class="icon-copy-check text-xl leading-5 text-blue"></i>
						</Transition>

						<UITooltip :show="copied" with-trigger class="!-top-5"> Ko'chirildi </UITooltip>
					</button>
				</div>
			</div>
		</UIModal>
	</div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'

const route = useRoute()

const isOpen = ref(false)
const copied = ref(false)

const title = ref('Super mahsulot')

const fullUrl = computed(() => {
	return window.location.origin + route.fullPath
})

const links = reactive([
	{ icon: 'icon-send hover:text-blue', network: 'telegram' },
	{ icon: 'icon-twitter hover:text-blue', network: 'twitter' },
	{ icon: 'icon-facebook hover:text-blue', network: 'facebook' }
])

const share = (network: string) => {
	if (!process.client) return

	switch (network) {
		case 'telegram':
			window.open(`https://t.me/share/url?url=${url.value}&text=${title.value}`, '_blank')
			break
		case 'twitter':
			window.open(`https://twitter.com/intent/tweet?text=${title.value}\n${url.value}`, '_blank')
			break
		case 'facebook':
			window.open(`https://www.facebook.com/sharer/sharer.php?u=${url.value}`, '_blank')
			break
	}
}

// Copy function
const copyUrl = async () => {
	if (copied.value) return

	await copyText(fullUrl.value)
	copied.value = true

	setTimeout(() => {
		copied.value = false
	}, 1500)
}
</script>
