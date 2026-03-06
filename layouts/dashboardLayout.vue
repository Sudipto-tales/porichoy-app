<template>
    <div class="h-screen w-full bg-[#f8f9fc] flex flex-col overflow-hidden font-sans selection:bg-blue-100">

        <AppNavBar class="z-50 bg-white/80 backdrop-blur-md border-b border-gray-100"
            :profile="{ name: 'Sudipta', avatar: '/porichoy.favicon.png' }" />

        <div class="flex flex-1 overflow-hidden relative">
            <AppSideBar class="z-40 border-r border-gray-100 bg-white" />
            <slot />
        </div>
    </div>
</template>
<script setup>
import AppNavBar from '~/components/AppNavBar.vue'
import AppSideBar from '~/components/AppSideBar.vue'

useHead({
  link: [
    {
      rel: 'icon',
      type: 'image/png',
      href: '/porichoy.favicon.png'
    }
]})
</script>