<template>
	<div class="bg-white rounded-2xl p-4 w-full flex flex-col gap-3">
		<div class="skeleton rounded-2xl aspect-video w-full relative">
			<div class="absolute inset-0 flex items-center justify-center">
				<div class="w-16 h-16 skeleton rounded-full opacity-80"></div>
			</div>
		</div>

		<div class="h-4 skeleton rounded-lg w-20"></div>

		<div class="h-5 skeleton rounded-lg w-4/5"></div>
	</div>
</template>
<script lang="ts" setup></script>
