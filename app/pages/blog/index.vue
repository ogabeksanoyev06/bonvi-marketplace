<template>
	<div>
		<UIBreadcrumb :routes="breadcrumbItems" />
		<div class="container py-3 md:py-5">
			<h3 class="text-[28px] leading-130 font-bold">Blog</h3>
		</div>
		<div class="container bg-white rounded-[40px] px-4 py-6 md:px-10 md:py-6">
			<transition name="fade" mode="out-in">
				<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
					<template v-if="isPending">
						<CardBlogLoading v-for="key in 6" :key="key" />
					</template>
					<template v-else>
						<CardBlog v-for="item in items" :key="item.id" :image="item.image" :title="item.title" :description="item.description" :date="item.date" class="!p-0" />
					</template>
				</div>
			</transition>

			<div class="md:mt-10 mt-5 flex justify-center">
				<UIButton text="Ko‘proq ko‘rish" icon="icon-chevron text-2xl leading-6" />
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
const breadcrumbItems = [
	{
		name: 'Blog',
		path: ''
	}
]
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
