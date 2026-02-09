import { defineStore } from 'pinia'

export const useCommonStore = defineStore('common', () => {
	const authModal = ref(false)

	return { authModal }
})
