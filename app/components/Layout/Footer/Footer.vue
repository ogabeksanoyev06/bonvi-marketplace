<template>
	<footer class="md:container pt-12 md:pb-12">
		<div class="bg-[#E2EEF9] md:rounded-[48px] overflow-hidden relative z-10">
			<!-- Background Pattern -->
			<img
				src="/images/footer-bg-patterns.png"
				alt="Footer background"
				class="absolute h-[350px] left-0 bottom-0 lg:-bottom-[70px] -z-10 pointer-events-none select-none hidden lg:block animate-pulse"
			/>

			<!-- DESKTOP -->
			<div class="hidden min-[1220px]:flex justify-between gap-5 py-8 px-12">
				<!-- Logo & Social -->
				<div class="flex flex-col gap-10 pt-6">
					<NuxtLinkLocale to="/" class="flex items-center">
						<img src="/images/logo.svg" alt="Bonvi logo" class="h-14" />
					</NuxtLinkLocale>

					<div class="flex gap-2.5">
						<a
							v-for="social in socialLinks"
							:key="social.name"
							:href="$t(social.link)"
							target="_blank"
							rel="noopener noreferrer"
							class="size-8 flex-center rounded-full bg-gradient-to-b from-[#0083FF] to-[#001D88] transition-transform hover:scale-110"
							:aria-label="social.name"
						>
							<span :class="`icon-${social.icon} text-xl text-white`" />
						</a>
					</div>
				</div>

				<!-- Navigation & Contacts -->
				<div class="flex flex-col gap-16 pt-6">
					<nav class="flex gap-10 text-lg font-medium">
						<NuxtLinkLocale v-for="item in navigationLinks" :key="item.id" :to="item.to" class="transition-300 hover:text-orange">
							{{ $t(item.label) }}
						</NuxtLinkLocale>
					</nav>

					<ul class="flex gap-6">
						<li v-for="contact in contactInfo" :key="contact.type" class="flex items-center gap-2">
							<span :class="`icon-${contact.icon} text-2xl text-blue`" />
							<a :href="`${contact.type}:${$t(contact.link)}`" class="text-lg font-medium transition-300 hover:text-blue">
								{{ contact.display }}
							</a>
						</li>
					</ul>
				</div>

				<!-- App Stores -->
				<div class="flex gap-6 items-start">
					<div v-for="app in appStores" :key="app.name" class="flex flex-col gap-2.5">
						<div class="size-[160px] bg-white p-3 rounded-2xl border">
							<img :src="app.qr" :alt="`${app.name} QR`" class="w-full h-full" />
						</div>
						<div class="w-[160px] bg-white py-4 px-5 rounded-xl border">
							<img :src="app.store" :alt="app.name" class="w-full" />
						</div>
					</div>
				</div>
			</div>

			<!-- MOBILE -->
			<div class="flex flex-col items-center py-6 px-5 min-[1220px]:hidden">
				<NuxtLinkLocale to="/" class="mb-6">
					<img src="/images/logo.svg" alt="Bonvi logo" class="h-10" />
				</NuxtLinkLocale>

				<div class="flex gap-3 mb-6">
					<a
						v-for="social in socialLinks"
						:key="social.name"
						:href="$t(social.link)"
						target="_blank"
						rel="noopener noreferrer"
						class="size-8 flex-center rounded-full bg-gradient-to-b from-[#0083FF] to-[#001D88]"
					>
						<span :class="`icon-${social.icon} text-xl text-white`" />
					</a>
				</div>

				<nav class="w-full mb-5">
					<div class="grid gap-2 max-w-sm mx-auto">
						<NuxtLinkLocale
							v-for="item in navigationLinks"
							:key="item.id"
							:to="item.to"
							class="py-3 px-4 bg-white/30 rounded-xl text-center font-medium transition-300 hover:text-orange"
						>
							{{ $t(item.label) }}
						</NuxtLinkLocale>
					</div>
				</nav>

				<ul class="flex flex-col gap-4 bg-white/30 rounded-xl w-full max-w-sm py-4 mb-5">
					<li v-for="contact in contactInfo" :key="contact.type" class="flex justify-center items-center gap-2">
						<span :class="`icon-${contact.icon} text-2xl text-blue`" />
						<a :href="`${contact.type}:${$t(contact.link)}`" class="font-medium transition-300 hover:text-blue">
							{{ contact.display }}
						</a>
					</li>
				</ul>

				<div class="grid grid-cols-2 gap-4">
					<div v-for="app in appStores" :key="app.name" class="flex flex-col gap-2.5">
						<div class="size-[160px] bg-white p-3 rounded-2xl border">
							<img :src="app.qr" class="w-full h-full" />
						</div>
						<div class="w-[160px] bg-white py-4 px-5 rounded-xl border">
							<img :src="app.store" class="w-full" />
						</div>
					</div>
				</div>
			</div>

			<!-- Bottom -->
			<div class="bg-[#E3F1FF14] backdrop-blur py-6 border-t border-white/10">
				<div class="flex flex-col md:flex-row items-center justify-between gap-3 text-center md:text-left px-6">
					<div class="flex gap-4">
						<NuxtLinkLocale v-for="link in legalLinks" :key="link.to" :to="link.to" class="text-sm transition-300 hover:text-blue">
							{{ link.label }}
						</NuxtLinkLocale>
					</div>
					<p class="text-sm font-medium">Kompaniya tomonidan ishlab chiqilgan</p>
					<p class="text-sm">© 2025 — Bonvi platformasi</p>
				</div>
			</div>
		</div>
	</footer>
</template>

<script setup lang="ts">
const navigationLinks = [
	{ id: 'home', label: 'Asosiy', to: '/' },
	{ id: 'about', label: 'Biz haqimizda', to: '/about' },
	{ id: 'courses', label: 'Darsliklar', to: '/courses' },
	{ id: 'products', label: 'Mahsulotlar', to: '/products' },
	{ id: 'blog', label: 'Blog', to: '/blog' }
]

const socialLinks = [
	{ name: 'Instagram', icon: 'instagram', link: 'social_instagram' },
	{ name: 'Telegram', icon: 'telegram', link: 'social_telegram' },
	{ name: 'Facebook', icon: 'facebook', link: 'social_facebook' },
	{ name: 'X', icon: 'x', link: 'social_x' }
]

const contactInfo = [
	{ type: 'mailto', icon: 'email', link: 'contact_email', display: 'info@bonvi.uz' },
	{ type: 'tel', icon: 'phone', link: 'contact_phone', display: '+998 97 991-62-20' }
]

const appStores = [
	{ name: 'App Store', qr: '/images/qr-code.webp', store: '/images/app-store.svg' },
	{ name: 'Google Play', qr: '/images/qr-code.webp', store: '/images/google-play.svg' }
]

const legalLinks = [
	{ to: '/static/privacy-policy', label: 'Privacy Policy' },
	{ to: '/static/terms', label: 'Terms & Conditions' }
]
</script>
