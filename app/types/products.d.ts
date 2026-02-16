export interface IProductImage {
	id: number
	image_url: string
	is_main: boolean
}

export interface IProductCategory {
	id: number
	title: string
}

export interface IProductItem {
	id: number
	name: string
	description: string
	slug: string
	category: IProductCategory
	brand: string | null
	price: string
	is_saved: boolean
	discount_price: string | null
	discount_percent: number // JSON-da bor, interfaysga qo'shildi
	tab: any[]
	images: IProductImage[]
	rating?: string // JSON-da yo'q, optional qilindi
	in_cart_quantity: number
	count: number
	max_quantity: number
}

export interface IProductListResponse {
	count: number
	next: string | null
	previous: string | null
	results: IProductItem[]
}
