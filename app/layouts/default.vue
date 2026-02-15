<template>
	<div class="bg-background relative z-10 flex min-h-svh flex-col">
		<!-- <LayoutHeader /> -->
		<main class="flex flex-1 flex-col">
			<slot />
					<LayoutHeaderAuthorization />

		</main>
		<!-- <LayoutFooter /> -->
	</div>
</template>

<script setup></script>
