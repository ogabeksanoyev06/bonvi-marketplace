// Bitta carpenter item
export interface ICraftsmenItem {
	id: number
	full_name: string
	service_type: string
	address: string
	avatar_url: string
}

// API response
export interface IICraftsmenListResponse {
	count: number
	next: string | null
	previous: string | null
	results: ICraftsmenItem[]
}
