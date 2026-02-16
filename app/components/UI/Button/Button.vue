<template>
	<button
		:class="[variants[variant] || variants.primary, sizes[size] || sizes.medium, { '!pointer-events-none': loading }]"
		class="relative inline-flex items-center justify-center h-10 gap-2 whitespace-nowrap text-sm sm:text-base !leading-140 font-bold transition-300 rounded-full active:scale-95 group/button disabled:opacity-70 disabled:pointer-events-none group"
		:disabled="disabled || loading"
		:type="type"
	>
		<span v-if="loading" class="flex-center w-full absolute inset-0">
			<img src="/svg/spinner.svg" alt="spinner" class="size-6 animate-spin" />
		</span>

		<span
			:class="[
				{
					'opacity-0 invisible': loading,
					'flex-row-reverse': iconPosition === 'left'
				},
				mainClass
			]"
			class="text-center whitespace-nowrap flex-center justify-center gap-2"
		>
			<slot>
				<span v-if="typeof iconLeft === 'string' && iconLeft" :class="iconLeft" />
				<span v-if="text">{{ text }}</span>
				<span v-if="typeof icon === 'string' && icon" :class="icon" />
			</slot>
		</span>
	</button>
</template>

<script setup>
const props = defineProps({
	variant: { type: String, default: 'primary' },
	size: { type: String, default: 'medium' },
	loading: { type: Boolean, default: false },
	mainClass: { type: [String, Object, Array], default: '' },
	iconPosition: { type: String, default: 'right' },
	text: { type: [String, Number], default: '' },
	icon: { type: String, default: '' },
	iconLeft: { type: String, default: '' },
	disabled: { type: Boolean, default: false },
	type: { type: String, default: 'button' }
})

const variants = {
	primary: 'bg-blue text-white hover:bg-blue/90',
	secondary: 'bg-gray text-dark hover:bg-gray/90',
	dark: 'bg-gray-6 text-white',
	white: 'bg-white text-blue'
}

const sizes = {
	small: 'py-2 px-9 h-9 text-sm',
	medium: 'py-2 px-3',
	large: 'py-3 px-9'
}
</script>
