<template>
	<section class="bg-blue-light">
		<div class="container">
			<h2 class="section-title max-md:!text-xl mb-6 text-center">Tez-tez so‘raladigan savollar</h2>
			<div class="flex flex-col gap-3 bg-black rounded-[40px] p-3 shadow-faq">
				<UIAccordion
					v-for="(item, index) in faqs"
					:key="index"
					:show="active === index"
					@toggle="toggleAccordion(index)"
					:wrapper-class="['rounded-[28px] bg-white/[0.12] border border-white/[0.16] transition-300']"
				>
					<template #header>
						<div class="flex justify-between items-center rounded-[28px] gap-4">
							<span class="text-sm md:text-2xl font-bold text-white">
								{{ item.title }}
							</span>
							<span class="size-8 md:size-10 p-2 flex-center rounded-full bg-white/10 border border-white/10 transition-300" :class="active === index ? 'rotate-45' : 'rotate-0'">
								<span class="icon-plus text-2xl leading-6 text-white"></span>
							</span>
						</div>
					</template>

					<template #body>
						<div class="px-4 pb-2">
							<p class="text-sm md:text-base !leading-[140%] text-white">
								{{ item.content }}
							</p>
						</div>
					</template>
				</UIAccordion>
			</div>
		</div>
	</section>
</template>

<script setup lang="ts">
const faqs = [
	{
		title: 'Bonvi platformasida qanday mahsulotlar mavjud?',
		content:
			'Bonvi platformasida qo‘l mehnati mahsulotlari, hunarmandchilik buyumlari va noyob dizaynli mahsulotlar mavjud. Bonvi platformasida qo‘l mehnati mahsulotlari, hunarmandchilik buyumlari va noyob dizaynli mahsulotlar mavjud. Bonvi platformasida qo‘l mehnati mahsulotlari, hunarmandchilik buyumlari va noyob dizaynli mahsulotlar mavjud. Bonvi platformasida qo‘l mehnati mahsulotlari, hunarmandchilik buyumlari va noyob dizaynli mahsulotlar mavjud.'
	},
	{
		title: 'Mahsulotlarni qanday sotib olish mumkin?',
		content: 'Mahsulotlarni tanlab, savatga qo‘shing va to‘lov jarayonini yakunlang. Yetkazib berish manzilingizni ko‘rsating.'
	},
	{
		title: 'Bonvi platformasida hisob yaratish zarurmi?',
		content: 'Ha, hisob yaratish orqali siz buyurtmalaringizni kuzatishingiz va maxsus takliflardan foydalanishingiz mumkin.'
	},
	{
		title: 'Mahsulotlar sifati qanday kafolatlanadi?',
		content: 'Har bir mahsulot sifat nazorati orqali o‘tkaziladi va yuqori sifat standartlariga javob beradi.'
	},
	{
		title: 'Qaytarish siyosati qanday?',
		content: 'Agar mahsulot sizning kutganingizga mos kelmasa, 14 kun ichida qaytarish imkoniyati mavjud.'
	}
]

const active = ref<number | null>(null)
const toggleAccordion = (index: number) => {
	active.value = active.value === index ? null : index
}
</script>
<style scoped>
.shadow-faq {
	box-shadow:
		0 179px 50px 0 rgba(0, 0, 0, 0),
		0 114px 46px 0 rgba(0, 0, 0, 0.02),
		0 64px 39px 0 rgba(0, 0, 0, 0.08),
		0 29px 29px 0 rgba(0, 0, 0, 0.14),
		0 7px 16px 0 rgba(0, 0, 0, 0.16);
}
</style>
