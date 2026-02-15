import { defineStore } from 'pinia'
import { useNuxtApp } from '#app'
import { useMutation } from '@tanstack/vue-query'

export const useAuthStore = defineStore('auth', () => {
	const { $axios } = useNuxtApp()
	const route = useRoute()
	const { showToast } = useCustomToast()

	const access_token = useCookie<string | null>('access_token')
	const refresh_token = useCookie<string | null>('refresh_token')

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

	const { mutateAsync: updateUser, isPending } = useMutation({
		mutationFn: (data: { full_name?: string; date_birth?: string }) => {
			return $axios.patch('/users/update-profile/', {
				full_name: data.full_name,
				date_birth: data.date_birth
			})
		},
		onSuccess: (res) => {
			showToast('Profil yangilandi!', 'success')
		},
		onError: (err: any) => {
			showToast(err?.data?.detail || err?.message || 'Xatolik yuz berdi', 'error')
		}
	})

	return { access_token, refresh_token, user, authModal, isAuthenticated, setTokens, updateUser, isPending, logout }
})
