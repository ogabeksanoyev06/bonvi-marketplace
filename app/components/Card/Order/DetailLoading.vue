<template>
	<div class="flex sm:items-center p-4 gap-2 sm:gap-4 w-full max-sm:h-[200px] bg-white rounded-2xl">
		<!-- Image skeleton -->
		<div class="w-[128px] sm:w-[130px] h-full md:aspect-square rounded-[28px] skeleton"></div>

		<!-- Text skeletons -->
		<div class="flex flex-col md:flex-row items-start md:items-end w-full gap-4 flex-1 md:justify-between">
			<!-- Left block -->
			<div class="flex flex-col gap-3 max-w-[574px] flex-1">
				<!-- Title skeleton -->
				<div class="w-3/4 h-4 skeleton rounded"></div>
				<!-- Description skeleton -->
				<div class="w-full h-6 skeleton rounded"></div>
				<!-- Quantity & price skeleton -->
				<div class="flex gap-2 items-center mt-1">
					<div class="w-12 h-4 skeleton rounded"></div>
					<div class="w-3 h-3 skeleton rounded-full"></div>
					<div class="w-20 h-4 skeleton rounded"></div>
				</div>
			</div>

			<!-- Right block -->
			<div class="flex flex-col gap-2 items-start sm:items-end">
				<div class="w-16 h-4 skeleton rounded"></div>
				<div class="w-24 h-5 sm:h-6 skeleton rounded"></div>
			</div>
		</div>
	</div>
</template>

<script setup></script>
