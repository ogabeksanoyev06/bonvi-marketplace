<template>
	<Teleport to="body">
		<div
			data-modal="wrapper"
			@click="handleOuterClick"
			class="fixed inset-0 bg-black/50 z-[100] transition-300 invisible opacity-0"
			:class="[wrapperClass, { '!opacity-100 !visible': value }, props.variant === 'mobile' ? 'flex items-end' : 'flex items-center justify-center p-3']"
		>
			<Transition :name="transitionName" mode="out-in">
				<div
					v-if="value"
					:class="[
						'bg-white w-full overflow-y-auto relative',
						props.variant === 'mobile' ? 'rounded-t-[32px] max-h-[calc(100vh-100px)]' : 'max-h-[calc(100vh-50px)] lg:max-w-[480px] rounded-[32px]',
						bodyClass,
						{ animated: animationIn }
					]"
				>
					<!-- HEADER -->
					<div v-if="!noHeader" class="flex items-center border-b border-gray px-6 pt-5 pb-3 shrink-0" :class="headerStyle">
						<!-- Chap qism: title slot -->
						<div class="flex-1">
							<slot name="header-title">
								<h3 class="w-full text-base md:text-lg font-bold font-adero-trial" :class="titleStyle">
									{{ title }}
								</h3>
							</slot>
						</div>

						<!-- Close button doim ko‘rinadi -->
						<button class="w-8 h-8 bg-[#EDF2F7] rounded-full flex-center active:scale-95 transition-300 shrink-0" @click="value = false">
							<span class="icon-x-mark text-xl" />
						</button>
					</div>

					<!-- CLOSE ICON (NO HEADER) -->
					<button v-if="noHeader && hasCloseIcon" class="absolute top-4 right-4 active:scale-95 transition-300" @click="value = false">
						<span class="icon-x-mark text-2xl" />
					</button>

					<!-- CONTENT -->
					<slot />
				</div>
			</Transition>
		</div>
	</Teleport>
</template>

<script lang="ts" setup>
interface Props {
	title?: string
	wrapperClass?: string | string[]
	modalClass?: string | string[]
	noHeader?: boolean
	disableOuterClose?: boolean
	bodyClass?: string | string[]
	hasCloseIcon?: boolean
	titleStyle?: string
	headerStyle?: string
	variant?: 'desktop' | 'mobile'
}
const props = withDefaults(defineProps<Props>(), {
	title: 'Modal title',
	variant: 'desktop'
})

interface Emits {
	(e: 'outer-click'): void
}
const emit = defineEmits<Emits>()
const value = defineModel<boolean>('modelValue', { required: true })
const animationIn = ref(false)

const transitionName = computed(() => {
	return props.variant === 'mobile' ? 'mobile-modal' : 'modal'
})

const modalBodyClass = computed(() => {
	return props.variant === 'mobile' ? 'fixed bottom-0 left-0 w-full rounded-t-[32px]' : 'relative w-full lg:max-w-[480px] rounded-[32px]'
})

function handleOuterClick(e: Event) {
	const target = e.target as HTMLElement
	if (target.dataset?.modal == 'wrapper') {
		emit('outer-click')
		if (!props.disableOuterClose) {
			value.value = false
		} else {
			animationIn.value = true
			setTimeout(() => {
				animationIn.value = false
			}, 500)
		}
	}
}

watch(
	() => value.value,
	(val) => {
		if (val) {
			document.body.style.overflow = 'hidden'
		} else {
			document.body.style.overflow = 'auto'
		}
	}
)
onMounted(() => {
	document.addEventListener('keydown', (e) => {
		if (e.key === 'Escape' && !props.disableOuterClose) {
			value.value = false
		}
	})
})
</script>

<style scoped>
.modal-enter-active,
.modal-leave-active {
	transition: all 0.3s ease;
}
.modal-enter-from,
.modal-leave-to {
	opacity: 0;
	transform: translateY(-30px);
}

.mobile-modal-enter-active,
.mobile-modal-leave-active {
	transition: all 0.4s ease;
}
.mobile-modal-enter-from,
.mobile-modal-leave-to {
	opacity: 0;
	transform: translateY(100%);
}

.animated {
	animation: shake 0.4s ease;
}

@keyframes shake {
	0% {
		transform: translateX(0);
	}
	25% {
		transform: translateX(-6px);
	}
	50% {
		transform: translateX(6px);
	}
	75% {
		transform: translateX(-4px);
	}
	100% {
		transform: translateX(0);
	}
}
</style>
