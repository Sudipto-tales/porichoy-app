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

useSeoMeta({
  title: `${config.public.appName} - Coming Soon`,
  description:
    'The new standard for professional identities is launching soon.',
  ogTitle: `${config.public.appName} - Coming Soon`,
  ogDescription:
    'The new standard for professional identities is launching soon.',
  ogImage: '/porichoy.og-image.png'
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
    class="relative min-h-screen flex flex-col bg-[#FDFDFD] text-[#1A1A1A] font-sans overflow-x-hidden selection:bg-yellow-400 selection:text-black">

    <!-- Background Effects -->
    <div
      class="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]">
    </div>

    <div
      class="absolute top-[-5%] right-[-5%] w-[40%] h-[40%] bg-yellow-200/20 rounded-full blur-[120px]">
    </div>

    <!-- Nav -->
    <Nav class="shrink-0" :navItems="{ comingSoon: true, betaAccess: true }" />

    <!-- Main Content -->
    <main
      class="relative z-10 flex flex-col flex-grow w-full max-w-7xl mx-auto px-6 md:px-12 py-12">

      <!-- Header Section -->
      <div
        class="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 mb-10">

        <div class="w-full lg:w-3/4">
          <div class="flex items-center gap-3 mb-4">
            <div class="h-[1px] w-10 bg-[#1A1A1A]"></div>
            <span
              class="text-[10px] font-black uppercase tracking-[0.4em] opacity-40">
              Identity Architecture
            </span>
          </div>

          <h1
            class="text-[clamp(2rem,5vw,4rem)] font-[900] leading-[0.9] tracking-tighter">
            THE NEW<br />
            <span class="relative inline-block mt-2">
              STANDARD
              <span
                class="absolute bottom-1 left-0 w-full h-[15%] bg-yellow-400 -z-10 opacity-70"></span>
            </span>
          </h1>
        </div>

        <p
          class="hidden lg:block w-full lg:w-1/4 text-sm font-medium leading-relaxed opacity-50 border-l border-black/10 pl-6 italic">
          Reimagining professional presence. The countdown to
          <span class="font-bold">{{ config.public.appName }}</span>
          is live.
        </p>

      </div>

      <!-- Countdown Grid -->
      <div
        class="grid grid-cols-2 lg:grid-cols-4 gap-6 min-h-[350px] lg:min-h-[250px]">

        <!-- Days -->
        <div
          class="col-span-2 row-span-1 lg:row-span-2 bg-[#1A1A1A] text-white rounded-[2rem] p-10 flex flex-col justify-between shadow-2xl">

          <span class="text-[10px] font-black uppercase tracking-widest opacity-40">
            Days Remaining
          </span>

          <div
            class="text-[clamp(4rem,8vw,8rem)] font-black leading-none tracking-tighter tabular-nums">
            {{ countdown.days }}
          </div>

          <div class="flex justify-between items-end">
            <div
              class="px-3 py-1 bg-yellow-400 text-black text-[9px] font-black rounded-full uppercase">
              Phase 01
            </div>

            <span
              class="text-[9px] font-bold opacity-30 tracking-widest uppercase italic">
              EST. June 2026
            </span>
          </div>

        </div>

        <!-- Hours -->
        <div
          class="bg-white border border-[#1A1A1A]/5 rounded-[2rem] p-8 flex flex-col justify-between">
          <span class="text-[9px] font-black opacity-40 uppercase tracking-widest">
            Hours
          </span>
          <div class="text-6xl font-[900] tracking-tighter">
            {{ countdown.hours }}
          </div>
        </div>

        <!-- Minutes -->
        <div
          class="bg-[#F5F5F5] rounded-[2rem] p-8 flex flex-col justify-between">
          <span class="text-[9px] font-black opacity-40 uppercase tracking-widest">
            Minutes
          </span>
          <div class="text-6xl font-[900] tracking-tighter text-yellow-600">
            {{ countdown.mins }}
          </div>
        </div>

        <!-- Seconds -->
        <div
          class="col-span-2 bg-yellow-400 rounded-[2rem] p-8 flex items-center justify-between">

          <div>
            <span class="text-[10px] font-black uppercase opacity-60 tracking-widest">
              Seconds
            </span>
            <div class="text-7xl font-black tracking-tighter tabular-nums">
              {{ countdown.secs }}
            </div>
          </div>

          <i class="fa-solid fa-bolt text-8xl opacity-10 -rotate-12"></i>

        </div>

      </div>

      <!-- Bottom Section -->
      <div
        class="mt-12 flex flex-col sm:flex-row items-center justify-between gap-6 border-t border-black/5 pt-8">

        <div class="flex items-center gap-4">
          <div
            class="w-12 h-12 rounded-full border border-[#1A1A1A]/10 flex items-center justify-center animate-spin-slow">
            <i class="fa-solid fa-circle-notch text-[12px] opacity-30"></i>
          </div>

          <div>
            <p class="text-[10px] font-black uppercase tracking-[0.2em]">
              Architecture Status
            </p>
            <p class="text-xs font-bold text-yellow-600 flex items-center gap-2">
              <span
                class="w-1.5 h-1.5 rounded-full bg-yellow-500 animate-pulse"></span>
              Syncing Nodes...
            </p>
          </div>
        </div>

        <NuxtLink
          to="/"
          class="group w-full sm:w-auto flex items-center justify-center gap-4 bg-[#1A1A1A] text-white px-10 py-4 rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] hover:bg-yellow-400 hover:text-black transition-all duration-300 shadow-xl active:scale-95">
          Secure Early Access
          <i
            class="fa-solid fa-arrow-right text-[10px] group-hover:translate-x-2 transition-transform"></i>
        </NuxtLink>

      </div>

    </main>

    <!-- Footer -->
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
</style>