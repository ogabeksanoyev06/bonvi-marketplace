<template>
	<UIModal v-model="isOpen" :no-header="true" :disable-outer-close="true">
		<div class="flex flex-col items-center gap-6 p-6 w-full relative">
			<!-- header -->
			<div class="flex flex-col items-center gap-4" v-if="step != 2">
				<div class="size-[76px] flex-center border border-white/10 bg-[linear-gradient(49deg,_#4C00FF_14.7%,_#00AEFF_81.51%)] rounded-full p-[14px]">
					<img :src="step === 1 ? '/images/phone_call.svg' : step === 3 ? '/images/message.svg' : '/images/auth-user.svg'" alt="" class="size-12 aspect-square" />
				</div>
				<h3 class="text-xl font-bold leading-130 transition-300" v-if="step !== 3">
					{{ step === 4 ? 'O‘zingiz haqingizda' : 'Ro‘yxatdan o‘tish' }}
				</h3>
			</div>

			<!-- main -->
			<Transition name="fade" mode="out-in">
				<!-- STEP 1: Phone -->
				<div v-if="step === 1" class="flex flex-col gap-4 w-full">
					<FormGroup label="Telefon raqami">
						<FormInput v-model="form.values.phone_number" v-maska="'## ### ## ##'" placeholder="00 000 00 00" :error="form.$v.value.phone_number.$error">
							<template #prefix>
								<span class="pr-2">+998</span>
							</template>
						</FormInput>
					</FormGroup>
					<FormCheckbox label="Referal kod orqali kirish" v-model="useReferral" />
					<!-- Referral code -->
					<div v-if="useReferral" class="w-full">
						<FormGroup label="Referal kod">
							<FormInput v-model="form.values.referral" :error="form.$v.value.referral.$error" />
						</FormGroup>
					</div>
				</div>
				<!-- STEP 2: Confirm Phone -->
				<div v-else-if="step === 2" class="flex flex-col gap-6 w-full">
					<div class="text-center">
						<h2 class="text-2xl font-bold">+998 {{ form.values.phone_number }}</h2>
						<span class="text-sm text-[#999EA1]">Kiritilgan raqam to‘g‘rimi?</span>
					</div>

					<div class="flex flex-col gap-2">
						<UIButton variant="secondary" text="O‘zgartirish" @click="step = 1" />
						<UIButton text="Tasdiqlash" @click="step = 3" />
					</div>
				</div>

				<!-- STEP 3: OTP -->
				<div v-else-if="step === 3" class="flex flex-col gap-3 w-full">
					<div class="flex flex-col items-center text-center gap-3 w-full">
						<h3 class="text-xl font-bold leading-130">Tasdiqlash kodi</h3>
						<div class="flex flex-col items-center gap-2">
							<span>Quyidagi raqamga tasdiqlash kodi yuborildi</span>
							<UIButton
								variant="secondary"
								:text="phoneNumberFormat(form.values.phone_number) || ''"
								icon="icon-edit text-2xl leading-6"
								class="!rounded-[14px] font-medium"
								mainClass="gap-2.5"
								@click="step = 1"
							/>
						</div>
					</div>
					<div class="flex flex-col items-center gap-3">
						<FormInputOtp :digits="6" v-model="form.values.otp" :error="form.$v.value.otp.$error" />
						<FormOtpTimer :timer="true" :seconds-val="90" @timeout="timer = false" @resend="sendCode" />
					</div>
				</div>

				<!-- STEP 4: FIO & Birthday -->
				<div v-else-if="step === 4" class="flex flex-col gap-4 w-full">
					<FormGroup label="To‘liq ismingiz">
						<FormInput v-model="form.values.full_name" :error="form.$v.value.full_name.$error" />
					</FormGroup>

					<FormGroup label="Tug‘ilgan sana">
						<FormInput v-maska="'##.##.####'" v-model="form.values.birthday" :error="form.$v.value.birthday.$error">
							<template #suffix>
								<span class="icon-calendar pl-3" />
							</template>
						</FormInput>
					</FormGroup>
				</div>
			</Transition>

			<!-- footer -->
			<div class="flex flex-col items-center gap-3 text-center w-full" v-if="step != 2">
				<p class="font-medium" v-if="step === 1">
					Tizimga kirish orqali siz <a href="http://" target="_blank" rel="noopener noreferrer" class="text-blue underline">ommaviy oferta</a> shartlariga rozilik bildirasiz
				</p>
				<UIButton text="Davom etish" class="w-full font-bold" @click="handleSubmitForm" :loading="isLoading" />
			</div>

			<!-- close-icon -->
			<button class="absolute top-4 right-4 size-8 flex-center rounded-full p-[5px_4px_3px_4px] bg-[#EDF2F7] group" @click="isOpen = false">
				<span class="icon-x-mark text-2xl leading-6 group-hover:text-red-600 transition-300"></span>
			</button>
		</div>
	</UIModal>
</template>

<script setup lang="ts">
import { useMutation } from '@tanstack/vue-query'
import { required, minLength, requiredIf } from '@vuelidate/validators'
import type { ISendOtpResponse, IVerifyOtpResponse } from '~/types/users.d'

const isOpen = defineModel<boolean>('modelValue', { required: true })

const step = ref(1)
const timer = ref(true)
const useReferral = ref(false)
const sessionId = ref('')

const { $axios } = useNuxtApp()
const authStore = useAuthStore()

const { isAuthenticated } = storeToRefs(authStore)
const { setTokens } = authStore

const { showToast } = useCustomToast()
const dayjs = useDayjs()

const form = useForm(
	{
		phone_number: '',
		otp: '062745',
		full_name: '',
		birthday: '',
		referral: ''
	},
	{
		phone_number: { required: requiredIf(() => step.value === 1), minLength: minLength(12) },
		otp: { required: requiredIf(() => step.value === 3), minLength: minLength(6) },
		full_name: { required: requiredIf(() => step.value === 4), minLength: minLength(3) },
		birthday: { required: requiredIf(() => step.value === 4), minLength: minLength(10) },
		referral: { required: requiredIf(() => step.value === 1 && useReferral.value) }
	}
)

// mutations
const { mutateAsync: sendCode, isPending: isSending } = useMutation({
	mutationFn: (phone: string) => {
		return $axios.post<ISendOtpResponse>('/users/send-otp/', {
			phone_number: phone
		})
	},
	onSuccess: (res) => {
		step.value = useReferral.value ? 4 : 2
		sessionId.value = res.data.session
		showToast(res.data?.detail || 'Muvaffaqiyatli!', 'success')
	},
	onError: (err: any) => {
		showToast(err?.response?.data?.detail || err?.message || 'Xatolik', 'error')
	}
})
const { mutateAsync: verifyCode, isPending: isVerifying } = useMutation({
	mutationFn: (data: { session: string; otp_code: string }) => {
		return $axios.post<IVerifyOtpResponse>('/users/verify-otp/', {
			session: data.session,
			otp_code: data.otp_code
		})
	},
	onSuccess: (res) => {
		step.value = 4
		setTokens(res.data.tokens.access, res.data.tokens.refresh)
		showToast(res.data.detail, 'success')
	},
	onError: (err: any) => {
		showToast(err?.response?.data?.detail || err?.message || 'Xatolik', 'error')
	}
})

const handleSave = async () => {
	// await updateUser({
	// 	full_name: form.values.full_name,
	// 	date_birth: dayjs(form.values.birthday).format('YYYY-MM-DD')
	// })
	isOpen.value = false
	step.value = 1
	form.values = {
		phone_number: '',
		otp: '062745',
		full_name: '',
		birthday: '',
		referral: ''
	}
	form.$v.value.$reset()
}

const isLoading = computed(() => isSending.value || isVerifying.value)

const handleSubmitForm = async () => {
	form.$v.value.$touch()
	if (!form.$v.value.$invalid) {
		switch (step.value) {
			case 1:
				sendCode('+998' + form.values.phone_number.replace(/ /g, ''))
				break

			case 2:
				step.value = 3
				break

			case 3:
				verifyCode({ session: sessionId.value, otp_code: form.values.otp })
				break

			case 4:
				await handleSave()
				break

			default:
				step.value = 1
		}
	}
}
</script>
