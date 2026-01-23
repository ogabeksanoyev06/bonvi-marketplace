<template>
	<div class="bg-white rounded-2xl p-2 w-full flex flex-col gap-3">
		<div class="skeleton rounded-2xl aspect-[4/3] w-full"></div>

		<div class="h-4 skeleton rounded-2xl w-4/5"></div>

		<div class="flex flex-col gap-1">
			<div class="h-3 skeleton rounded-2xl w-full"></div>
			<div class="h-3 skeleton rounded-2xl w-5/6"></div>
		</div>

		<div class="flex items-center gap-2">
			<div class="h-4 skeleton rounded-2xl w-1/3"></div>
			<div class="h-4 skeleton rounded-2xl w-1/4"></div>
		</div>

		<div class="h-10 skeleton rounded-full w-full mt-auto"></div>
	</div>
</template>

<script setup lang="ts"></script>
