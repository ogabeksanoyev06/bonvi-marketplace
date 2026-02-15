import axios, { type AxiosInstance, type AxiosError } from 'axios'

declare module '#app' {
	interface NuxtApp {
		$axios: AxiosInstance
	}
}

declare module 'vue' {
	interface ComponentCustomProperties {
		$axios: AxiosInstance
	}
}

export default defineNuxtPlugin((nuxtApp) => {
	const config = useRuntimeConfig()
	const accessToken = useCookie('access_token')
	const refreshToken = useCookie('refresh_token')

	let isRefreshing = false
	let refreshSubscribers: ((token: string) => void)[] = []

	const onTokenRefreshed = (token: string) => {
		refreshSubscribers.map((callback) => callback(token))
		refreshSubscribers = []
	}

	const instance = axios.create({
		baseURL: config.public.apiBase || 'https://bonvimarket.uz/api/v1/',
		headers: {
			'Content-Type': 'application/json'
		}
	})

	instance.interceptors.request.use((request) => {
		if (accessToken.value) {
			request.headers.Authorization = `Bearer ${accessToken.value}`
		}
		return request
	})

	instance.interceptors.response.use(
		(response) => response,
		async (error: AxiosError) => {
			const originalRequest = error.config as any

			const isAuthError = error.response?.status === 401 || error.response?.status === 403

			if (isAuthError && !originalRequest._retry) {
				if (isRefreshing) {
					return new Promise((resolve) => {
						refreshSubscribers.push((token: string) => {
							originalRequest.headers.Authorization = `Bearer ${token}`
							resolve(instance(originalRequest))
						})
					})
				}

				originalRequest._retry = true
				isRefreshing = true

				try {
					const { data } = await axios.post(`https://bonvimarket.uz/refresh-token/`, {
						refresh: refreshToken.value
					})

					const newAccessToken = data.access
					accessToken.value = newAccessToken

					onTokenRefreshed(newAccessToken)
					isRefreshing = false

					originalRequest.headers.Authorization = `Bearer ${newAccessToken}`
					return instance(originalRequest)
				} catch (refreshError) {
					isRefreshing = false
					refreshSubscribers = []

					accessToken.value = null
					refreshToken.value = null

					return Promise.reject(refreshError)
				}
			}

			return Promise.reject(error)
		}
	)

	nuxtApp.provide('axios', instance)
})
