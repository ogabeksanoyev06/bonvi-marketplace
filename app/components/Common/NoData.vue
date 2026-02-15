<template>
	<div class="container">
		<div class="flex flex-col items-center justify-center md:min-h-[400px] py-8 w-full">
			<img :src="`/images/${image}`" alt="box" class="w-[140px] aspect-square object-contain" />
			<div class="flex flex-col items-center text-center gap-1.5 max-w-[364px] w-full">
				<h3 class="text-xl !leading-130 font-bold">{{ title }}</h3>
				<p class="text-sm leading-130">{{ subtitle }}</p>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
interface Props {
	image: string
	title: string
	subtitle: string
}
withDefaults(defineProps<Props>(), {
	image: 'basket-box.webp',
	title: 'Savatingizda mahsulotlar mavjud emas',
	subtitle: 'Bu yerda savatingizga qo‘shgan barcha mahsulotlar ro‘yxati ko‘rinadi'
})
</script>
