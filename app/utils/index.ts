export function getNextPageOffset(lastPage: { next: string; results: any[] }, allPages: any[], limit: number = 8) {
	if (lastPage.next) {
		try {
			const nextUrl = new URL(lastPage.next)
			const offset = nextUrl.searchParams.get('offset')
			return offset ? parseInt(offset) : undefined
		} catch (e) {
			console.warn('Invalid next URL:', lastPage.next)
		}
	}

	const results = lastPage.results
	if (Array.isArray(results) && results.length < limit) {
		return undefined
	}

	return allPages.length * limit
}

export function formatMoneyDecimal(number: any, fix = 0) {
	const option = {
		maximumFractionDigits: fix,
		minimumFractionDigits: fix
	}

	const val = Number(number)

	if (isNaN(val) || !number) {
		return '0'
	}

	try {
		const formatted = new Intl.NumberFormat('ru-RU', option).format(val)
		return `${formatted}`
	} catch (e) {
		console.error('Format error:', e)
		return '0'
	}
}

export function phoneNumberFormat(number: string) {
	if (!number) return ''

	const cleaned = ('' + number).replace(/\D/g, '')

	const match = cleaned.match(/^(\d{2})(\d{3})(\d{2})(\d{2})$/)
	if (match) {
		return `+998 (${match[1]}) ${match[2]}-${match[3]}-${match[4]}`
	}

	return number
}

export const moneyMask = () => ({
	mask: ['D', '##', '###', '# ###', '## ###', '### ###', '# ### ###', '## ### ###', '### ### ###', '# ### ### ###'],
	tokens: {
		D: {
			pattern: /[1-9]/
		}
	}
})

export const removeSpaces = (text: string) => {
	return text?.replace(/\s/g, '')
}

export function maskCardNumber(card: string) {
	if (!card) return ''

	const cleaned = card.replace(/\D/g, '')

	if (cleaned.length < 16) {
		return cleaned.replace(/(\d{4})(?=\d)/g, '$1 ')
	}

	const first = cleaned.slice(0, 4)
	const last = cleaned.slice(-4)

	return `${first} **** **** ${last}`
}

export const maskPhone = (value: string) => {
	if (!value) return ''

	// faqat raqamlarni oladi
	const digits = value.replace(/\D/g, '')

	// +998 bilan boshlanishini ta'minlaydi
	const formatted =
		'+998 ' +
		(digits[3] ?? '') +
		(digits[4] ? digits[4].replace(/\d/g, '**') : '') +
		(digits[5] ? digits[5].replace(/\d/g, '**') : '') +
		(digits[6] ? digits[6].replace(/\d/g, '*') : '') +
		(digits[7] ? digits[7].replace(/\d/g, '*') : '') +
		(digits[8] ? digits[8].replace(/\d/g, '*') : '') +
		(digits[9] ?? '')

	return formatted
}

export async function copyText(text: string) {
	await navigator.clipboard.writeText(text)
}

export const formatDuration = (totalMinutes: number = 0) => {
	const hours = Math.floor(totalMinutes / 60)
	const minutes = Math.floor(totalMinutes % 60)
	const seconds = Math.round((totalMinutes - Math.floor(totalMinutes)) * 60)

	const hms = [String(hours).padStart(2, '0'), String(minutes).padStart(2, '0'), String(seconds).padStart(2, '0')].join(':')

	const longParts = []
	if (hours > 0) longParts.push(`${hours} soat`)
	if (minutes > 0 || hours === 0) longParts.push(`${minutes} daqiqa`)
	const long = longParts.join(' ')

	const short = `${Math.floor(totalMinutes)} min`

	return {
		hms,
		long,
		short
	}
}
