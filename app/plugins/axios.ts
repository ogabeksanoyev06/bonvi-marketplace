// plugins/axios.ts
import axios from 'axios'

export default defineNuxtPlugin((nuxtApp) => {
	const config = useRuntimeConfig()

	const instance = axios.create({
		baseURL: config.public.apiBase || 'https://bonvimarket.uz/api/v1/',
		headers: {
			'Content-Type': 'application/json'
		}
	})

	instance.interceptors.request.use(
		(request) => {
			const token = useCookie('token').value
			if (token) {
				request.headers.Authorization = `Bearer ${token}`
			}
			return request
		},
		(error) => Promise.reject(error)
	)

	instance.interceptors.response.use(
		(response) => response.data,
		async (error) => {
			if (error.response?.status === 401) {
				const token = useCookie('token')
				token.value = null
				if (process.client) {
					//
				}
			}
			return Promise.reject(error.response)
		}
	)
	nuxtApp.provide('axios', instance)
})
