<template>
	<div class="flex flex-col gap-3 p-4 w-[400px] bg-white rounded-2xl shrink-0">
		<!-- Avatar -->
		<div class="flex items-center gap-4 w-full">
			<div class="w-12 h-12 rounded-full skeleton shrink-0"></div>
			<div class="flex flex-col gap-2 w-full">
				<div class="h-3 w-1/2 skeleton rounded"></div>
				<div class="h-2 w-1/3 skeleton rounded"></div>
			</div>
		</div>

		<!-- Name -->
		<div class="h-4 w-1/3 skeleton rounded"></div>

		<!-- Review text -->
		<div class="space-y-1 mt-2">
			<div class="h-3 w-full skeleton rounded"></div>
			<div class="h-3 w-full skeleton rounded"></div>
			<div class="h-3 w-full skeleton rounded"></div>
			<div class="h-3 w-5/6 skeleton rounded"></div>
			<div class="h-3 w-4/6 skeleton rounded"></div>
		</div>
	</div>
</template>

<script setup lang="ts"></script>
