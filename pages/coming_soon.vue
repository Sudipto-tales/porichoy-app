<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import Nav from '~/components/nav.vue'
import Footer from '~/components/footer.vue'
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

<template>
    <div
        class="relative min-h-screen lg:h-screen flex flex-col bg-[#FDFDFD] text-[#1A1A1A] font-sans overflow-x-hidden selection:bg-yellow-400 selection:text-black">

        <div
            class="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]">
        </div>
        <div class="absolute top-[-5%] right-[-5%] w-[40%] h-[40%] bg-yellow-200/20 rounded-full blur-[120px]"></div>

        <Nav class="shrink-0" :navItems="{ comingSoon: true, betaAccess: true }" />

        <main
            class="relative z-10 flex flex-col lg:justify-center w-full max-w-7xl mx-auto px-6 md:px-12 py-8 lg:py-0 overflow-hidden">

            <div class="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 mb-8 lg:mb-6">
                <div class="w-full lg:w-3/4">
                    <div class="flex items-center gap-3 mb-4">
                        <div class="h-[1px] w-10 bg-[#1A1A1A]"></div>
                        <span class="text-[10px] font-black uppercase tracking-[0.4em] opacity-40">
                            Identity Architecture
                        </span>
                    </div>

                    <h1 class="text-[clamp(1.5rem,5vw,3rem)] font-[900] leading-[0.9] tracking-tighter">
                        THE NEW<br />
                        <span class="relative inline-block mt-2">
                            STANDARD
                            <span
                                class="absolute bottom-1 lg:bottom-3 left-0 w-full h-[15%] bg-yellow-400 -z-10 opacity-70"></span>
                        </span>
                    </h1>
                </div>

                <p
                    class="hidden lg:block w-full lg:w-1/4 text-sm font-medium leading-relaxed opacity-50 border-l border-black/10 pl-6 italic">
                    Reimagining professional presence. The countdown to
                    <span class="text-[#1A1A1A] font-bold">{{ config.public.appName }}</span>
                    is live.
                </p>
            </div>

            <!-- ✅ FIXED GRID HEIGHT -->
            <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-4 min-h-[350px] lg:min-h-[250px] lg:max-h-[0vh]">

                <!-- Days -->
                <div
                    class="col-span-2 row-span-1 lg:row-span-2 bg-[#1A1A1A] text-white rounded-[2rem] p-8 lg:p-10 flex flex-col justify-between shadow-2xl shadow-black/10 group transition-all duration-500 hover:shadow-black/20">
                    <span class="text-[10px] font-black uppercase tracking-widest opacity-40">
                        Days Remaining
                    </span>
                    <div
                        class="text-[clamp(4.5rem,10vw,9rem)] font-black leading-none tracking-tighter group-hover:scale-105 transition-transform duration-700 tabular-nums">
                        {{ countdown.days }}
                    </div>
                    <div class="flex justify-between items-end">
                        <div
                            class="px-3 py-1 bg-yellow-400 text-black text-[9px] font-black rounded-full uppercase tracking-tighter italic">
                            Phase 01
                        </div>
                        <span class="text-[9px] font-bold opacity-30 tracking-widest uppercase italic">
                            EST. June 2026
                        </span>
                    </div>
                </div>

                <!-- Hours -->
                <div
                    class="col-span-1 bg-white border border-[#1A1A1A]/5 rounded-[2rem] p-6 lg:p-8 flex flex-col justify-between shadow-sm hover:border-yellow-400/30 transition-colors">
                    <span class="text-[9px] font-black opacity-40 uppercase tracking-widest">
                        Hours
                    </span>
                    <div class="text-5xl lg:text-6xl font-[900] tracking-tighter">
                        {{ countdown.hours }}
                    </div>
                </div>

                <!-- Minutes -->
                <div
                    class="col-span-1 bg-[#F5F5F5] rounded-[2rem] p-6 lg:p-8 flex flex-col justify-between hover:bg-white border border-transparent hover:border-[#1A1A1A]/5 transition-all">
                    <span class="text-[9px] font-black opacity-40 uppercase tracking-widest">
                        Mins
                    </span>
                    <div class="text-5xl lg:text-6xl font-[900] tracking-tighter text-yellow-600">
                        {{ countdown.mins }}
                    </div>
                </div>

                <!-- Seconds -->
                <div
                    class="col-span-2 bg-yellow-400 rounded-[2rem] p-6 lg:p-8 flex items-center justify-between overflow-hidden relative group shadow-lg shadow-yellow-400/10">
                    <div class="relative z-10">
                        <span class="text-[10px] font-black uppercase opacity-60 tracking-widest">
                            Seconds
                        </span>
                        <div class="text-6xl lg:text-7xl font-black tracking-tighter tabular-nums">
                            {{ countdown.secs }}
                        </div>
                    </div>
                    <i
                        class="fa-solid fa-bolt text-7xl lg:text-8xl opacity-10 -rotate-12 group-hover:rotate-0 group-hover:scale-110 transition-transform duration-700"></i>
                </div>

            </div>

            <!-- Bottom Section -->
            <div
                class="mt-8 flex flex-col sm:flex-row items-center justify-between gap-6 shrink-0 border-t border-black/5 pt-8 lg:hidden">
                <div class="flex items-center gap-4">
                    <div
                        class="w-12 h-12 rounded-full border border-[#1A1A1A]/10 flex items-center justify-center animate-spin-slow">
                        <i class="fa-solid fa-circle-notch text-[12px] opacity-30"></i>
                    </div>
                    <div>
                        <p class="text-[10px] font-black uppercase tracking-[0.2em] leading-tight">
                            Architecture Status
                        </p>
                        <p class="text-xs font-bold text-yellow-600 flex items-center gap-2">
                            <span class="w-1.5 h-1.5 rounded-full bg-yellow-500 animate-pulse"></span>
                            Syncing Nodes...
                        </p>
                    </div>
                </div>

                <NuxtLink to="/"
                    class="group w-full sm:w-auto flex items-center justify-center gap-4 bg-[#1A1A1A] text-white px-10 py-4 rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] hover:bg-yellow-400 hover:text-black transition-all duration-300 shadow-xl shadow-black/5 active:scale-95">
                    Secure Early Access
                    <i class="fa-solid fa-arrow-right text-[10px] group-hover:translate-x-2 transition-transform"></i>
                </NuxtLink>

            </div>

        </main>

        <Footer class="shrink-0" />
    </div>
</template>

<style scoped>
.animate-spin-slow {
    animation: spin 10s linear infinite;
}

@keyframes spin {
    from {
        transform: rotate(0deg);
    }

    to {
        transform: rotate(360deg);
    }
}

/* Fixes for smaller laptop screens */
@media (max-height: 800px) {
    main {
        padding-top: 2rem;
        padding-bottom: 2rem;
    }

    .grid {
        min-height: 350px !important;
    }
}

@media (max-width: 1024px) {

    /* Allow scrolling on mobile if necessary */
    .min-h-screen {
        height: auto !important;
    }
}
</style>