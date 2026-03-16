<template>
  <ErrorPage 
    code="500"
    icon="fas fa-server"
    icon-color="text-red-400/60"
    status-label="System_Failure: Critical"
    dot-color="bg-red-400"
    accent-color="text-red-400"
    description="An internal system error occurred. Our engineering team has been alerted. Please try again in a moment."
  >
    <template #title>
      SYSTEM<br>
      <span class="text-red-400">FAILURE.</span>
    </template>
  </ErrorPage>
</template>

<script setup>
import ErrorPage from '~/components/errors/ErrorPage.vue'

useHead({
  title: 'Server Error | 500',
  link: [{ rel: 'icon', type: 'image/png', href: '/porichoy.favicon.png' }]
})
</script>