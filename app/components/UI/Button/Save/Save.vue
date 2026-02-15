<template>
	<div class="size-11 flex-center p-1.5 bg-white rounded-full cursor-pointer shrink-0" @click.stop="handleSave">
		<transition name="pulse-fade" mode="out-in">
			<i v-if="isPending" class="icon-spinner text-2xl leading-6 animate-spin text-dark" key="loading"></i>

			<img v-else-if="localInternalSaved" src="/images/saved.svg" alt="saved" class="size-6" key="saved" />

			<i v-else class="icon-saved text-gray-4 text-2xl leading-6" key="unsaved" />
		</transition>
	</div>
</template>

<script setup lang="ts">
import { useMutation } from '@tanstack/vue-query'

interface Props {
	slug: string
	modelValue: boolean
}

const props = withDefaults(defineProps<Props>(), {
	slug: '',
	modelValue: false
})

const emit = defineEmits(['update:modelValue', 'button-clicked'])

const { showToast } = useCustomToast()

const authStore = useAuthStore()

const { authModal, isAuthenticated } = storeToRefs(authStore)

const { $axios } = useNuxtApp()

const localInternalSaved = ref(props.modelValue)

watch(
	() => props.modelValue,
	(newVal) => {
		localInternalSaved.value = newVal
	}
)

const { mutate, isPending } = useMutation({
	mutationFn: async () => {
		if (localInternalSaved.value) {
			return await $axios.delete(`products/unsave/`, {
				data: { product_slug: props.slug }
			})
		} else {
			return await $axios.post(`products/saved/`, {
				product_slug: props.slug
			})
		}
	},
	onSuccess: (res) => {
		localInternalSaved.value = !localInternalSaved.value
		emit('update:modelValue', localInternalSaved.value)
		emit('button-clicked')
		showToast(res.data?.message, 'success')
	},
	onError: (err: any) => {
		showToast(err.response?.data?.detail, 'error')
	}
})

const handleSave = () => {
	if (isPending.value) return
	if (!isAuthenticated.value) {
		authModal.value = true
		showToast('Avval ro‘yxatdan o‘ting', 'warning')
		return
	}
	mutate()
}
</script>
