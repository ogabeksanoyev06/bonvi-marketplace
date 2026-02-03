<template>
	<div class="flex-center size-9 bg-[#3BADF90F] rounded-full p-1 cursor-pointer hover:bg-[#3BADF920] transition-colors" @click="openSearch">
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
			<div v-if="isSearchOpen" ref="searchContainer" class="fixed top-[30px] left-1/2 -translate-x-1/2 max-w-[1044px] flex flex-col gap-4 w-full z-[99] px-4" @click.stop>
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
					<button class="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-[#EDF2F7] rounded-full flex-center active:scale-95 transition-300 shrink-0" @click="searchQuery = ''">
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
					<div v-if="searchQuery" class="bg-white rounded-[20px] min-h-[200px] max-h-[calc(90vh-85.5px)] p-6 overflow-y-auto select-none scrollbar-none shadow-xl">
						<!-- Loading State -->
						<div v-if="isLoading" class="text-center py-10">
							<div class="inline-block w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
							<p class="mt-4 text-gray-500">Qidirilmoqda...</p>
						</div>

						<!-- No Results -->
						<div v-else class="text-center py-10 text-gray-500">
							<svg class="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
							</svg>
							<p class="text-lg font-medium">Hech narsa topilmadi</p>
							<p class="text-sm mt-1">Boshqa kalit so'z bilan qidiring</p>
						</div>
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
const isLoading = ref(false)

// Original overflow qiymatini saqlash
const originalOverflow = ref('')

// ESC handler
const handleEscape = (e: KeyboardEvent) => {
	if (e.key === 'Escape' && isSearchOpen.value) {
		closeSearch()
	}
}

// Search modal ochish
const openSearch = () => {
	isSearchOpen.value = true
	// nextTick va focus ni olib tashladik
}

// Search modal yopish
const closeSearch = () => {
	isSearchOpen.value = false
	searchQuery.value = ''
	isLoading.value = false
}

// Search watch
let searchTimeout: ReturnType<typeof setTimeout> | null = null

const handleSearch = () => {
	if (searchQuery.value.length < 2) {
		isLoading.value = false
		return
	}

	// Debounce
	if (searchTimeout) {
		clearTimeout(searchTimeout)
	}

	isLoading.value = true

	searchTimeout = setTimeout(() => {
		// Bu yerda API so'rovini qo'shasiz
		// const response = await fetch(`/api/search?q=${searchQuery.value}`)

		// Hozircha faqat loading
		setTimeout(() => {
			isLoading.value = false
		}, 500)
	}, 300)
}

// Search modal ochilganda/yopilganda
watch(
	() => isSearchOpen.value,
	(val) => {
		if (val) {
			// Modal ochildi
			originalOverflow.value = document.body.style.overflow
			document.body.style.overflow = 'hidden'
			window.addEventListener('keydown', handleEscape)
		} else {
			// Modal yopildi
			document.body.style.overflow = originalOverflow.value
			window.removeEventListener('keydown', handleEscape)
		}
	}
)

// Component unmount bo'lganda cleanup
onBeforeUnmount(() => {
	window.removeEventListener('keydown', handleEscape)
	if (isSearchOpen.value) {
		document.body.style.overflow = originalOverflow.value
	}
	if (searchTimeout) {
		clearTimeout(searchTimeout)
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
