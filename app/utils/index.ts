export function formatMoneyDecimal(number: any, fix = 0) {
	const option = {
		maximumFractionDigits: fix,
		minimumFractionDigits: fix
	}

	const formatted = number ? new Intl.NumberFormat('ru-RU', option).format(number) : '0'

	return `${formatted}`
}

export function phoneNumberFormat(number: string) {
	if (!number) return ''

	const cleaned = ('' + number).replace(/\D/g, '')
	const match = cleaned.match(/^(\d{3})(\d{3})(\d{2})(\d{2})$/)
	if (match) {
		return `+${match[1]} (${match[2]}) ${match[3]}-${match[4]}`
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
