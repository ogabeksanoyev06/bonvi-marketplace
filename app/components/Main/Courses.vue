<template>
	<section class="container px-0 mb-10">
		<div class="bg-white rounded-[40px] px-4 py-6 md:px-10 md:py-10 overflow-hidden">
			<div class="flex-center-between mb-6 md:mb-8">
				<div class="flex-y-center gap-2">
					<img src="/images/course-icon.svg" alt="course-icon" class="size-10 aspect-square md:block hidden" />
					<h2 class="section-title">Darsliklar</h2>
				</div>
				<NuxtLinkLocale to="/courses">
					<UIButton class="md:flex hidden" text="Barchasini ko'rish" icon="icon-chevron -rotate-90 text-2xl leading-6" />
				</NuxtLinkLocale>
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
									v-for="(course, index) in data?.results"
									:key="course.id"
									:title="course.title"
									:lessonNumber="index + 1"
									:image="course.thumbnail || '/images/course-placeholder.webp'"
									:isLocked="course.is_for_premium"
								/>
							</template>
						</div>
					</transition>
				</div>

				<div class="lg:col-span-3 flex flex-col gap-4">
					<h3 class="text-xl sm:text-2xl !leading-140 font-bold">Dokumentlar</h3>
					<div class="flex flex-col gap-3 lg:overflow-y-auto lg:max-h-[600px] scrollbar-hide fade-bottom">
						<template v-if="isPending">
							<div v-for="key in 6" :key="'doc-skeleton-' + key" class="bg-gray flex items-center justify-between px-4 py-3 rounded-[20px]">
								<div class="flex-y-center gap-2.5">
									<div class="size-10 skeleton rounded-lg"></div>
									<div class="flex flex-col gap-2">
										<div class="h-4 w-32 skeleton rounded"></div>
										<div class="h-3 w-12 skeleton rounded"></div>
									</div>
								</div>
								<div class="skeleton rounded-full size-9"></div>
							</div>
						</template>

						<template v-else>
							<template v-for="lesson in data?.results" :key="'doc-group-' + lesson.id">
								<a
									v-for="doc in lesson.docs"
									:key="doc.id"
									:href="doc.file_url"
									target="_blank"
									class="bg-gray flex items-center justify-between px-4 py-3 rounded-[20px] cursor-pointer transition-300 group hover:bg-gray-1/60"
								>
									<div class="flex-y-center gap-2.5">
										<img src="/images/document.svg" alt="document icon" class="size-10" />
										<div class="max-w-[150px]">
											<p class="text-base font-bold leading-140 line-clamp-1 transition-300 group-hover:text-blue">{{ lesson.title }}.{{ doc.file_type }}</p>
											<p class="text-xs leading-140 opacity-60">ID: {{ doc.id }}</p>
										</div>
									</div>
									<div class="bg-black rounded-full size-9 flex-center p-2 shrink-0">
										<i class="icon-download text-white text-xl leading-6 !transition-300"></i>
									</div>
								</a>
							</template>
						</template>

						<p v-if="!isPending && !allDocsCount" class="text-gray-4 text-sm text-center py-4">Hozircha hujjatlar yo'q</p>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>

<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query'
import type { ILessonResponse } from '~/types/course'

const { $axios } = useNuxtApp()

const { data, isPending } = useQuery({
	queryKey: ['lessons'],
	queryFn: async () => {
		const res = await $axios.get<ILessonResponse>('marketing/lessons/')
		return res.data
	}
})

const allDocsCount = computed(() => {
	return data.value?.results.reduce((acc, lesson) => acc + lesson.docs.length, 0) || 0
})
</script>

<style scoped>
.fade-bottom {
	-webkit-mask-image: linear-gradient(to bottom, black 85%, transparent 100%);
	mask-image: linear-gradient(to bottom, black 85%, transparent 100%);

	scroll-behavior: smooth;
	padding-bottom: 20px;
}
</style>
