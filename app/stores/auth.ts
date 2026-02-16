import { defineStore } from 'pinia'
import { useNuxtApp } from '#app'

export const useAuthStore = defineStore('auth', () => {
	const { $axios } = useNuxtApp()
	const route = useRoute()
	const { showToast } = useCustomToast()

	const access_token = useCookie<string | null>('access_token', { default: () => null })
	const refresh_token = useCookie<string | null>('refresh_token', { default: () => null })

	const user = ref<any>(null)
	const authModal = ref(false)

	const isAuthenticated = computed(() => !!access_token.value)
	//  && !!user.value

	const setTokens = (access: string, refresh: string) => {
		access_token.value = access
		refresh_token.value = refresh
	}

	const logout = () => {
		access_token.value = null
		refresh_token.value = null
		user.value = null
		if (route.path !== '/') {
			navigateTo('/')
		}
	}

	return { access_token, refresh_token, user, authModal, isAuthenticated, setTokens, logout }
})
