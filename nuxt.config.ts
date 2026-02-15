// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	compatibilityDate: '2025-07-15',
	devtools: { enabled: true },
	css: ['@/assets/css/main.css', '@/assets/icomoon/style.css'],
	app: {
		pageTransition: { name: 'page-change', mode: 'out-in' },
		head: {
			link: [
				{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
				{ rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
				{ rel: 'apple-touch-icon', href: '/favicon.svg' }
			]
		}
	},
	modules: [
		'@nuxtjs/i18n',
		'@nuxtjs/tailwindcss',
		[
			'@pinia/nuxt',
			{
				autoImports: ['defineStore', ['defineStore', 'definePiniaStore']]
			}
		],
		'@nuxt/eslint',
		'@vueuse/nuxt'
	],
	i18n: {
		locales: [
			{
				code: 'en',
				iso: 'en-US',
				file: 'en.json'
			},
			{
				code: 'ru',
				iso: 'ru-RU',
				file: 'ru.json'
			},
			{
				code: 'uz',
				iso: 'uz-UZ',
				file: 'uz.json'
			},
			{
				code: 'zh',
				iso: 'zh-CN',
				file: 'zh.json'
			}
		],
		defaultLocale: 'uz',
		strategy: 'prefix_and_default',
		detectBrowserLanguage: {
			useCookie: true,
			cookieKey: 'locale'
		},
		langDir: 'locales',
		compilation: {
			strictMessage: false
		}
	}
})
