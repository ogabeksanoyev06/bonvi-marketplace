<template>
	<Teleport to="body">
		<div
			:class="[wrapperClass, { '!opacity-100 !visible': value }]"
			data-modal="wrapper"
			class="fixed w-full h-full bg-black/50 flex justify-center items-center z-[100] top-0 left-0 invisible opacity-0 transition-300 p-3"
			@click="handleOuterClick"
		>
			<Transition name="modal" mode="out-in">
				<div v-if="value" class="bg-white w-full lg:max-w-[480px] relative max-h-screen md:overflow-y-auto rounded-[32px]" :class="[bodyClass, { animated: animationIn }]">
					<div v-if="!noHeader" class="flex items-center border-b border-gray px-6 pt-5 pb-3 rounded-t-[32px]" :class="[headerStyle]">
						<slot name="header">
							<h3 class="w-full text-base md:text-lg !leading-130 font-bold font-adero-trial" :class="titleStyle">
								{{ title }}
							</h3>
							<button class="w-6 md:w-8 h-6 md:h-8 bg-[#EDF2F7] rounded-full shrink-0 flex-center p-1 transition-300 active:scale-95 group" @click="value = false">
								<span class="icon-x-mark text-lg md:text-2xl leading-[18px] md:leading-6 text-[#1C2329] group-hover:text-red transition-300" />
							</button>
						</slot>
					</div>
					<button v-if="noHeader && hasCloseIcon" class="absolute -top-7 lg:-top-12 -right-0 lg:-right-[80px] active:scale-95 group" @click="value = false">
						<span class="icon-x-mark text-2xl leading-6 text-[#011118] group-hover:text-red-600 transition-300" />
					</button>
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
}
const props = withDefaults(defineProps<Props>(), {
	title: 'Modal title',
	titleStyle: '',
	headerStyle: '',
	wrapperClass: '',
	bodyClass: '',
	modalClass: ''
})

interface Emits {
	(e: 'outer-click'): void
}
const emit = defineEmits<Emits>()
const value = defineModel<boolean>('modelValue', { required: true })
const animationIn = ref(false)

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
@keyframes modal {
	from {
		opacity: 0;
		transform: translateY(-40px);
	}
	to {
		opacity: 1;
		transform: translateY(0);
	}
}

.modal-enter-active {
	animation: modal 0.3s ease-in-out;
}
.modal-leave-active {
	animation: modal 0.3s ease-in-out reverse;
}

@keyframes mobile-modal {
	from {
		opacity: 0;
		transform: translateY(50%);
	}
	to {
		opacity: 1;
		transform: translateY(0);
	}
}
.mobile-modal-enter-active {
	animation: mobile-modal 0.5s ease-in-out;
}
.mobile-modal-leave-active {
	animation: mobile-modal 0.5s ease-in-out reverse;
}

@keyframes horizontal-shaking {
	0% {
		transform: translateX(0);
	}
	20% {
		transform: translateX(-8px);
	}
	40% {
		transform: translateX(8px);
	}
	60% {
		transform: translateX(-6px);
	}
	80% {
		transform: translateX(6px);
	}
	100% {
		transform: translateX(0);
	}
}
.animated {
	animation: horizontal-shaking 0.4s ease-in-out;
}
</style>
