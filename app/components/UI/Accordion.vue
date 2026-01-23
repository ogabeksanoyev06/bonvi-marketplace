<template>
	<div :class="['cursor-pointer', wrapperClass]" class="w-full">
		<div @click="$emit('toggle')" :class="['w-full px-4 py-4', headerClass]">
			<slot name="header" />
		</div>

		<transition @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter" @before-leave="beforeLeave" @leave="leave">
			<div v-show="show" class="overflow-hidden">
				<slot name="body" />
			</div>
		</transition>
	</div>
</template>

<script setup lang="ts">
interface Props {
	show: boolean
	wrapperClass?: string | string[]
	headerClass?: string | string[]
}

withDefaults(defineProps<Props>(), {
	show: false,
	wrapperClass: '',
	headerClass: ''
})

defineEmits<{
	toggle: []
}>()

const TRANSITION_DURATION = 350
const TRANSITION_EASING = 'cubic-bezier(0.4, 0, 0.2, 1)'

const beforeEnter = (el: Element) => {
	const element = el as HTMLElement
	element.style.height = '0'
	element.style.opacity = '0'
}

const enter = (el: Element) => {
	const element = el as HTMLElement
	element.style.transition = `height ${TRANSITION_DURATION}ms ${TRANSITION_EASING}, opacity ${TRANSITION_DURATION - 100}ms ease`

	void element.offsetHeight
	element.style.height = `${element.scrollHeight}px`
	element.style.opacity = '1'
}

const afterEnter = (el: Element) => {
	const element = el as HTMLElement
	element.style.height = 'auto'
	element.style.transition = ''
}

const beforeLeave = (el: Element) => {
	const element = el as HTMLElement
	element.style.height = `${element.scrollHeight}px`
}

const leave = (el: Element) => {
	const element = el as HTMLElement
	element.style.transition = `height ${TRANSITION_DURATION}ms ${TRANSITION_EASING}, opacity ${TRANSITION_DURATION - 150}ms ease`
	void element.offsetHeight
	element.style.height = '0'
	element.style.opacity = '0'
}
</script>
