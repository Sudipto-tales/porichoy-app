<template>
  <ComingSoon 
    icon="fas fa-rocket"
    badge="Status: Building"
    description="This feature is under construction. We're building something incredible for you."
    back-to="/dashboard"
    back-label="Dashboard"
    :show-dashboard="false"
  >
    <template #title>
      SYSTEM<br>
      <span class="text-blue-400 italic">INITIALIZING.</span>
    </template>
  </ComingSoon>
</template>

<script setup>
import ComingSoon from '~/components/errors/ComingSoon.vue'

definePageMeta({ layout: 'dashboard-layout' })

const config = useRuntimeConfig()
useSeoMeta({
  title: `Coming Soon — ${config.public.appName}`,
  description: 'This feature is under construction.',
})
</script>