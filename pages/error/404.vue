<template>
  <ErrorPage 
    code="404"
    icon="fas fa-link-slash"
    icon-color="text-blue-400/60"
    status-label="Node_Status: Unreachable"
    dot-color="bg-blue-400"
    accent-color="text-blue-400"
    description="The structural component you are looking for has been moved or de-indexed from our architectural database."
  >
    <template #title>
      BEYOND THE<br>
      <span class="text-blue-400">GRID.</span>
    </template>
  </ErrorPage>
</template>

<script setup>
import ErrorPage from '~/components/errors/ErrorPage.vue'

useHead({
  title: 'Page Not Found | 404',
  link: [{ rel: 'icon', type: 'image/png', href: '/porichoy.favicon.png' }]
})
</script>