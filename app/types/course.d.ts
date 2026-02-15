export interface ILessonDoc {
	id: number
	file_url: string
	file_type: string
	file_size?: string // API-da hozircha yo'q, lekin kerak bo'lishi mumkin
}

export interface ILesson {
	id: number
	title: string
	description: string
	duration_minutes: number
	view_count: number
	likes_count: number
	is_liked: boolean
	is_for_premium: boolean
	docs: ILessonDoc[]
	thumbnail?: string
}

export interface ILessonResponse {
	count: number
	next: string | null
	previous: string | null
	results: ILesson[]
}
