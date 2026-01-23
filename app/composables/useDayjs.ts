import dayjs from 'dayjs'
import 'dayjs/locale/uz-latn'
import 'dayjs/locale/ru'
import 'dayjs/locale/en'
import 'dayjs/locale/zh'
import localizedFormat from 'dayjs/plugin/localizedFormat'

// Extend dayjs with plugins
dayjs.extend(localizedFormat)

export const useDayjs = () => {
	const { locale } = useI18n()

	// Get the correct dayjs locale based on i18n locale
	const getDayjsLocale = (i18nLocale: string) => {
		return i18nLocale === 'uz' ? 'uz-latn' : i18nLocale
	}

	// Create a dayjs instance with current locale
	const localizedDayjs = (...args: Parameters<typeof dayjs>) => {
		const dayjsLocale = getDayjsLocale(locale.value)
		return dayjs(...args).locale(dayjsLocale)
	}

	// Watch for locale changes
	watch(locale, (newLocale) => {
		const dayjsLocale = getDayjsLocale(newLocale)
		dayjs.locale(dayjsLocale)
	})

	// Set initial locale
	const dayjsLocale = getDayjsLocale(locale.value)
	dayjs.locale(dayjsLocale)

	return localizedDayjs
}
