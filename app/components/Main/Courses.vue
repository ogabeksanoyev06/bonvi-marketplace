<template>
	<section class="container px-0 mb-10">
		<div class="s bg-white rounded-[40px] px-4 py-6 md:px-10 md:py-10 overflow-hidden">
			<div class="flex-center-between mb-6 md:mb-8">
				<div class="flex-y-center gap-2">
					<img src="/images/course-icon.svg" alt="fire-icon" class="size-10 aspect-square md:block hidden" />
					<h2 class="section-title">Darsliklar</h2>
				</div>
				<UIButton class="md:flex hidden" text="Barchasini ko'rish" icon="icon-chevron -rotate-90 text-2xl leading-6" />
			</div>
			<div class="grid lg:grid-cols-12 gap-6 md:gap-5">
				<div class="lg:col-span-9 flex flex-col gap-4">
					<h3 class="text-lg sm:text-2xl !leading-140 font-bold">Videolar</h3>
					<transition name="fade" mode="out-in">
						<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
							<template v-if="isPending">
								<CardCourseLoading v-for="key in 6" :key="key" />
							</template>
							<template v-else>
								<CardCourse
									v-for="course in courses"
									:key="course.id"
									:title="course.title"
									:lessonNumber="course.lessonNumber"
									:image="course.image"
									:isLocked="course.isLocked"
								/>
							</template>
						</div>
					</transition>
				</div>
				<div class="lg:col-span-3 flex flex-col gap-4">
					<h3 class="text-xl sm:text-2xl !leading-140 font-bold">Dokumentlar</h3>
					<div class="flex flex-col gap-3">
						<div v-for="value in 7" class="bg-gray flex items-center justify-between px-4 py-3 rounded-[20px]">
							<div class="flex-y-center gap-2.5">
								<img src="/images/document.svg" alt="document icon" class="size-10" />
								<div>
									<p class="text-lg font-bold leading-140 line-clamp-1">Darslik materiali.pdf</p>
									<p class="text-sm leading-140">25 MB</p>
								</div>
							</div>
							<div class="bg-black rounded-full size-10 flex-center p-2">
								<i class="icon-download text-white text-2xl leading-6"></i>
							</div>
						</div>
						<UIButton class="lg:w-fit w-full" text="Barchasi" icon="icon-chevron -rotate-90 text-2xl leading-6" />
					</div>
				</div>
			</div>
		</div>
	</section>
</template>

<script setup lang="ts">
const isPending = ref(true)

const courses = ref([
	{
		id: 1,
		title: 'Balasni ushlashni o‘rganish',
		lessonNumber: 1,
		image: '/images/course-1.webp',
		isLocked: false
	},
	{
		id: 2,
		title: 'Asosiy texnikalarni mustahkamlash',
		lessonNumber: 2,
		image: '/images/course-2.webp',
		isLocked: true
	},
	{
		id: 3,
		title: 'Avtomobilni sozlash bo‘yicha dars',
		lessonNumber: 3,
		image: '/images/course-3.webp',
		isLocked: false
	},
	{
		id: 4,
		title: 'Qiyin vaziyatlarni boshqarish',
		lessonNumber: 4,
		image: '/images/course-4.webp',
		isLocked: true
	},
	{
		id: 5,
		title: 'Murakkab texnik uslublar',
		lessonNumber: 5,
		image: '/images/course-5.webp',
		isLocked: false
	},
	{
		id: 6,
		title: 'Final dars va testlar',
		lessonNumber: 6,
		image: '/images/course-6.webp',
		isLocked: true
	}
])

onMounted(() => {
	setTimeout(() => {
		isPending.value = false
	}, 2000)
})
</script>
