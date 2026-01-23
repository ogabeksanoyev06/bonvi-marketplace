<template>
	<div ref="dropdown" class="relative" data-dropdown="0" tabindex="0">
		<div :class="headClass" @click="toggleShow">
			<slot name="head" :show="showBody"></slot>
		</div>
		<transition
			enter-active-class="transition ease-out duration-100"
			enter-from-class="transform opacity-0 scale-95"
			enter-to-class="transform opacity-100 scale-100"
			leave-active-class="transition ease-in duration-75"
			leave-from-class="transform opacity-100 scale-100"
			leave-to-class="transform opacity-0 scale-95"
		>
			<div
				v-show="showBody"
				:class="[bodyClass, fullWidth ? 'fixed left-0 right-0' : 'absolute right-0 w-max min-w-full translate-y-full -bottom-1 shadow-main rounded-3xl']"
				data-dropdown-body
				class="overflow-hidden z-[11]"
			>
				<slot name="body" />
			</div>
		</transition>
	</div>
</template>

<script lang="ts" setup>
import { ref, watch, useTemplateRef } from 'vue'
import { onClickOutside, useWindowScroll } from '@vueuse/core'

const { y } = useWindowScroll()

watch(y, (newVal) => {
	if (showBody.value) {
		close()
	}
})

const dropdown = useTemplateRef<HTMLElement>('dropdown')

onClickOutside(dropdown, () => {
	close()
})

interface Props {
	headClass?: string
	bodyClass?: string | string[]
	show?: boolean | undefined
	withTrigger?: boolean
	fullWidth?: boolean
}
const props = withDefaults(defineProps<Props>(), {
	show: undefined,
	headClass: '',
	bodyClass: '',
	fullWidth: false
})

interface Emits {
	(e: 'toggle', v: boolean): void
}
const emit = defineEmits<Emits>()

const showBody = ref(props.show ?? false)

function toggleShow() {
	if (!props.withTrigger) {
		if (props.show === undefined) {
			showBody.value = !showBody.value
		} else {
			emit('toggle', !props.show)
		}
	}
}

function close() {
	if (props.show === undefined) {
		showBody.value = false
	} else {
		emit('toggle', false)
	}
}

watch(
	() => props.show,
	(v) => {
		showBody.value = v ?? false
	}
)
</script>
