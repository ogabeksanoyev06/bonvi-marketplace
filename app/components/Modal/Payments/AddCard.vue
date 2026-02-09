<template>
	<UIModal v-model="isOpen" title="Karta qo‘shish" bodyClass="!max-w-[480px]">
		<Transition name="fade" mode="out-in">
			<div v-if="step === 1">
				<div class="flex flex-col p-4 md:py-5 md:px-5 gap-6">
					<div class="flex flex-col items-start gap-4">
						<FormGroup label="Karta raqam" class="w-full">
							<FormInput v-model="form.values.number" v-maska="'#### #### #### ####'" placeholder="0000 0000 00000 0000" />
						</FormGroup>
						<FormGroup label="Karta muddati">
							<FormInput v-model="form.values.expiry" v-maska="'##/##'" placeholder="00/00" suffix-class="pointer-events-auto">
								<template #suffix>
									<button class="flex-center size-7 p-1 bg-gray rounded-full cursor-pointer scale-0 opacity-0" :class="{ '!scale-100 !opacity-100': form.values.expiry }">
										<i class="icon-x-mark text-2xl leading-6 text-[#676767] pt-0.5" @click="form.values.expiry = ''"></i>
									</button>
								</template>
							</FormInput>
						</FormGroup>
					</div>
					<div class="flex items-center justify-between bg-gray p-2 rounded-xl">
						<h3 class="text-xs font-medium leading-130">Qo‘llab-quvvatlanadigan bank kartalari</h3>
						<div class="h-8 w-px bg-[#E6E6E6]"></div>
						<div class="flex items-center gap-2">
							<div class="flex-center rounded-lg bg-white p-1 size-7">
								<img src="/images/uzcard-logo.svg" alt="uzcard-logo" class="size-5" />
							</div>
							<div class="flex-center rounded-lg bg-white p-1 size-7">
								<img src="/images/humo-logo.svg" alt="humo-logo" class="size-5" />
							</div>
						</div>
					</div>
				</div>
				<div class="px-4 pb-2.5 pt-3 md:px-6 md:py-5 w-full">
					<UIButton variant="secondary" text="Qo‘shish" class="w-full h-[46px]" @click="step = 2" />
				</div>
				<p class="max-w-[342px] mx-auto w-full text-center text-xs leading-130 px-4 pb-3 md:pb-6">
					Tugmani bosish orqali siz <a href="" class="text-blue">ommaviy oferta</a> shartlariga rozilik bildirasiz.
				</p>
			</div>

			<div v-else-if="step === 2">
				<div class="flex flex-col items-center gap-4 w-full py-5">
					<div class="size-[76px] flex-center border border-white/10 bg-[linear-gradient(49deg,_#4C00FF_14.7%,_#00AEFF_81.51%)] rounded-full p-[14px]">
						<img src="/images/phone_call.svg" alt="" class="size-12 aspect-square" />
					</div>
					<div class="flex flex-col items-center text-center gap-3 w-full">
						<h3 class="text-xl font-bold leading-130">Tasdiqlash kodi</h3>
						<div class="flex flex-col items-center gap-2">
							<span>Quyidagi raqamga tasdiqlash kodi yuborildi</span>
							<UIButton variant="secondary" :text="maskPhone('+998 93 472 93 35')" class="!rounded-[14px] font-medium" mainClass="gap-2.5" />
						</div>
					</div>
					<div class="flex flex-col items-center gap-3">
						<FormInputOtp :digits="5" />
						<FormOtpTimer :timer="timer" :seconds-val="10" @timeout="timeout" />
					</div>
				</div>
				<div class="px-4 py-3 md:px-6 md:pb-6 md:pt-0">
					<UIButton text="Tasdiqlash" class="w-full h-[46px]" />
				</div>
			</div>
		</Transition>
	</UIModal>
</template>

<script setup lang="ts">
const isOpen = defineModel<boolean>('modelValue', { required: true })

const form = useForm(
	{
		number: '',
		expiry: ''
	},
	{}
)

const timer = ref(true)

const step = ref(1)

const timeout = () => {
	timer.value = false
}
</script>
