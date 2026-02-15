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
	tab: any[]
	images: IProductImage[]
	rating: string
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
