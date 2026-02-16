<template>
	<div>
		<transition name="fade">
			<ProductSingleProductHeaderLoading v-if="isPending" />
			<div v-else>
				<UIBreadcrumb :routes="breadcrumbItems" />
				<ProductHeader :product="product" />
				<div class="md:container md:mt-7">
					<UITabs
						variant="pill"
						class="bg-white rounded-3xl px-4 md:px-5 py-5 min-h-[326px] h-full"
						v-model="activeTab"
						:tabs="productTabs"
						content-class="max-w-[1056px] w-full"
						@change="handleTabChange"
					>
						<div v-if="activeTab === 0">
							Kärcher MIC 34C — bu to‘liq g‘ildirakli harakatga ega, manevr qobiliyatli mashina bo‘lib, ko‘cha tozalash, qor tozalash va boshqa kommunal ishlar uchun mo‘ljallangan.
							Jamoat va shaxsiy hududlarda foydalanish uchun mos.
						</div>
						<div v-if="activeTab === 1">Tavsif...</div>
						<div v-if="activeTab === 2">Xususiyatlari...</div>
						<div v-if="activeTab === 3">Sertifikat...</div>
					</UITabs>
				</div>
			</div>
		</transition>
		<SectionCustomerReviews :slug="slug" />
	</div>
</template>

<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query'
import ProductHeader from '~/components/Product/Single/ProductHeader.vue'
import type { IProductItem } from '~/types/products.d'

const activeTab = ref(0)

const { $axios } = useNuxtApp()
const route = useRoute()

const slug = route.params.slug as string

const productTabs = [{ label: 'Mahsulot haqida' }, { label: 'Tavsif' }, { label: 'Xususiyatlari' }, { label: 'Sertifikat' }]

const handleTabChange = (index: number, tab: any) => {
	console.log('Tab changed:', index, tab)
}

const { data: product, isPending } = useQuery({
	queryKey: ['product-detail', slug],
	queryFn: async () => {
		const res = await $axios.get<IProductItem>(`products/detail/${slug}/`)
		return res.data
	},
	enabled: !!slug
})

const breadcrumbItems = computed(() => [
	{ name: 'Mahsulotlar', path: '/products' },
	{ name: product.value?.name ?? '', path: '' }
])
</script>
