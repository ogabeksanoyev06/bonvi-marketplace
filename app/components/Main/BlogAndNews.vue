<template>
	<section class="container px-0">
		<div class="flex flex-col gap-8 bg-white rounded-[40px] p-10">
			<div class="flex-center-between">
				<h2 class="section-title">Blog va yangiliklar</h2>
				<UIButton text="Barchasini ko'rish" icon="icon-chevron -rotate-90 text-2xl leading-6" />
			</div>
			<div class="flex flex-col md:flex-row md:items-stretch gap-4 md:gap-10 bg-white rounded-2xl overflow-hidden">
				<div class="relative md:max-w-[582px] w-full aspect-video md:aspect-auto md:h-[340px]">
					<UIImage src="/images/background-patterns.webp" alt="blog-main-article" class="rounded-2xl object-cover w-full h-full" />
				</div>
				<div class="flex flex-col justify-between gap-5 md:gap-10 md:max-w-[562px] w-full">
					<div class="flex flex-col gap-2 md:gap-7">
						<div class="flex-y-center gap-1 border border-gray px-2 py-1.5 rounded-[20px] w-max">
							<span class="icon-calendar text-xl leading-5 text-gray-3"></span>
							<span class="text-gray-3 font-medium">2024-06-10</span>
						</div>
						<div class="flex flex-col gap-2 md:gap-4">
							<h2 class="text-xl sm:text-2xl md:text-3xl lg:text-[32px] font-bold !leading-130">Kichkintoylar uchun yangilik!</h2>
							<p class="text-sm sm:text-base !leading-130 line-clamp-3">
								Endi Buxoro filialimizda jaji bolajonlarimiz uchun ulkan yangilik, endi siz 1ta samokat narhiga 2ta samokat sotib olishingiz mumkin. 1+1 aksiaya endi Bonvi
								Marketplaceda!
							</p>
						</div>
					</div>
					<UIButton text="Batafsil" class="md:w-[136px]" />
				</div>
			</div>
			<transition name="fade" mode="out-in">
				<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
					<template v-if="isPending">
						<CardBlogLoading v-for="key in 6" :key="key" />
					</template>
					<template v-else>
						<CardBlog v-for="item in items" :key="item.id" :image="item.image" :title="item.title" :description="item.description" :date="item.date" />
					</template>
				</div>
			</transition>
		</div>
	</section>
</template>
<script lang="ts" setup>
const isPending = ref(true)

const items = ref([
	{
		id: 1,
		image: '/images/background-patterns.webp',
		title: 'Cobal avtomashinasiga metan balon qanday o’rnatiladi?',
		description: 'Ho’sh Coabalt Chevralet avtomashinasiga nechta metan balon o’rnatish mumkin.  7 qadam orqali siz qanday muammolarga tayyor turishni bilib olasiz.',
		date: '23-yanvar, 12:00'
	},
	{
		id: 2,
		image: '/images/background-patterns.webp',
		title: 'Qish keldi shinalar esa sirpanishni boshladimi? Unda DARK sizga yordam beradi.',
		description:
			'Qish uchun mo’ljallangan shinalarimiz endi sotuvda. Endi siz qorli muzliklarda hotirjam harakatlana olasiz. Temir zanjir o’rashga esa umuman hojat yo’q. Hoziroq telefon qilin.',
		date: '2024-06-10'
	},
	{
		id: 3,
		image: '/images/background-patterns.webp',
		title: 'Avtomobilingiz uchun eng yaxshi yog’ni qanday tanlash mumkin?',
		description:
			'Avtomobilingiz dvigatelining uzoq umr ko’rishi va samarali ishlashi uchun to’g’ri yog’ni tanlash juda muhimdir. Ushbu maqolada sizga eng yaxshi yog’ni tanlash bo’yicha foydali maslahatlar beramiz.',
		date: '2024-06-05'
	}
])

onMounted(() => {
	setTimeout(() => {
		isPending.value = false
	}, 2000)
})
</script>
