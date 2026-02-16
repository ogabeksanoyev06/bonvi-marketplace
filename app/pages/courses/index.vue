<template>
	<div>
		<UIBreadcrumb :routes="breadcrumbItems" />
		<div class="container">
			<div class="flex items-center gap-3 py-5">
				<img src="/images/course-icon.svg" alt="course-icon" />
				<h3 class="text-[28px] leading-130 font-bold">Darsliklar</h3>
			</div>
		</div>
		<div class="container bg-white rounded-[40px] md:px-10 py-4 md:py-6">
			<div class="grid lg:grid-cols-12 gap-5 items-start relative">
				<div class="lg:col-span-9 flex flex-col gap-5">
					<div class="flex sm:items-center flex-col sm:flex-row sm:justify-between gap-3">
						<h3 class="text-2xl font-bold leading-140">Videolar</h3>
						<div class="sm:flex-1 flex sm:justify-end gap-3">
							<UIDropdown :show="showDropdown" @toggle="handleDropdownToggle" :body-class="['!min-w-[200px] bg-white border-2 border-gray max-sm:!left-0']">
								<template #head="{ show }">
									<div
										class="flex items-center justify-center h-10 gap-1 bg-blue-light px-3 rounded-full border-2 border-transparent overflow-hidden cursor-pointer transition-300"
										:class="[show ? '!border-blue bg-white' : '']"
									>
										<span>{{ selectedLabel }}</span>
										<i class="icon-chevron flex-center text-2xl leading-6 aspect-square transition-300" :class="[show ? '!rotate-180 text-blue' : '']" />
									</div>
								</template>

								<template #body>
									<div class="flex flex-col">
										<FormRadio
											v-for="(option, index) in options"
											:key="index"
											name="district-filter"
											:value="option.value"
											v-model="selectedOption"
											:label="option.label"
											class="p-3 border-b last:border-b-0 cursor-pointer"
										/>
									</div>
								</template>
							</UIDropdown>

							<FormInputSearch v-model="searchQuery" placeholder="Qidirish..." />
						</div>
					</div>

					<transition name="fade" mode="out-in">
						<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
							<template v-if="isPending">
								<CardCourseLoading v-for="key in 6" :key="key" />
							</template>
							<template v-else-if="data?.results?.length">
								<CardCourse v-for="item in data.results" :key="item.id" :item="item" />
							</template>
							<template v-else>
								<div class="col-span-full py-20 text-center opacity-50">Hech narsa topilmadi.</div>
							</template>
						</div>
					</transition>
				</div>

				<div class="lg:col-span-3 flex flex-col gap-4 lg:!sticky lg:top-[100px] lg:max-h-[calc(100vh-120px)] fade-bottom lg:self-start">
					<h3 class="text-xl sm:text-2xl !leading-140 font-bold">Dokumentlar</h3>
					<div class="flex flex-col gap-3 lg:overflow-y-auto scrollbar-hide">
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
										<i class="icon-download text-white text-xl leading-6"></i>
									</div>
								</a>
							</template>
						</template>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query'
import { refDebounced } from '@vueuse/core'
import type { ILessonResponse } from '~/types/course'

const { $axios } = useNuxtApp()
const router = useRouter()
const route = useRoute()

const showDropdown = ref(false)

const searchQuery = ref(route.query.search?.toString() || '')
const searchDebounced = refDebounced(searchQuery, 500)

const options = [
	{ label: 'Barchasi', value: 'all' },
	{ label: 'Bepul', value: 'free' },
	{ label: 'Premium', value: 'premium' }
]

const selectedOption = ref(route.query.filter?.toString() || 'all')

const selectedLabel = computed(() => {
	const found = options.find((o) => o.value === selectedOption.value)
	return found ? found.label : 'Barchasi'
})

function handleDropdownToggle(val: boolean) {
	showDropdown.value = val
}

watch(searchDebounced, (newVal) => {
	router.push({
		query: {
			...route.query,
			search: newVal || undefined
		}
	})
})

watch(selectedOption, (newVal) => {
	showDropdown.value = false
	router.push({
		query: {
			...route.query,
			filter: newVal === 'all' ? undefined : newVal
		}
	})
})

const { data, isPending } = useQuery({
	queryKey: ['lessons', selectedOption, searchDebounced],
	queryFn: async () => {
		const params: any = {
			limit: 30,
			search: searchDebounced.value || undefined
		}
		if (selectedOption.value === 'free') {
			params.is_for_premium = 'false'
		} else if (selectedOption.value === 'premium') {
			params.is_for_premium = 'true'
		}

		const res = await $axios.get<ILessonResponse>('marketing/lessons/', { params })
		return res.data
	}
})

const breadcrumbItems = [
	{
		name: 'Darsliklar',
		path: ''
	}
]
</script>
