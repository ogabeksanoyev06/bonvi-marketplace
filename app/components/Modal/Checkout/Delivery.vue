<template>
	<div>
		<div class="flex items-center gap-3 px-4 cursor-pointer" @click="isOpen = true">
			<i class="icon-location-pin text-2xl leading-6 text-black shrink-0"></i>
			<div class="flex flex-col gap-1 flex-1">
				<h4 class="font-medium leading-130">Yetkazib berish manzili tanlanmagan</h4>
				<span class="text-xs leading-130">Uygacha yetkazish</span>
			</div>
			<div class="flex-center size-7 p-1 rounded-full bg-gray shrink-0">
				<i class="icon-chevron text-xl leading-5 -rotate-90 ml-1"></i>
			</div>
		</div>
		<UIModal v-model="isOpen" title="Qayerga yetkazish kerak?">
			<div>
				<div class="flex flex-col gap-4 p-4 md:px-6 md:py-5">
					<FormInput v-model="search" class="!h-11 !bg-[#F3F3F3] focus-within:!bg-white" suffixClass="!cursor-pointer !pointer-events-auto">
						<template #prefix>
							<i class="icon-search text-2xl leading-6 text-[#676767] pr-2"></i>
						</template>
						<template #suffix>
							<i class="icon-x-mark text-2xl leading-6 text-[#676767] scale-0 opacity-0" :class="{ '!scale-100 !opacity-100': search?.length }" @click="search = ''"></i>
						</template>
					</FormInput>

					<!-- Map -->
					<div class="yandex-map-container relative z-0 max-md:rounded-[20px] max-md:overflow-hidden">
						<div ref="mapContainer" class="map-container"></div>
					</div>
				</div>
				<div class="md:px-6 md:pb-6 max-md:p-3 w-full">
					<UIButton text="Tasdiqlash" class="h-[46px] w-full" />
				</div>
			</div>
		</UIModal>
	</div>
</template>

<script setup lang="ts">
const isOpen = ref(false)
const search = ref('')
</script>
