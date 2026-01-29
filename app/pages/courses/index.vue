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
				<div class="flex sm:items-center flex-col sm:flex-row sm:justify-between gap-3">
					<h3 class="text-2xl font-bold leading-140">Videolar</h3>
					<div class="sm:flex-1 flex sm:justify-end gap-3">
						<UIDropdown :show="showDropdown" @toggle="handleDropdownToggle" :body-class="['!min-w-[200px] bg-white border-2 border-gray']">
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
						<FormInputSearch />
					</div>
				</div>
				<transition name="fade" mode="out-in">
					<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
						<template v-if="isPending">
							<CardCourseLoading v-for="key in 6" :key="key" />
						</template>
						<template v-else>
							<CardCourse v-for="course in courses" :key="course.id" :title="course.title" :lessonNumber="course.lessonNumber" :image="course.image" :isLocked="course.isLocked" />
						</template>
					</div>
				</transition>
				<UIButton class="md:hidden block" text="Ko‘proq ko‘rish" icon="icon-chevron -rotate-90 text-2xl leading-6" />
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
					<UIButton class="md:hidden block" text="Ko‘proq ko‘rish" icon="icon-chevron -rotate-90 text-2xl leading-6" />

					<UIButton class="lg:w-fit w-full md:block hidden" text="Barchasi" icon="icon-chevron -rotate-90 text-2xl leading-6" />
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
const breadcrumbItems = [
	{
		name: 'Darsliklar',
		path: ''
	}
]

const isPending = ref(true)
const showDropdown = ref(false)

const options = [
	{ label: 'Barchasi', value: 'all' },
	{ label: 'Bepul', value: 'free' },
	{ label: 'Premium', value: 'premium' }
]

const selectedOption = ref('all')

const selectedLabel = computed(() => {
	const found = options.find((o) => o.value === selectedOption.value)
	return found ? found.label : ''
})

function handleDropdownToggle(val: boolean) {
	showDropdown.value = val
}

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

watch(selectedOption, () => {
	showDropdown.value = false
})

onMounted(() => {
	setTimeout(() => {
		isPending.value = false
	}, 2000)
})
</script>
