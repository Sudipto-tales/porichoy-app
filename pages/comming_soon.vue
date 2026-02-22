<template>
    <div
        class="relative min-h-screen flex flex-col bg-[#0A0A0A] text-white font-sans overflow-x-hidden selection:bg-yellow-400 selection:text-black">

        <div class="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
            <div class="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-yellow-500/10 rounded-full blur-[120px]">
            </div>
            <div class="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] bg-white/5 rounded-full blur-[120px]"></div>
        </div>

        <nav class="relative z-30 flex justify-between items-center px-6 py-8 lg:px-16 flex-shrink-0">
            <div class="flex items-center gap-2 group cursor-pointer">
                <img src="/porichoy.favicon.png" alt="${{ config.public.appName }} Logo" class="w-10 h-10 md:w-10 md:h-10 object-contain" />
                <div class="flex items-center gap-1 group cursor-pointer">
                    <span class="text-xl font-black uppercase tracking-tighter">Porich</span>

                    <img src="/security.png" alt="Identity Icon"
                        class="w-5 h-5 md:w-6 md:h-6 object-contain inline-block -mt-1 transform group-hover:rotate-12 transition-transform" />

                    <span class="text-xl font-black uppercase tracking-tighter">y</span>
                </div>
            </div>
            <div class="hidden md:flex gap-8 text-[10px] font-bold uppercase tracking-[0.3em] text-gray-500">
                <span class="text-yellow-400">01. Coming Soon</span>
                <span class="hover:text-white cursor-help transition-colors">02. Beta Access</span>
            </div>
        </nav>

        <main class="relative z-10 flex-grow flex flex-col items-center justify-center px-6 text-center">

            <div
                class="mb-8 inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-[10px] font-black uppercase tracking-[0.2em]">
                <span class="relative flex h-2 w-2">
                    <span
                        class="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
                    <span class="relative inline-flex rounded-full h-2 w-2 bg-yellow-500"></span>
                </span>
                Deployment in Progress
            </div>

            <h1 class="text-2xl md:text-4xl lg:text-[4rem] font-black leading-none tracking-tighter mb-6">
                THE NEW <br />
                <span class="text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500">STANDARD.</span>
            </h1>

            <p class="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-12 font-medium leading-relaxed">
                We are rebuilding the digital architecture for professional identities.
                The countdown to <span class="text-white border-b border-yellow-400">{{ config.public.appName }}</span> has begun.
            </p>

            <div class="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mb-16 w-full max-w-3xl">
                <div v-for="(val, label) in countdown" :key="label" class="relative group">
                    <div
                        class="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm group-hover:border-yellow-400/50 transition-colors">
                        <div class="text-4xl md:text-5xl font-black mb-1">{{ val }}</div>
                        <div class="text-[10px] uppercase tracking-widest text-gray-500 font-bold">{{ label }}</div>
                    </div>
                </div>
            </div>

            <!-- <form @submit.prevent="handleSubmit" class="w-full max-w-md relative group">
                <div
                    class="flex flex-col sm:flex-row items-center p-1.5 bg-white/5 border border-white/10 rounded-2xl focus-within:border-white/30 transition-all">
                    <input v-model="email" type="email" placeholder="reserve@yourname.com"
                        class="flex-1 bg-transparent px-6 py-4 outline-none text-sm font-medium w-full text-white"
                        required />
                    <button
                        class="w-full sm:w-auto bg-white text-black px-8 py-4 rounded-xl text-sm font-black hover:bg-yellow-400 transition-all active:scale-95">
                        Secure Access
                    </button>
                </div>
                <p class="mt-4 text-[10px] text-gray-500 uppercase tracking-widest font-bold">
                    <i class="fa-solid fa-lock text-yellow-500 mr-2"></i> Private Beta. Limited Spots.
                </p>
            </form> -->
            <NuxtLink to="/"
                class="w-full sm:w-auto bg-white text-black px-8 py-4 rounded-xl text-sm font-black hover:bg-yellow-400 transition-all active:scale-95">
                Back to Home
            </NuxtLink>
        </main>

        <footer
            class="relative z-30 p-8 lg:px-16 flex flex-col md:flex-row justify-between items-center text-[9px] font-black text-gray-600 uppercase tracking-[0.3em] flex-shrink-0">
            <p>© {{ new Date().getFullYear() }} {{ config.public.appName }} Studios — All Rights Reserved</p>
            <div class="flex gap-8 mt-4 md:mt-0">
                <!-- <a href="#" class="hover:text-white transition-colors">Twitter (X)</a>
                <a href="#" class="hover:text-white transition-colors">LinkedIn</a> -->
                <a href="#" class="hover:text-white transition-colors">Inquiries</a>
            </div>
        </footer>
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
const config = useRuntimeConfig()

const email = ref('')
const launchDate = new Date('2026-06-01T00:00:00').getTime()

const countdown = ref({
    days: '00',
    hours: '00',
    mins: '00',
    secs: '00'
})

let timerInterval = null

const updateCountdown = () => {
    const now = new Date().getTime()
    const distance = launchDate - now

    if (distance < 0) {
        clearInterval(timerInterval)
        return
    }

    const d = Math.floor(distance / (1000 * 60 * 60 * 24))
    const h = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    const m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
    const s = Math.floor((distance % (1000 * 60)) / 1000)

    countdown.value = {
        days: d.toString().padStart(2, '0'),
        hours: h.toString().padStart(2, '0'),
        mins: m.toString().padStart(2, '0'),
        secs: s.toString().padStart(2, '0')
    }
}

onMounted(() => {
    updateCountdown()
    timerInterval = setInterval(updateCountdown, 1000)
})

onUnmounted(() => {
    clearInterval(timerInterval)
})

const handleSubmit = () => {
    alert(`Priority access confirmed for: ${email.value}`)
    email.value = ''
}

useSeoMeta({
    title: `${config.public.appName} - Coming Soon`,
    description: 'The new standard for professional identities is launching soon. Stay tuned for the revolution.',
    ogTitle: `${config.public.appName} - Coming Soon`,
    ogDescription: 'The new standard for professional identities is launching soon. Stay tuned for the revolution.',
    ogImage: '/porichoy.og-image.png',
})

useHead({
  meta: [
    {
      name: 'google-site-verification',
      content: config.public.googleSiteVerification
    }
  ],
  link: [
    {
      rel: 'icon',
      type: 'image/png',
      href: '/porichoy.favicon.png'
    },
    {
      rel: 'stylesheet',
      href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css'
    }
  ]
})
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;700;800;900&display=swap');

body {
    font-family: 'Plus Jakarta Sans', sans-serif;
    background-color: #0A0A0A;
}

/* Custom Scrollbar for a premium feel */
::-webkit-scrollbar {
    width: 6px;
}

::-webkit-scrollbar-track {
    background: #0A0A0A;
}

::-webkit-scrollbar-thumb {
    background: #222;
    border-radius: 10px;
}

::-webkit-scrollbar-thumb:hover {
    background: #444;
}
</style>