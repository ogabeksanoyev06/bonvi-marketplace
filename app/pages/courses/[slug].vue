<template>
	<div>
		<UIBreadcrumb :routes="breadcrumbItems" />
		<div class="container">
			<div class="flex items-center gap-3 py-5">
				<img src="/images/course-icon.svg" alt="course-icon" />
				<h3 class="text-[28px] leading-130 font-bold">Darsliklar</h3>
			</div>
		</div>
		<div class="container bg-white rounded-[40px] md:px-10 py-4 md:py-6 grid lg:grid-cols-12 gap-5">
			<div class="lg:col-span-9 flex flex-col gap-5">
				<transition name="fade" mode="out-in">
					<template v-if="isPending">
						<div class="flex flex-col gap-8">
							<div class="w-full max-w-full skeleton aspect-video rounded-[20px]"></div>
							<div class="flex flex-col gap-6">
								<div class="flex flex-col gap-2">
									<div class="flex gap-2">
										<div class="h-8 w-16 skeleton rounded-[10px]"></div>
										<div class="h-8 w-16 skeleton rounded-[10px]"></div>
										<div class="h-8 w-20 skeleton rounded-[10px]"></div>
									</div>
									<div class="h-7 w-3/4 skeleton rounded-md"></div>
									<div class="h-4 w-full skeleton rounded-md"></div>
									<div class="h-4 w-5/6 skeleton rounded-md"></div>
								</div>
								<div class="h-px skeleton w-full"></div>
								<div class="flex flex-col gap-4">
									<div class="h-6 w-40 skeleton rounded-md"></div>
									<div class="grid md:grid-cols-2 gap-5">
										<div class="skeleton h-20 rounded-[20px]"></div>
										<div class="skeleton h-20 rounded-[20px]"></div>
									</div>
								</div>
							</div>
						</div>
					</template>

					<template v-else>
						<div class="flex flex-col gap-8">
							<div class="w-full max-w-full aspect-video rounded-[20px] overflow-hidden">
								<iframe
									class="w-full h-full"
									src="https://www.youtube-nocookie.com/embed/ljk9pMyS8ks?rel=0&modestbranding=1&iv_load_policy=3&controls=1&showinfo=0"
									title="Video"
									allowfullscreen
									allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
									referrerpolicy="strict-origin-when-cross-origin"
								></iframe>
							</div>

							<div class="flex flex-col gap-6">
								<div class="flex flex-col gap-2">
									<div class="flex gap-2">
										<div class="flex-y-center gap-1.5 p-1.5 bg-blue-light rounded-[10px]">
											<i class="icon-heart text-xl leading-5 text-blue"></i>
											<span class="text-sm font-medium leading-130 text-black">255</span>
										</div>
										<div class="flex-y-center gap-1.5 p-1.5 bg-blue-light rounded-[10px]">
											<i class="icon-eye text-xl leading-5 text-blue"></i>
											<span class="text-sm font-medium leading-130 text-black">687</span>
										</div>
										<div class="flex-y-center gap-1.5 p-1.5 bg-blue-light rounded-[10px]">
											<i class="icon-clock text-xl leading-5 text-blue"></i>
											<span class="text-sm font-medium leading-130 text-black">1:03:32</span>
										</div>
									</div>
									<h2 class="text-[28px] leading-130 font-bold">Mahsulotni tushunish va savdo asoslari</h2>
									<p class="text-base leading-130">
										Mahsulot (Product) – bu bozor ehtiyojini qondira oladigan har qanday narsa (tovar, xizmat, g‘oya, tajriba yoki loyiha). Mahsulot moddiy (telefon, kiyim) yoki
										nomoddiy (konsultatsiya, xizmat) bo‘lishi mumkin.
									</p>
								</div>
								<div class="h-px bg-gray w-full"></div>
								<div class="flex flex-col gap-4">
									<h3 class="text-xl font-bold leading-130">Biriktirilgan fayllar</h3>
									<div class="grid md:grid-cols-2 gap-5">
										<div v-for="key in 2" :key class="bg-gray flex items-center justify-between px-4 py-3 rounded-[20px] cursor-pointer">
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
									</div>
								</div>
							</div>
						</div>
					</template>
				</transition>
				<UIButton class="md:hidden block" text="Ko‘proq ko‘rish" icon="icon-chevron -rotate-90 text-2xl leading-6" />
			</div>
			<div class="lg:col-span-3 flex flex-col gap-4">
				<transition name="fade" mode="out-in">
					<div class="grid grid-cols-1 gap-5">
						<template v-if="isPending">
							<CardCourseLoading v-for="key in 6" :key="key" />
						</template>
						<template v-else>
							<div class="flex flex-col gap-4">
								<h3 class="text-xl sm:text-2xl !leading-140 font-bold">Keyingi darsliklar</h3>
								<CardCourse
									v-for="course in courses"
									:key="course.id"
									:title="course.title"
									:lessonNumber="course.lessonNumber"
									:image="course.image"
									:isLocked="course.isLocked"
								/>
							</div>
						</template>
					</div>
				</transition>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
const breadcrumbItems = [
	{
		name: 'Darsliklar',
		path: '/courses'
	},
	{
		name: 'Mahsulotni tushunish va savdo asoslari',
		path: ''
	}
]

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
	}
])

onMounted(() => {
	setTimeout(() => {
		isPending.value = false
	}, 2000)
})
</script>
