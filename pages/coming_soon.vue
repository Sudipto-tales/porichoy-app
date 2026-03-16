<template>
  <ComingSoon 
    icon="fas fa-rocket"
    badge="Identity Architecture"
    description="The next generation of professional identity is under construction. Porichoy deploys June 2026."
    back-to="/"
    back-label="Home"
    :show-dashboard="true"
  >
    <template #title>
      THE NEW<br>
      <span class="text-blue-400 italic">STANDARD.</span>
    </template>
  </ComingSoon>
</template>

<script setup>
import ComingSoon from '~/components/errors/ComingSoon.vue'

const config = useRuntimeConfig()
useSeoMeta({
  title: `${config.public.appName} - Coming Soon`,
  description: 'The new standard for professional identities is launching soon.',
})
useHead({ link: [{ rel: 'icon', type: 'image/png', href: '/porichoy.favicon.png' }] })
</script>