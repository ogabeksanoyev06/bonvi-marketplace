<template>
	<div class="flex flex-row md:flex-col gap-3 bg-white rounded-2xl transition-300 p-3">
		<!-- Image skeleton -->
		<div class="w-full h-[150px] sm:h-[234px] rounded-xl skeleton"></div>

		<div class="flex flex-col gap-3">
			<!-- ID + Status -->
			<div class="flex items-center justify-between">
				<div class="w-20 h-4 rounded skeleton"></div>
				<div class="flex items-center gap-1.5">
					<div class="w-4 h-4 rounded-full skeleton"></div>
					<div class="w-24 h-4 rounded skeleton"></div>
				</div>
			</div>

			<div class="w-full h-px skeleton"></div>

			<!-- Time blocks -->
			<div class="flex flex-col gap-3">
				<div class="flex items-center justify-between">
					<div class="w-28 h-3 rounded skeleton"></div>
					<div class="w-16 h-3 rounded skeleton"></div>
				</div>
				<div class="flex items-center justify-between">
					<div class="w-36 h-3 rounded skeleton"></div>
					<div class="w-16 h-3 rounded skeleton"></div>
				</div>
			</div>

			<div class="w-full h-px skeleton"></div>

			<!-- Price -->
			<div class="flex items-center justify-between">
				<div class="w-14 h-3 rounded skeleton"></div>
				<div class="w-20 h-4 rounded skeleton"></div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts"></script>
