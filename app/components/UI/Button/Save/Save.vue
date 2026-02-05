<template>
	<div class="size-11 flex-center p-1.5 bg-white rounded-full cursor-pointer shrink-0" @click="saved = !saved">
		<transition name="pulse-fade" mode="out-in">
			<i v-if="!saved" class="icon-saved text-gray-4 text-2xl leading-6" />
			<img v-else src="/images/saved.svg" alt="saved" class="size-6" />
		</transition>
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const saved = ref(false)
</script>
