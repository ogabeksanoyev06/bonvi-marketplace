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
						<FormInput v-model="form.values.phone" v-maska="'## ### ## ##'" placeholder="00 000 00 00">
							<template #prefix>
								<span class="pr-2">+998</span>
							</template>
						</FormInput>
					</FormGroup>
					<FormCheckbox label="Referal kod orqali kirish" v-model="form.values.useReferral" />
					<!-- Referral code -->
					<div v-if="form.values.useReferral" class="w-full">
						<FormGroup label="Referal kod">
							<FormInput v-model="form.values.referral" class="px-3" />
						</FormGroup>
					</div>
				</div>
				<!-- STEP 2: Confirm Phone -->
				<div v-else-if="step === 2" class="flex flex-col gap-6 w-full">
					<div class="text-center">
						<h2 class="text-2xl font-bold">+998 {{ form.values.phone }}</h2>
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
								text="+998 93 472 93 35"
								icon="icon-edit text-2xl leading-6"
								class="!rounded-[14px] font-medium"
								mainClass="gap-2.5"
								@click="step = 1"
							/>
						</div>
					</div>
					<div class="flex flex-col items-center gap-3">
						<FormInputOtp :digits="5" />
						<FormOtpTimer :timer="true" :seconds-val="90" @timeout="timer = false" @resend="sendCode" />
					</div>
				</div>

				<!-- STEP 4: FIO & Birthday -->
				<div v-else="step === 4" class="flex flex-col gap-4 w-full">
					<FormGroup label="To‘liq ismingiz">
						<FormInput v-model="form.values.name" />
					</FormGroup>

					<FormGroup label="Tug‘ilgan sana">
						<FormInput v-maska="'##.##.####'" v-model="form.values.birthday">
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
				<UIButton text="Davom etish" class="w-full font-bold" @click="handleSubmitForm" />
			</div>

			<!-- close-icon -->
			<button class="absolute top-4 right-4 size-8 flex-center rounded-full p-[5px_4px_3px_4px] bg-[#EDF2F7] group" @click="isOpen = false">
				<span class="icon-x-mark text-2xl leading-6 group-hover:text-red-600 transition-300"></span>
			</button>
		</div>
	</UIModal>
</template>

<script setup lang="ts">
import { required, minLength, sameAs } from '@vuelidate/validators'

const emit = defineEmits<{
	close: []
}>()
const isOpen = defineModel<boolean>('modelValue', { required: true })

const form = useForm(
	{
		phone: '',
		name: '',
		birthday: '',
		referral: '',
		useReferral: false
	},
	{}
)

const step = ref(1)
const timer = ref(true)

const sendCode = () => {
	if (form.values.useReferral) {
		step.value = 4
	} else {
		step.value = 2
	}
}

const handleVerifyPhone = () => {
	step.value = 3
}

const handleVerifyCode = () => {
	step.value = 4
}

const handleSubmitForm = () => {
	switch (step.value) {
		case 1:
			sendCode()
			break
		case 2:
			handleVerifyPhone()
			break
		case 3:
			handleVerifyCode()
			break
		case 4:
			isOpen.value = false
			step.value = 1
			break
		default:
			step.value = 1
	}
}
</script>
