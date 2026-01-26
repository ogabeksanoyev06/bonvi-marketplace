<template>
	<div>
		<UIBreadcrumb :routes="breadcrumbItems" />
		<div class="container">
			<div class="flex items-center gap-3 py-5">
				<img src="/images/header/basket.svg" alt="basket" />
				<h3 class="text-[28px] leading-130 font-bold">Mahsulotlar</h3>
			</div>
		</div>

		<div class="container bg-white rounded-[40px] p-10">
			<div class="grid lg:grid-cols-12 gap-8">
				<div class="sticky h-[calc(100vh-124px)] top-28 lg:col-span-3 hidden lg:block">
					<div class="h-full overflow-y-auto">
						<div class="bg-gray p-3 rounded-2xl"></div>
					</div>
				</div>
				<div class="lg:col-span-9">
					<transition name="fade" mode="out-in">
						<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
							<template v-if="isPending">
								<CardProductLoading v-for="key in 8" :key="key" />
							</template>
							<template v-else>
								<CardProduct
									v-for="item in items"
									:key="item.id"
									:images="item.images"
									:title="item.title"
									:description="item.description"
									:originalPrice="item.originalPrice"
									:discountedPrice="item.discountedPrice"
									:discountPercent="item.discountPercent"
									:brand="item.brand"
									image-bg="blue"
								/>
							</template>
						</div>
					</transition>
					<div class="mt-5 flex justify-center">
						<UIButton text="Ko‘proq ko‘rish" icon="icon-chevron text-2xl leading-6" />
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script lang="ts" setup>
const breadcrumbItems = [
	{
		name: 'Mahsulotlar',
		path: ''
	}
]

const isPending = ref(false)

const items = ref([
	{
		id: 1,
		images: ['/images/bonvi-product.png', '/images/bonvi-product.png', '/images/bonvi-product.png', '/images/bonvi-product.png'],
		title: 'Qariyalar uchun mapet',
		description: '12V tizimlar uchun ishonchli quvvat manbai. Barqaror kuchlanish beradi, o‘rnatish oson va uzoq muddat xizmat qiladi.',
		originalPrice: 2000000,
		discountedPrice: 1200000,
		discountPercent: '51%',
		brand: 'bonvi'
	},
	{
		id: 2,
		images: ['/images/bonvi-product.png', '/images/bonvi-product.png'],
		title: 'LED chiroq',
		description: 'Yuqori sifatli LED chiroq, energiya tejamkor va uzoq xizmat qiladi.',
		originalPrice: 500000,
		discountedPrice: 350000,
		discountPercent: '30%',
		brand: 'bonvi'
	},
	{
		id: 3,
		images: ['/images/vikor-product.png', '/images/vikor-product.png'],
		title: 'Avtomobil akkumulyatori',
		description: '12V tizimlar uchun ideal, ishonchli va uzoq umrli akkumulyator.',
		originalPrice: 1800000,
		discountedPrice: 1500000,
		discountPercent: '17%',
		brand: 'vikor'
	},
	{
		id: 4,
		images: ['/images/dark-product.png', '/images/dark-product.png'],
		title: 'Uy uchun Mapet',
		description: 'Barqaror kuchlanish va oson o‘rnatish bilan uy tizimlari uchun qulay.',
		originalPrice: 1200000,
		discountedPrice: 900000,
		discountPercent: '25%',
		brand: 'dark'
	},
	{
		id: 5,
		images: ['/images/bonvi-product.png', '/images/bonvi-product.png'],
		title: 'Mobil Powerbank',
		description: 'Tez quvvatlanadi, uzun xizmat muddati bilan xavfsiz.',
		originalPrice: 600000,
		discountedPrice: 450000,
		discountPercent: '25%',
		brand: 'bonvi'
	},
	{
		id: 6,
		images: ['/images/vikor-product.png', '/images/vikor-product.png'],
		title: 'LED lampochka',
		description: 'Yorqin va kam energiya sarf qiluvchi lampochka.',
		originalPrice: 200000,
		discountedPrice: 150000,
		discountPercent: '25%',
		brand: 'vikor'
	},
	{
		id: 7,
		images: ['/images/dark-product.png', '/images/dark-product.png'],
		title: 'Avtomobil chiroqlari',
		description: 'Yuqori sifatli va uzoq xizmat qiluvchi avtomobil chiroqlari.',
		originalPrice: 800000,
		discountedPrice: 600000,
		discountPercent: '25%',
		brand: 'dark'
	},
	{
		id: 8,
		images: ['/images/bonvi-product.png', '/images/bonvi-product.png'],
		title: 'Uy sharoitida Mapet',
		description: 'Barqaror kuchlanish, oson o‘rnatish va uzoq xizmat muddati.',
		originalPrice: 1000000,
		discountedPrice: 750000,
		discountPercent: '25%',
		brand: 'bonvi'
	}
])

onMounted(() => {
	setTimeout(() => {
		isPending.value = false
	}, 2000)
})
</script>
