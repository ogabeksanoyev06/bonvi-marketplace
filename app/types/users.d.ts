// types/users.ts
// Request types
export interface ISendOtp {
	phone_number: string
}

export interface IVerifyOtp {
	otp_code: string
	session?: string
}

export interface IUpdateProfile {
	full_name: string
	date_birth?: string | null
}

// Response types
export interface ISendOtpResponse {
	detail: string
	session: string
}

export interface IVerifyOtpResponse {
	detail: string
	user: {
		id: number
		phone_number: string
		full_name: string
	}
	tokens: {
		refresh: string
		access: string
	}
}

export interface IUpdateProfileResponse {
	id: number
	full_name: string
	date_birth?: string | null
	phone_number: string
}
