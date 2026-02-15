export interface IBlogItem {
	id: number
	title: string
	description: string
	image: string
	main_image_url: string
	images: {
		id: number
		image_url: string
		is_main: boolean
	}[]
	created_at: string
	updated_at: string
}

export interface IBlogListResponse {
	count: number
	next: string | null
	previous: string | null
	results: IBlogItem[]
}
