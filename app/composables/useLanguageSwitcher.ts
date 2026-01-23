import { useI18n } from 'vue-i18n'

export const useLanguageSwitcher = () => {
	const { locale, setLocale: changeLocaleI18n } = useI18n()

	const languagesList = [
		{
			name: "O'zbekcha",
			short: 'Oʻz',
			code: 'uz',
			flag: '/images/flags/uz.svg'
		},
		{
			name: 'English',
			short: 'En',
			code: 'en',
			flag: '/images/flags/en.svg'
		},
		{
			name: 'Русский',
			short: 'Ru',
			code: 'ru',
			flag: '/images/flags/ru.svg'
		},
		{
			name: '中文',
			short: 'Zh',
			code: 'zh',
			flag: '/images/flags/zh.svg'
		}
	]

	const currentLanguage = computed(() => languagesList.find((lang) => lang.code === locale.value))
	async function changeLocale(_locale: string) {
		await changeLocaleI18n(_locale as 'en' | 'ru' | 'uz' | 'zh')
		// window.location.reload()
	}

	return { currentLanguage, languagesList, changeLocale }
}
