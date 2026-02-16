<script setup>
const search = defineModel()
const clear = () => {
	search.value = ''
}
</script>

<template>
	<FormInput v-model="search" class="sm:max-w-[280px] w-full !rounded-full !bg-blue-light" placeholder="Izlash" suffix-class="flex-y-center gap-1 !pointer-events-auto">
		<template #prefix>
			<i class="icon-search text-[#7C7C7C] text-2xl leading-6 pr-2" />
		</template>
		<template #suffix>
			<button
				class="icon-x-mark text-lg scale-0 opacity-0 hover:text-red transition-all duration-300 !cursor-pointer"
				:class="{ '!scale-100 !opacity-100': search?.length }"
				@click="clear"
			/>
		</template>
	</FormInput>
</template>
