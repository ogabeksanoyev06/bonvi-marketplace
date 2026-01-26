<template>
	<button
		:class="[variants[variant], sizes[size], { '!pointer-events-none': loading }]"
		class="relative inline-flex items-center justify-center h-10 gap-2 whitespace-nowrap text-base leading-140 font-bold transition-300 rounded-full active:scale-95 group/button disabled:opacity-50 disabled:pointer-events-none shrink-0 group"
		v-bind="{ disabled, type }"
	>
		<span
			:class="[
				{
					'!opacity-0': loading,
					'flex-center justify-center gap-2': text?.length,
					'flex-row-reverse': iconPosition === 'left'
				},
				mainClass
			]"
			class="text-center whitespace-nowrap"
		>
			<slot>
				<span v-if="iconLeft?.length" :class="iconLeft" />
				<span v-if="text?.length">{{ text }}</span>
				<span v-if="icon?.length" :class="icon" />
			</slot>
		</span>
	</button>
</template>

<script setup>
const props = defineProps({
	variant: {
		type: String,
		default: 'primary'
	},
	size: {
		type: String,
		default: 'medium'
	},
	loading: {
		type: Boolean,
		default: false
	},
	mainClass: {
		type: String,
		default: ''
	},
	iconPosition: {
		type: String,
		default: 'right'
	},
	text: {
		type: String,
		default: 'Button'
	},
	icon: {
		type: String,
		default: ''
	},
	iconLeft: {
		type: String,
		default: ''
	},
	disabled: {
		type: Boolean,
		default: false
	},
	type: {
		type: String,
		default: 'button'
	}
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
