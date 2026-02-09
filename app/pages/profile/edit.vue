<template>
	<div class="flex flex-col gap-5 p-5 bg-white rounded-3xl shadow-main">
		<div class="flex items-center justify-between">
			<h3 class="text-xl leading-130 font-bold">Akkauntni tahrirlash</h3>
			<UIButton variant="secondary" text="Akkauntni o’chirish" icon="icon-trash text-2xl text-red" class="h-11 font-medium text-red !bg-red/[0.14]" />
		</div>

		<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
			<FormGroup label="Ism">
				<FormInput v-model="form.values.name" placeholder="Ismingizni kiriting" />
			</FormGroup>

			<FormGroup label="Familiya">
				<FormInput v-model="form.values.lastname" placeholder="Familiyangizni kiriting" />
			</FormGroup>

			<FormGroup label="Telefon raqami">
				<FormInput v-model="form.values.phone" :readonly="true" v-maska="'## ### ## ##'" placeholder="00 000 00 00" suffix-class="!pointer-events-auto !cursor-pointer">
					<template #prefix>
						<span class="pr-2 text-sm font-medium">+998</span>
					</template>
					<template #suffix>
						<span class="icon-edit pl-3 text-xl leading-normal text-black" />
					</template>
				</FormInput>
			</FormGroup>

			<FormGroup label="Tug‘ilgan sana">
				<FormInput v-maska="'##.##.####'" v-model="form.values.birthday" placeholder="00.00.0000">
					<template #suffix>
						<span class="icon-calendar pl-3 text-xl leading-normal text-black" />
					</template>
				</FormInput>
			</FormGroup>
		</div>

		<div class="flex gap-6">
			<FormRadio
				v-for="item in genderList"
				:key="item.value"
				v-model="form.values.selected"
				:value="item.value"
				:class="['p-3 rounded-xl max-w-[185px] w-full transition-300', form.values.selected === item.value ? 'border-blue bg-white border' : 'border border-transparent bg-gray']"
			>
				<template #label>
					<div class="flex items-center gap-2">
						<i :class="item.icon" class="text-2xl leading-6"></i>
						<span class="text-sm leading-130 font-medium">{{ item.label }}</span>
					</div>
				</template>
			</FormRadio>
		</div>

		<div class="flex sm:justify-end">
			<UIButton text="Saqlash" class="sm:w-[280px] w-full" />
		</div>
	</div>
</template>

<script setup lang="ts">
const form = useForm(
	{
		phone: '',
		name: '',
		lastname: '',
		birthday: '',
		selected: ''
	},
	{}
)

const genderList = [
	{
		value: 'male',
		label: 'Erkak',
		icon: 'icon-male text-blue'
	},
	{
		value: 'female',
		label: 'Ayol',
		icon: 'icon-female text-red'
	}
]
</script>
