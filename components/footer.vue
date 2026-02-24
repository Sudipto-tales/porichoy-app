<template>
    <footer
        class="relative z-30 p-8 lg:px-16 flex flex-col md:flex-row justify-between items-center text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] border-t border-gray-50 flex-shrink-0">
        <div class="flex gap-8">
            <a href="#" class="hover:text-black transition-colors">Facebook</a>
            <a href="#" class="hover:text-black transition-colors">X</a>
            <a href="#" class="hover:text-black transition-colors">Instagram</a>
        </div>
        <p class="text-black py-4 md:py-0">© {{ new Date().getFullYear() }} {{ config.public.appName }} Studios</p>
        <div class="flex gap-8">
            <a href="#" class="hover:text-black transition-colors">Legal</a>
            <a href="#" class="hover:text-black transition-colors">Privacy</a>
        </div>
    </footer>
</template>
<script setup>
import { ref } from 'vue'
const config = useRuntimeConfig()
</script>