import { defineStore } from 'pinia'
import { useNuxtApp } from '#app'
import type { IUser } from '~/types/auth'
import { ref } from 'vue'

export const useCommonStore = defineStore('auth', () => {
	const { $axios } = useNuxtApp()

	const user = ref<IUser | null>(null)

	const fetchUser = async () => {}

	const updateProfile = async () => {}

	const logout = async () => {}

	return {
		user,
		fetchUser,
		updateProfile,
		logout
	}
})
