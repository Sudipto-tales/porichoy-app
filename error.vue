<template>
  <ErrorPage
    :code="String(error?.statusCode || 500)"
    :icon="error?.statusCode === 404 ? 'fas fa-link-slash' : 'fas fa-server'"
    :icon-color="error?.statusCode === 404 ? 'text-blue-400/60' : 'text-red-400/60'"
    :status-label="error?.statusCode === 404 ? 'Node_Status: Unreachable' : 'System_Failure: Critical'"
    :dot-color="error?.statusCode === 404 ? 'bg-blue-400' : 'bg-red-400'"
    :accent-color="error?.statusCode === 404 ? 'text-blue-400' : 'text-red-400'"
    :description="error?.statusCode === 404 
      ? 'The page you are looking for has been moved or does not exist.' 
      : 'An internal system error occurred. Please try again in a moment.'"
  >
    <template #title>
      <template v-if="error?.statusCode === 404">
        BEYOND THE<br>
        <span class="text-blue-400">GRID.</span>
      </template>
      <template v-else>
        SYSTEM<br>
        <span class="text-red-400">FAILURE.</span>
      </template>
    </template>
  </ErrorPage>
</template>

<script setup>
import ErrorPage from '~/components/errors/ErrorPage.vue'

defineProps({ error: Object })

useHead({
  title: 'Error | Porichoy',
  link: [{ rel: 'icon', type: 'image/png', href: '/porichoy.favicon.png' }]
})
</script>
