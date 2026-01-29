<template>
	<div>
		<ProductHeader />
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
		<SectionCustomerReviews />
	</div>
</template>

<script setup lang="ts">
import ProductHeader from '~/components/Product/Single/ProductHeader.vue'

const activeTab = ref(0)

const productTabs = [{ label: 'Mahsulot haqida' }, { label: 'Tavsif' }, { label: 'Xususiyatlari' }, { label: 'Sertifikat' }]

const handleTabChange = (index: number, tab: any) => {
	console.log('Tab changed:', index, tab)
}
</script>
