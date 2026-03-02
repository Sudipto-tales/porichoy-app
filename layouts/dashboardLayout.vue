<template>
    <div class="h-screen w-full bg-[#f8f9fc] flex flex-col overflow-hidden font-sans selection:bg-blue-100">

        <Nav class="z-50 bg-white/80 backdrop-blur-md border-b border-gray-100"
            :profile="{ name: 'Sudipta', avatar: '/porichoy.favicon.png' }" />

        <div class="flex flex-1 overflow-hidden relative">
            <sideBar class="z-40 border-r border-gray-100 bg-white" />
            <slot />
        </div>
    </div>
</template>
<script setup>
import Nav from '~/components/nav.vue'
import sideBar from '~/components/sideBar.vue';
</script>