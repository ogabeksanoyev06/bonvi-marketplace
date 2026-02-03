<template>
	<div>
		<ModalTestQuestion v-model="isOpen" :questions="questions" />
	</div>
</template>

<script setup lang="ts">
const isOpen = ref(false)

const questions = [
	{
		question: 'Ommaviy nutq tayyorlash texnologiyasi nechta bosqichdan iborat?',
		answers: [
			{ id: 1, title: '3 ta bosqich' },
			{ id: 2, title: '5 ta bosqich' },
			{ id: 3, title: '7 ta bosqich' },
			{ id: 4, title: '4 ta bosqich' }
		]
	},
	{
		question: 'Kommunikatsiya jarayonida tinglovchi nima uchun muhim?',
		answers: [
			{ id: 1, title: 'Nutqni yozib boradi' },
			{ id: 2, title: 'Jarayonning asosiy qabul qiluvchisi bo‘ladi' },
			{ id: 3, title: 'Faqat savol beradi' },
			{ id: 4, title: 'Tajriba almashadi' }
		]
	},
	{
		question: 'Public speakingda eng muhim tamoyillardan biri qaysi?',
		answers: [
			{ id: 1, title: 'Yuqori ovozda gapirish' },
			{ id: 2, title: 'Tinglovchini hurmat qilish' },
			{ id: 3, title: 'Ko‘p misollar keltirish' },
			{ id: 4, title: 'Faqat matnga qarab o‘qish' }
		]
	},
	{
		question: 'Taqdimot qilayotganda qo‘l harakatlari qanday bo‘lishi kerak?',
		answers: [
			{ id: 1, title: 'Sun’iy' },
			{ id: 2, title: 'Juda ko‘p' },
			{ id: 3, title: 'Tabiiy va ravon' },
			{ id: 4, title: 'Doimo bir xil' }
		]
	},
	{
		question: 'Notiqning asosiy vazifasi nima?',
		answers: [
			{ id: 1, title: 'Faqat ma’lumot berish' },
			{ id: 2, title: 'Tinglovchini ishontirish va ta’sir qilish' },
			{ id: 3, title: 'Ovozini balandlatish' },
			{ id: 4, title: 'Faqat savollarga javob berish' }
		]
	},
	{
		question: 'Nutqning kirish qismida odatda nimalar bo‘ladi?',
		answers: [
			{ id: 1, title: 'Xulosa va takliflar' },
			{ id: 2, title: 'Reja va mavzu taqdimoti' },
			{ id: 3, title: 'Faktlar chuqur tahlili' },
			{ id: 4, title: 'Savol-javob' }
		]
	},
	{
		question: 'Taqdimot dizaynida minimalizm qoidasining ma’nosi nima?',
		answers: [
			{ id: 1, title: 'Slaydlarda ko‘proq matn bo‘lishi' },
			{ id: 2, title: 'Keraksiz elementlarni kamaytirish' },
			{ id: 3, title: 'Ranglar sonini oshirish' },
			{ id: 4, title: 'Faqat qora-oq ranglardan foydalanish' }
		]
	},
	{
		question: 'Sahna qo‘rquvini kamaytirishning samarali usuli qaysi?',
		answers: [
			{ id: 1, title: 'Nutqni yodlab olish' },
			{ id: 2, title: 'Chuqur nafas olish mashqlari' },
			{ id: 3, title: 'Tez gapirish' },
			{ id: 4, title: 'Ko‘z kontaktidan qochish' }
		]
	},
	{
		question: 'Tinglovchi bilan ko‘z kontakti qanday bo‘lishi kerak?',
		answers: [
			{ id: 1, title: 'Doim bitta odamga tikilish' },
			{ id: 2, title: 'Umuman qaramaslik' },
			{ id: 3, title: 'Zalda teng taqsimlab qarash' },
			{ id: 4, title: 'Faqat yaqinlarga qarash' }
		]
	},
	{
		question: 'Taqdimotda statistika ishlatilganda eng muhim jihat nima?',
		answers: [
			{ id: 1, title: 'Sonlarni yod olish' },
			{ id: 2, title: 'Manbasini ko‘rsatish' },
			{ id: 3, title: 'Ko‘p raqam ishlatish' },
			{ id: 4, title: 'Slaydni to‘ldirish' }
		]
	}
]
</script>
