<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useMutation, useQueryClient } from '@tanstack/vue-query'

const props = defineProps<{
	productSlug?: string
	initialQuantity?: number
}>()

const { $axios } = useNuxtApp()
const { showToast } = useCustomToast()
const queryClient = useQueryClient()
const authStore = useAuthStore()

const { authModal, isAuthenticated } = storeToRefs(authStore)

const quantity = ref(props.initialQuantity || 0)

const { mutate, isPending } = useMutation({
	mutationFn: async (newQuantity: number) => {
		return await $axios.post('payment/add-to-cart/', {
			product_slug: props.productSlug,
			quantity: newQuantity
		})
	},
	onSuccess: (res, newQuantity) => {
		quantity.value = newQuantity
		queryClient.invalidateQueries({ queryKey: ['cart'] })
		if (newQuantity === 0) {
			showToast('Mahsulot savatdan olib tashlandi', 'info')
		}
	},
	onError: (err: any) => {
		showToast(err.response?.data?.detail || 'Xatolik yuz berdi', 'error')
	}
})

const handleAction = (type: 'plus' | 'minus' | 'first') => {
	if (!isAuthenticated.value) {
		showToast('Avval ro‘yxatdan o‘ting', 'warning')
		authModal.value = true
		return
	}

	if (isPending.value) return

	let nextValue = quantity.value

	if (type === 'first' || type === 'plus') {
		nextValue += 1
	} else if (type === 'minus' && quantity.value > 0) {
		nextValue -= 1
	}

	mutate(nextValue)
}
</script>

<template>
	<div class="w-full">
		<Transition name="fade" mode="out-in">
			<div v-if="quantity > 0 && isAuthenticated" class="flex items-center gap-2 py-2 px-3 h-10 border border-blue rounded-full bg-white w-full">
				<button @click="handleAction('minus')" :disabled="isPending" class="counterClass">
					<span class="icon-minus shrink-0 text-2xl leading-6 transition-300"></span>
				</button>

				<span class="flex-1 text-center text-base font-bold leading-130">
					<i v-if="isPending" class="icon-spinner animate-spin"></i>
					<template v-else>{{ quantity }}</template>
				</span>

				<button @click="handleAction('plus')" :disabled="isPending" class="counterClass relative">
					<span class="icon-plus shrink-0 text-2xl leading-6 transition-300"></span>
				</button>
			</div>

			<UIButton v-else :loading="isPending" class="!bg-[#0083FF14] !text-blue !w-full" @click="handleAction('first')">
				Savatga qo‘shish
				<img src="/images/shopping-bag.svg" alt="" class="size-5 sm:size-6" />
			</UIButton>
		</Transition>
	</div>
</template>
