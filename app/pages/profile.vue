<template>
	<div class="container">
		<div :class="[showSidebar ? 'grid md:grid-cols-[350px_minmax(0,1fr)] gap-6 pt-8' : '']">
			<!-- Sidebar -->
			<div v-if="showSidebar" class="flex flex-col gap-5">
				<!-- User info -->
				<div class="flex flex-col items-center gap-3">
					<div class="flex-center w-[100px] aspect-square rounded-full bg-white/10">
						<img src="/images/user.png" alt="" class="w-full h-full object-cover" />
					</div>
					<div class="flex flex-col gap-0.5">
						<h3 class="text-2xl font-medium leading-130">Odiljon Sanoev</h3>
						<span class="text-lg leading-130 opacity-50">+998 93 472 93 35</span>
					</div>
				</div>
				<div class="flex flex-col gap-10">
					<!-- obuna -->
					<div class="flex flex-col gap-5 md:gap-7 p-5 rounded-3xl md:rounded-[40px] overflow-hidden relative z-10">
						<img src="/images/profile-hero-image.png" alt="" class="absolute bottom-0 right-0 z-[-1]" />
						<img src="/images/hero-background-patterns.jpg" alt="hero-background-patterns" class="absolute inset-0 max-sm:object-top w-full h-full object-cover z-[-2]" />
						<div class="flex flex-col gap-2 max-w-[263px]">
							<h2 class="text-2xl font-bold font-adero-trial text-white !leading-130">Premium</h2>
							<p class="text-base !leading-130 text-white">Barcha qulayliklar siz uchun premium obunani xarid qiling va eng yaxshi darajaga chiqing</p>
						</div>
						<UIButton text="Obunani xarid qilish" variant="secondary" class="!bg-white w-fit h-12 px-4 font-adero-trial !font-semibold !text-sm" />
					</div>

					<!-- balance -->
					<UIAccordion
						:show="isOpenAcc"
						header-class=" !pt-4 pb-3"
						@toggle="toggleAccordion"
						:wrapper-class="['rounded-[24px] bg-[linear-gradient(338deg,#00DF38_-6.86%,#006674_110.73%)]']"
					>
						<template #header>
							<div class="flex items-center justify-between h-full relative z-10">
								<img src="/images/book.png" alt="" class="absolute right-0 bottom-0 z-[-1] w-[131px] aspect-[131/114] object-contain" />
								<div class="flex flex-col gap-1">
									<span class="text-base text-gray">Umumiy balans:</span>
									<span class="text-xl font-bold text-white">50 000 UZS</span>
								</div>
								<span class="flex-center size-7 p-1 bg-black rounded-full transition-300" :class="isOpenAcc ? 'rotate-180' : ''">
									<i class="icon-chevron text-xl pt-1 text-white"></i>
								</span>
							</div>
						</template>

						<template #body>
							<div class="rounded-[20px] bg-black/30 border border-white/30 mx-4 mb-4 backdrop-blur-[50px]">
								<div class="flex-center-between p-3 border-b border-white/[0.12] text-white">
									<span>Keshbek balans:</span>
									<span><span class="font-bold">12 000</span> UZS</span>
								</div>
								<div class="flex-center-between p-3 border-b border-white/[0.12] text-white">
									<span>Referal balans:</span>
									<span><span class="font-bold">12 000</span> UZS</span>
								</div>
								<div class="flex-center-between p-3 text-white">
									<span>Savollardan tushgan balans:</span>
									<span><span class="font-bold">12 000 000</span> UZS</span>
								</div>
							</div>
						</template>
					</UIAccordion>
				</div>

				<!-- Menu -->
				<nav class="rounded-3xl border-2 border-white/10 bg-[linear-gradient(332deg,#000_7.83%,#004587_140.04%)] overflow-hidden">
					<NuxtLinkLocale
						v-for="item in menu"
						:key="item.to"
						:to="item.to"
						class="flex items-center justify-between px-5 py-4 border-b border-white/10 transition-300 last:border-b-0 hover:bg-white/5 hover:backdrop-blur-sm"
						exact-active-class="!bg-white/5 !backdrop-blur-md"
					>
						<div class="flex-y-center gap-2 flex-1">
							<span class="flex-center size-10 p-2 bg-white rounded-full">
								<i :class="item.icon" class="text-2xl leading-6"></i>
							</span>
							<span class="text-base font-medium leading-130 text-white">
								{{ item.label }}
							</span>
						</div>
						<span class="flex-center size-7 p-1 bg-white/[0.12] rounded-full">
							<i class="icon-chevron text-xl leading-5 -rotate-90 text-white"></i>
						</span>
					</NuxtLinkLocale>
				</nav>
			</div>

			<!-- Page content -->
			<div class="w-full">
				<transition name="profile-page-change" mode="out-in">
					<div :key="$route.name">
						<NuxtPage />
					</div>
				</transition>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
const route = useRoute()

const menu = [
	{ label: 'Profil ma’lumotlar', to: '/profile', icon: 'icon-user-profile' },
	{ label: 'Xabarnomalar', to: '/profile/notifications', icon: 'icon-bell' },
	{ label: 'Buyurtmalar', to: '/profile/orders', icon: 'icon-order-profile' },
	{ label: 'Referal', to: '/profile/referral', icon: 'icon-share' },
	{ label: 'Kartalar', to: '/profile/my-cards', icon: 'icon-credit-card' }
]

const isOpenAcc = ref(false)

const showSidebar = computed(() => route.meta?.sidebar !== false)

function toggleAccordion() {
	isOpenAcc.value = !isOpenAcc.value
}
</script>
