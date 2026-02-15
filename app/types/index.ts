export interface IFaqResponse {
	count: number
	next: string | null
	previous: string | null
	results: {
		id: number
		question: string
		answer: string
	}[]
}

export interface IAboutItem {
	id: number
	title: string
	description: string
	logo: string
	link: string
	image: string
}

export interface IAboutResponse {
	count: number
	next: string | null
	previous: string | null
	results: IAboutItem[]
}
