<template>
  <div class="h-screen w-full bg-[#0f0f14] flex flex-col overflow-hidden font-sans selection:bg-blue-500/30">
    <slot />
  </div>
</template>

<script setup>
useHead({
  link: [
    { rel: 'icon', type: 'image/png', href: '/porichoy.favicon.png' },
    { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap' }
  ]
})
</script>

<style scoped>
div {
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
}
</style>
