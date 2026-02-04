<template>
	<div class="container pt-4 md:pt-10">
		<div class="grid grid-cols-1 lg:grid-cols-[800px_1fr] gap-4 lg:gap-6">
			<div class="shrink-0">
				<Swiper @init="onInit" @slideChange="onSlideChange" v-bind="settings" class="lg:h-[454px] rounded-3xl md:rounded-[40px] relative">
					<SwiperSlide v-for="item in 8" :key="item">
						<UIImage src="images/Special-Offer-Card.png" class="w-full h-full object-cover rounded-3xl md:rounded-[40px]" />
					</SwiperSlide>

					<div class="absolute bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-[3px] z-20">
						<div
							v-for="(s, i) in totalSlides"
							:key="i"
							class="relative overflow-hidden rounded-full"
							:class="i === activeIndex ? 'w-5 h-[4px] md:h-1.5 md:w-10 bg-white/40' : 'w-[3px] h-[3px] md:w-[6px] md:h-[6px] bg-white/40 rounded-full'"
						>
							<!-- PROGRESS: active bullet only -->
							<div v-if="i === activeIndex" class="absolute left-0 top-0 h-full bg-white transition-all duration-75" :style="{ width: progress + '%' }"></div>
						</div>
					</div>
				</Swiper>
			</div>
			<div class="flex flex-col gap-5 md:gap-7 p-5 md:p-10 rounded-3xl md:rounded-[40px] overflow-hidden relative z-10">
				<img src="/images/hero-image.webp" alt="" class="absolute -bottom-8 md:bottom-0 right-0 max-w-[225px] md:max-w-[450px] object-contain z-[-1]" />
				<img src="/images/hero-background-patterns.jpg" alt="hero-background-patterns" class="absolute inset-0 max-sm:object-top w-full h-full object-cover z-[-2]" />
				<div class="flex flex-col gap-2 max-w-[383px]">
					<h2 class="text-xl md:text-[40px] font-bold font-adero-trial text-white !leading-130">Premium</h2>
					<p class="text-xs md:text-xl !leading-130 text-white">Barcha qulayliklar siz uchun premium obunani xarid qiling va eng yaxshi darajaga chiqing</p>
				</div>
				<UIButton @click="isOpen = true" text="Obunani xarid qilish" variant="secondary" class="!bg-white w-fit px-4 font-adero-trial max-sm:!h-8 !text-xs sm:!text-sm" />
			</div>
		</div>
		<ModalTestQuestion v-model="isOpen" :questions="questions" />
	</div>
</template>

<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/autoplay'

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

const settings = {
	modules: [Autoplay],
	spaceBetween: 16,
	slidesPerView: 1,
	loop: true,
	autoplay: {
		delay: 3000,
		disableOnInteraction: false
	}
}

const activeIndex = ref(0)
const totalSlides = ref(0)
const progress = ref(0)

let interval = null

const startProgress = () => {
	progress.value = 0
	if (interval) clearInterval(interval)
	interval = setInterval(() => {
		progress.value += 1
		if (progress.value >= 100) clearInterval(interval)
	}, 30)
}
const onInit = (swiper) => {
	totalSlides.value = swiper.slides.length
	activeIndex.value = swiper.realIndex
	startProgress()
}
const onSlideChange = (swiper) => {
	activeIndex.value = swiper.realIndex
	startProgress()
}
</script>
