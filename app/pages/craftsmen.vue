<template>
	<div>
		<UIBreadcrumb :routes="breadcrumbItems" />
		<div class="container">
			<div class="flex items-center gap-3 py-3 md:py-5">
				<img src="/images/fire-icon.svg" alt="fire" />
				<h3 class="text-[28px] leading-130 font-bold">Mohir ustalarimiz</h3>
			</div>
		</div>

		<div class="container bg-white rounded-[40px] px-4 py-6 md:px-10 md:py-10">
			<div class="grid lg:grid-cols-12 gap-8">
				<div class="lg:col-span-3 hidden lg:block">
					<CraftsmenFilter />
				</div>
				<div class="lg:col-span-9">
					<ModalCraftsmenFilter class="block lg:hidden mb-5 w-full" />
					<transition name="fade" mode="out-in">
						<div class="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5">
							<template v-if="isPending">
								<CardCraftsmenLoading v-for="key in 8" :key="key" />
							</template>
							<template v-else>
								<CardCraftsmen
									v-for="key in 12"
									:key="key"
									:name="'Abdurahim Eshonjonov'"
									:service="'Avtomobil shinalarini almashtirish'"
									:phone="'+998 90 123 45 67'"
									:city="'Toshkent shahri'"
								/>
							</template>
						</div>
					</transition>
					<div class="mt-4 flex justify-center">
						<UIButton text="Ko‘proq ko‘rish" icon="icon-chevron text-2xl leading-6" class="max-sm:w-full" />
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script lang="ts" setup>
const breadcrumbItems = [
	{
		name: 'Mohir ustalarimiz',
		path: ''
	}
]

const isPending = ref(false)

onMounted(() => {
	setTimeout(() => {
		isPending.value = false
	}, 2000)
})
</script>
