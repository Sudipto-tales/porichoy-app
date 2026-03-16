<template>
    <div class="h-screen w-full flex flex-col overflow-hidden font-sans selection:bg-blue-500/30"
      :style="{ backgroundColor: 'var(--bg-page)' }">

        <AppNavBar class="z-50 backdrop-blur-xl"
            :style="{ backgroundColor: 'var(--nav-bg)', borderBottom: '1px solid var(--border)' }"
            :profile="{ name: 'Sudipta', avatar: '/porichoy.favicon.png' }" />

        <div class="flex flex-1 overflow-hidden relative">
            <AppSideBar class="z-40" :style="{ borderRight: '1px solid var(--border)', backgroundColor: 'var(--sidebar-bg)' }" />
            <slot />
        </div>
    </div>
</template>
<script setup>
import AppNavBar from '~/components/AppNavBar.vue'
import AppSideBar from '~/components/AppSideBar.vue'
import { useTheme } from '~/composables/useTheme'

const { applyTheme } = useTheme()

onMounted(() => {
  applyTheme()
})

useHead({
  link: [
    { rel: 'icon', type: 'image/png', href: '/porichoy.favicon.png' },
    { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap' }
  ]
})
</script>
<style>
body { font-family: 'Inter', system-ui, -apple-system, sans-serif; }
</style>