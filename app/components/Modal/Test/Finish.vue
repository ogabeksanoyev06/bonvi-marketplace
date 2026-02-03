<template>
	<UIModal v-model="isOpen" :no-header="true" class="" body-class="!max-w-[800px]">
		<canvas ref="confettiCanvas" class="fixed inset-0 w-full h-full pointer-events-none z-[9999]" />

		<div class="relative">
			<div class="flex-center relative">
				<img ref="targetElement" src="/images/finish-img.png" alt="finish-img" class="w-[224px] aspect-[112/61] md:w-[366px] md:aspect-[183/100]" />
			</div>

			<div class="flex flex-col items-center px-6 pt-6 pb-3 gap-3">
				<h3 class="text-base md:text-2xl font-bold leading-140">Kunlik savollar yakunlandi</h3>
				<div class="grid grid-cols-1 md:grid-cols-2 gap-5 border p-3 border-gray rounded-2xl w-full md:w-fit">
					<div class="flex-y-center gap-2">
						<div class="size-10 flex-center bg-[#FF582A] rounded-full p-2">
							<img src="/images/test-calendar-icon.svg" alt="" />
						</div>
						<div class="flex flex-col">
							<span class="text-sm leading-130">Topshirilgan sana</span>
							<span class="text-base leading-130 font-semibold">8.10.26, 20:20</span>
						</div>
					</div>
					<div class="flex-y-center gap-2">
						<div class="size-10 flex-center bg-green rounded-full p-2">
							<img src="/images/test-clock-icon.svg" alt="" />
						</div>
						<div class="flex flex-col">
							<span class="text-sm leading-130">Sarflangan vaqt</span>
							<span class="text-base leading-130 font-semibold">8 daqiqa</span>
						</div>
					</div>
				</div>
			</div>
			<div class="flex flex-col items-center gap-0.5">
				<h3 class="text-3xl leading-130 font-bold">8 000 UZS</h3>
				<span class="text-base leading-140 text-gray-4">Sizning natijangiz</span>
			</div>
			<div class="flex flex-col items-start gap-2 px-6 pt-3 pb-6">
				<h4 class="text-lg font-bold leading-130">Savollar</h4>
				<div class="flex flex-wrap gap-3">
					<button v-for="key in 10" :key class="w-[62px] md:w-16 py-[15px] flex-center bg-green text-white border border-white/20 rounded-xl text-xl font-bold leading-130">
						{{ key }}
					</button>
				</div>
			</div>
		</div>
		<div class="absolute top-5 right-5">
			<button class="w-8 h-8 bg-gray rounded-full flex-center active:scale-95 transition-300 shrink-0" @click="isOpen = false">
				<span class="icon-x-mark text-xl" />
			</button>
		</div>
	</UIModal>
</template>

<script setup lang="ts">
const isOpen = defineModel<boolean>('modelValue', { required: true })

const { confettiCanvas, targetElement, startConfetti, stopConfetti } = useConfetti()

const triggerConfettiIfOpen = () => {
	if (isOpen.value) {
		nextTick(() => {
			setTimeout(startConfetti, 400)
		})
	}
}

watch(isOpen, (newValue) => {
	if (newValue) {
		triggerConfettiIfOpen()
	} else {
		stopConfetti()
	}
})

onMounted(() => {
	triggerConfettiIfOpen()
})
</script>
