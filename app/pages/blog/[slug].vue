<template>
	<div>
		<UIBreadcrumb :routes="breadcrumbItems" />
		<NuxtLinkLocale to="/blog" class="container max-w-[1120px]  flex-y-center gap-3 py-3 md:py-5">
			<div class="flex-center size-9 md:size-10 bg-white rounded-full">
				<span class="icon-chevron text-black text-[28px] leading-7 rotate-90"></span>
			</div>
			<h3 class="text-[28px] leading-130 font-bold">Bloglar</h3>
		</NuxtLinkLocale>
		<div class="bg-white rounded-[40px] px-4 py-6 md:px-10 md:py-6">
			<div class="container flex flex-col gap-5 max-w-[1120px] mx-auto w-full">
				<h1 class="text-2xl md:text-3xl lg:text-[42px] !font-bold leading-130">Ko‘pchilikni qiynaydigan savollarga javoblar</h1>
				<p class="text-base md:text-xl !leading-130 text-black">
					Mamlakat nafaqat dunyoda, balki Markaziy Osiyo mintaqasida ham eng xavfsiz davlatlardan biri sifatida eʼtirof etilgan. Xavfsizlik indeksi 100 dan 73,4 ni tashkil
					etdi.Numbeo tahliliy portali 2025 yil uchun dunyoning eng xavfsiz mamlakatlari va hududlari reytingini eʼlon qildi.
				</p>

				<UIImage src="/images/background-patterns.webp" image-class="rounded-3xl" class="h-[350px] md:h-[440px] rounded-3xl" />

				<p class="text-base md:text-xl !leading-130 text-black">
					Numbeo Crime Index (jinoyatchilik indeksi) va Safety Index (xavfsizlik indeksi)ni foydalanuvchilarning jinoyatchilik darajasi, kunduzgi va tungi xavfsizlik, o‘g‘rilik,
					hujum, shilqimlik, mulkiy va zo‘ravonlik jinoyatlarining og‘irlik darajasini baholash bo‘yicha javoblari asosida hisoblaydi.
					<br />
					<br />
					Indekslar 0 dan 100 gacha o‘zgarib turadi: xavfsizlik indeksi qanchalik yuqori bo‘lsa, mamlakat shunchalik xavfsiz bo‘ladi. O‘zbekiston 25-o‘rinni egalladi, mamlakat
					indeksi 73,4 ni tashkil etdi. Markaziy Osiyoning boshqa davlatlari orasida Qozog‘iston (73-o‘rin, indeks 54,4) va Qirg‘iziston (101-o‘rin, indeks 48).
					<br />
					<br />
					O‘zbekistonda jinoyatchilik indeksi 26,6 ni tashkil etdi, bu past daraja sifatida tasniflanadi. Birlashgan Arab Amirliklari (BAA) dunyoning eng xavfsiz davlatlari
					ro‘yxatini boshqardi, ikkinchi o‘rinda Andorra, uchinchi o‘rinda Qatar. Eng xavfli davlatlar sifatida Gaiti, Papua-Yangi Gvineya va Venesuela tan olingan. Qayd
					etilishicha, maʼlumotlar rasmiy davlat statistikasiga emas, balki respondentlarning subyektiv idrokiga asoslanadi.
				</p>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
const breadcrumbItems = [
	{
		name: 'Blog',
		path: '/blog'
	},
	{
		name: 'Blog haqida',
		path: '/'
	}
]
</script>
