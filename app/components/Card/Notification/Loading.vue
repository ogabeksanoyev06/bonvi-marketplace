<template>
	<div class="bg-white p-4 rounded-[20px] flex flex-col gap-3">
		<div class="flex items-center justify-between">
			<div class="flex items-center gap-3">
				<!-- Icon skeleton -->
				<div class="w-[52px] h-[52px] rounded-full skeleton"></div>

				<!-- Title + Date skeleton -->
				<div class="flex flex-col gap-2">
					<!-- Title -->
					<div class="w-32 h-5 rounded skeleton"></div>

					<!-- Date row -->
					<div class="flex items-center gap-1.5">
						<div class="w-16 h-2 rounded skeleton"></div>
						<span class="size-1 rounded-full skeleton"></span>
						<div class="w-10 h-2 rounded skeleton"></div>
					</div>
				</div>
			</div>

			<!-- Button skeleton (desktop only) -->
			<div class="hidden md:block">
				<div class="w-24 h-8 rounded-full skeleton"></div>
			</div>
		</div>

		<!-- Description skeleton -->
		<div class="w-full h-3 rounded skeleton"></div>
		<div class="w-4/5 h-3 rounded skeleton"></div>
		<div class="w-3/5 h-3 rounded skeleton"></div>
	</div>
</template>

<script setup></script>
