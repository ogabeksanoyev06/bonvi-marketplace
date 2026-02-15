<template>
	<div>
		<NuxtRouteAnnouncer />
		<NuxtLayout>
			<NuxtPage />
		</NuxtLayout>
	</div>
</template>
<script setup lang="ts">
const access_token = useCookie('access_token')
const refresh_token = useCookie('refresh_token')
</script>
