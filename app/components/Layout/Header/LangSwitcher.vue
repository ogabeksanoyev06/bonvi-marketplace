<template>
	<UIDropdown :show="showDropdown" @toggle="handleDropdownToggle" :body-class="['!min-w-[188px] bg-white border-2 border-gray lg:!right-1/2 lg:translate-x-1/2']">
		<template #head="{ show }">
			<div class="flex items-center gap-2 bg-gray p-[6px_8px_6px_6px] border border-transparent rounded-full cursor-pointer " :class="[show ? '!border-blue' : '']">
				<img :src="currentLanguage?.flag" alt="flag" class="size-6 aspect-square" />
				<span class="text-sm leading-130 font-bold uppercase">
					{{ currentLanguage?.code }}
				</span>
			</div>
		</template>

		<template #body>
			<div
				v-for="(lang, index) in languagesList"
				:key="index"
				class="w-full group transition-300 flex items-center justify-between gap-4 py-2.5 pl-3 pr-2 cursor-pointer transition-300 border-b border-gray last:border-b-0 group"
				@click="handleLanguageChange(lang.code)"
			>
				<div class="flex-y-center gap-2">
					<img :src="lang?.flag" alt="flag" class="size-6 aspect-square" />
					<span class="text-sm font-medium leading-140 tranistion-300">
						{{ lang.name }}
					</span>
				</div>
				<transition name="fade">
					<i v-if="lang?.code === currentLanguage?.code" class="icon-icon-tick text-blue flex-center text-[20px] aspect-square" />
				</transition>
			</div>
		</template>
	</UIDropdown>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const { changeLocale, currentLanguage, languagesList } = useLanguageSwitcher()

const showDropdown = ref(false)

function handleLanguageChange(code: string) {
	changeLocale(code)
	showDropdown.value = false
}

function handleDropdownToggle(val: boolean) {
	showDropdown.value = val
}
</script>
