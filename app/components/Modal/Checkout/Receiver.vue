<template>
	<UIModal v-model="isOpen" title="Qabul qiluvchi">
		<div class="md:pt-5 pt-4 pb-3 md:pb-6 px-4 md:px-5">
			<div class="flex flex-col gap-4">
				<FormGroup label="Ism-familiyasi">
					<FormInput v-model="form.values.name" placeholder="Qabul qiluvchining ism-familiyasi" class="h-11" input-class="placeholder:!font-normal" />
				</FormGroup>
				<FormGroup label="Telefon raqami">
					<FormInput v-model="form.values.phone" v-maska="'## ### ## ##'" placeholder="00 000 00 00" class="h-11" input-class="placeholder:!font-normal">
						<template #prefix>
							<span class="pr-2 leading-130">+998</span>
						</template>
					</FormInput>
				</FormGroup>
				<UIButton text="Tasdiqlash" class="h-[46px] max-md:mt-3" />
			</div>
		</div>
	</UIModal>
</template>

<script setup lang="ts">
const isOpen = defineModel<boolean>('modelValue', { required: true })

const form = useForm(
	{
		phone: '',
		name: ''
	},
	{}
)
</script>
