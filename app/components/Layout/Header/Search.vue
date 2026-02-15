<template>
	<div class="hidden lg:flex-center size-9 bg-[#3BADF90F] rounded-full p-1 cursor-pointer hover:bg-[#3BADF920] transition-colors" @click="openSearch">
		<img src="/images/header/search.svg" alt="icon search" />
	</div>

	<Teleport to="body">
		<!-- Backdrop -->
		<Transition
			enter-active-class="transition-opacity duration-300"
			enter-from-class="opacity-0"
			enter-to-class="opacity-100"
			leave-active-class="transition-opacity duration-200"
			leave-from-class="opacity-100"
			leave-to-class="opacity-0"
		>
			<div v-if="isSearchOpen" class="fixed inset-0 bg-black/50 z-[98]" @click="closeSearch"></div>
		</Transition>

		<!-- Search Container -->
		<Transition
			enter-active-class="transition-all duration-300 ease-out"
			enter-from-class="opacity-0 -translate-y-4"
			enter-to-class="opacity-100 translate-y-0"
			leave-active-class="transition-all duration-200 ease-in"
			leave-from-class="opacity-100 translate-y-0"
			leave-to-class="opacity-0 -translate-y-4"
		>
			<div v-if="isSearchOpen" ref="searchContainer" class="fixed top-[30px] left-1/2 -translate-x-1/2 max-w-[1044px] flex flex-col gap-4 w-full z-[99] px-2 sm:px-4" @click.stop>
				<!-- Input -->
				<div class="relative">
					<input
						ref="searchInput"
						v-model="searchQuery"
						type="text"
						placeholder="Qidirish"
						class="w-full bg-white outline-none pl-5 pr-14 h-[52px] focus:ring-[3px] focus:ring-white/20 rounded-[20px] transition-all"
						@input="handleSearch"
					/>
					<button
						class="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-[#EDF2F7] rounded-full flex-center active:scale-95 transition-300 shrink-0"
						:class="searchQuery ? 'scale-100 opacity-100' : 'scale-0 opacity-0'"
						@click="searchQuery = ''"
					>
						<span class="icon-x-mark text-xl" />
					</button>
				</div>

				<!-- Results Container with Transition -->
				<Transition
					enter-active-class="transition-all duration-300 ease-out"
					enter-from-class="opacity-0 translate-y-2 scale-95"
					enter-to-class="opacity-100 translate-y-0 scale-100"
					leave-active-class="transition-all duration-200 ease-in"
					leave-from-class="opacity-100 translate-y-0 scale-100"
					leave-to-class="opacity-0 translate-y-2 scale-95"
				>
					<div v-if="isSearchOpen" class="bg-white rounded-[20px] min-h-[200px] max-h-[calc(90vh-85.5px)] p-2 py-4 sm:p-4 overflow-y-auto select-none scrollbar-none shadow-xl">
						<transition name="fade" mode="out-in">
							<ul v-if="searchQuery" class="bg-blue-light rounded-2xl px-3 flex flex-col">
								<li class="flex items-center gap-2 pb-4 pt-4 border-b border-gray last:border-b-0 last:pb-3 first:pt-3 cursor-pointer" v-for="key in 5" :key>
									<i class="icon-search text-black/40 text-2xl leading-6"></i>
									<span class="text-base leading-130 font-medium font-adero-trial text-black">Tezyurar</span>
								</li>
							</ul>
							<div v-else-if="!searchQuery" class="flex flex-col gap-6">
								<div class="flex-y-center gap-1">
									<img src="/images/scooter.svg" alt="fire-icon" class="size-10 md:block hidden" />
									<h2 class="section-title">Tavsiya etamiz</h2>
								</div>
								<div class="md:hidden">
									<transition name="fade" mode="out-in">
										<template v-if="isPending">
											<div class="flex overflow-hidden gap-3">
												<CardProductLoading v-for="key in 8" :key="key" class="!w-[278px] shrink-0" />
											</div>
										</template>
										<template v-else>
											<div></div>
											<!-- <SectionCarouselProducts :products="items" /> -->
										</template>
									</transition>
								</div>
								<div class="grid grid-cols-2 lg:grid-cols-3 gap-2 md:gap-5">
									<template v-if="isPending">
										<CardProductLoading v-for="key in 8" :key="key" />
									</template>
									<template v-else>
										<div></div>
										<!-- <CardProduct image-bg="blue" /> -->
									</template>
								</div>
							</div>
						</transition>
					</div>
				</Transition>
			</div>
		</Transition>
	</Teleport>
</template>

<script lang="ts" setup>
import { ref, watch, onBeforeUnmount } from 'vue'

const isSearchOpen = ref(false)
const searchQuery = ref('')
const searchInput = ref<HTMLInputElement | null>(null)
const searchContainer = ref<HTMLElement | null>(null)

const originalOverflow = ref('')

const isPending = ref(false)

const handleEscape = (e: KeyboardEvent) => {
	if (e.key === 'Escape' && isSearchOpen.value) {
		closeSearch()
	}
}

const openSearch = async () => {
	isSearchOpen.value = true
	await nextTick()
	searchInput.value?.focus()
	isPending.value = true
	setTimeout(() => {
		isPending.value = false
	}, 1200)
}

const closeSearch = () => {
	isSearchOpen.value = false
	searchQuery.value = ''
}

const handleSearch = () => {}

watch(
	() => isSearchOpen.value,
	(val) => {
		if (val) {
			originalOverflow.value = document.body.style.overflow
			document.body.style.overflow = 'hidden'
			window.addEventListener('keydown', handleEscape)
		} else {
			document.body.style.overflow = originalOverflow.value
			window.removeEventListener('keydown', handleEscape)
		}
	}
)

onBeforeUnmount(() => {
	window.removeEventListener('keydown', handleEscape)
	if (isSearchOpen.value) {
		document.body.style.overflow = originalOverflow.value
	}
})
</script>

<style scoped>
/* Custom scrollbar */
.scrollbar-none::-webkit-scrollbar {
	display: none;
}

.scrollbar-none {
	-ms-overflow-style: none;
	scrollbar-width: none;
}
</style>
