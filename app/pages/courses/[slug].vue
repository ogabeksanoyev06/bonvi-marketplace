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
							<div class="w-full max-w-full aspect-video rounded-[20px] overflow-hidden bg-black shadow-inner">
								<video
									ref="videoRef"
									:src="course?.lesson.video_file_url"
									controlsList="nodownload"
									disablePictureInPicture
									playsinline
									controls
									preload="metadata"
									class="w-full h-full object-contain"
									@contextmenu.prevent
								/>
							</div>

							<div class="flex flex-col gap-6">
								<div class="flex flex-col gap-2">
									<div class="flex gap-2">
										<!-- <div class="flex-y-center gap-1.5 p-1.5 bg-blue-light rounded-[10px]">
											<i class="icon-heart text-xl leading-5 text-blue"></i>
											<span class="text-sm font-medium leading-130 text-black">{{ course?.lesson.is_liked }}</span>
										</div> -->
										<div class="flex-y-center gap-1.5 p-1.5 bg-blue-light rounded-[10px]">
											<i class="icon-eye text-xl leading-5 text-blue"></i>
											<span class="text-sm font-medium leading-130 text-black">{{ course?.lesson.view_count }}</span>
										</div>
										<div class="flex-y-center gap-1.5 p-1.5 bg-blue-light rounded-[10px]">
											<i class="icon-clock text-xl leading-5 text-blue"></i>
											<span class="text-sm font-medium leading-130 text-black">{{ formatDuration(course?.lesson.duration_minutes).hms }}</span>
										</div>
									</div>
									<h2 class="text-[28px] leading-130 font-bold">{{ course?.lesson.title }}</h2>
									<p class="text-base leading-130">{{ course?.lesson.description }}</p>
								</div>
								<div class="h-px bg-gray w-full"></div>
								<div class="flex flex-col gap-4">
									<h3 class="text-xl font-bold leading-130">Biriktirilgan fayllar</h3>
									<div class="grid md:grid-cols-2 gap-5">
										<a
											v-for="(item, i) in course?.lesson.docs"
											:key="item.id"
											target="_blank"
											:href="item.file_url"
											class="bg-gray flex items-center justify-between px-4 py-3 rounded-[20px] cursor-pointer"
										>
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
										</a>
									</div>
								</div>
							</div>
						</div>
					</template>
				</transition>
			</div>
			<div class="lg:col-span-3 flex flex-col gap-4">
				<transition name="fade" mode="out-in">
					<div class="grid grid-cols-1 gap-5">
						<template v-if="isPending">
							<CardCourseLoading v-for="key in 3" :key="key" />
						</template>
						<template v-else>
							<div class="flex flex-col gap-4">
								<h3 class="text-xl sm:text-2xl !leading-140 font-bold">Keyingi darsliklar</h3>
								<CardCourse v-for="(item, index) in course?.next_lessons || []" :key="item.id" :item="item" />
							</div>
						</template>
					</div>
				</transition>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { useQuery } from '@tanstack/vue-query'
import type { ILessonSingleResponse } from '~/types/course.d'

const dayjs = useDayjs()

const { $axios } = useNuxtApp()

const route = useRoute()
const slug = route.params.slug as string

const { data: course, isPending } = useQuery({
	queryKey: ['course', slug],
	queryFn: async () => {
		const res = await $axios.get<ILessonSingleResponse>(`marketing/lesson-detail/${slug}/`)
		return res.data
	},
	enabled: !!slug
})

const breadcrumbItems = computed(() => [
	{ name: 'Darsliklar', path: '/courses' },
	{ name: course.value?.lesson.title ?? '', path: '' }
])
</script>
