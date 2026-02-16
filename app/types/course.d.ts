export interface ILessonDoc {
	id: number
	file_url: string
	file_type: string
	file_size?: string
}

// Har bir darsning asosiy maydonlari
export interface ILesson {
	id: number
	title: string
	description: string
	duration_minutes: number
	view_count: number
	likes_count?: number // JSONda next_lessons ichida yo'q bo'lishi mumkin
	is_liked: boolean
	is_for_premium: boolean
	docs: ILessonDoc[]
	video_thumbnail?: string
	video_file_url?: string
}

/** * Siz yuborgan JSON strukturasiga mos interface
 * Masalan: marketing/lessons/5/ kabi endpointdan qaytadi
 */
export interface ILessonSingleResponse {
	lesson: ILesson
	next_lessons: ILesson[]
}

/** * Pagination bilan qaytadigan ro'yxat uchun interface
 * Masalan: marketing/lessons/ kabi endpointdan qaytadi
 */
export interface ILessonResponse {
	count: number
	next: string | null
	previous: string | null
	results: ILesson[]
}
