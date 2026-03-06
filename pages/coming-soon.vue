<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

definePageMeta({
  layout: 'dashboard-layout'
})

const config = useRuntimeConfig()

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
  title: `${config.public.appName} — System Launch`,
  description: 'Identity infrastructure is deploying soon.'
})
</script>

<template>
  <main class="flex-1 overflow-y-auto bg-[#FAFAFA] relative">

    <!-- Blueprint Background -->
    <div class="absolute inset-0 opacity-[0.03] pointer-events-none blueprint-pattern"></div>

    <div class="max-w-[1600px] mx-auto px-6 lg:px-12 py-20 relative z-10">

      <!-- Hero + Countdown -->
      <div class="grid lg:grid-cols-2 gap-20 items-center mb-24">

        <!-- LEFT SIDE -->
        <div>

          <div class="flex items-center gap-4 mb-6">
            <div class="h-[1px] w-12 bg-blue-600"></div>
            <span class="text-[10px] font-black uppercase tracking-[0.4em] text-gray-400">
              Identity Architecture
            </span>
          </div>

          <h1 class="text-5xl md:text-7xl font-black tracking-tighter leading-[0.85] text-gray-900">
            SYSTEM<br />
            <span class="text-blue-600 italic">INITIALIZING</span>
          </h1>

          <p class="mt-8 max-w-xl text-gray-400 text-base leading-relaxed font-medium">
            The next generation of professional identity is under construction.
            <span class="text-gray-800 font-bold">{{ config.public.appName }}</span>
            deploys June 2026.
          </p>

        </div>

        <!-- RIGHT SIDE - Countdown -->
        <div class="grid grid-cols-2 gap-6">

          <!-- Days -->
          <div class="col-span-2 bg-gray-900 text-white p-10 rounded-3xl relative overflow-hidden">

            <div class="absolute inset-x-0 h-[1px] bg-blue-500/30 top-0 animate-scan"></div>

            <span class="text-[10px] uppercase tracking-widest opacity-40 font-black">
              Days Remaining
            </span>

            <div class="text-[clamp(3rem,6vw,5rem)] font-black tracking-tighter mt-4 tabular-nums">
              {{ countdown.days }}
            </div>

            <div class="absolute bottom-6 right-6 text-[9px] opacity-20 uppercase font-bold">
              Phase 01
            </div>

          </div>

          <!-- Hours -->
          <div class="bg-white border border-gray-100 rounded-3xl p-8 flex flex-col justify-between shadow-sm">
            <span class="text-[9px] font-black uppercase tracking-widest text-gray-400">
              Hours
            </span>
            <div class="text-4xl font-black tracking-tighter text-gray-900">
              {{ countdown.hours }}
            </div>
          </div>

          <!-- Minutes -->
          <div class="bg-blue-50 rounded-3xl p-8 flex flex-col justify-between">
            <span class="text-[9px] font-black uppercase tracking-widest text-blue-400">
              Minutes
            </span>
            <div class="text-4xl font-black tracking-tighter text-blue-600">
              {{ countdown.mins }}
            </div>
          </div>

          <!-- Seconds -->
          <div class="col-span-2 bg-blue-600 text-white rounded-3xl p-8 flex flex-col justify-between">
            <span class="text-[9px] font-black uppercase tracking-widest opacity-70">
              Seconds
            </span>
            <div class="text-4xl font-black tracking-tighter tabular-nums">
              {{ countdown.secs }}
            </div>
          </div>

        </div>

      </div>

      <!-- Bottom CTA -->
      <div class="flex flex-col md:flex-row justify-between items-center gap-8 border-t border-gray-100 pt-12">

        <div>
          <p class="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 mb-2">
            Deployment Status
          </p>
          <p class="text-sm font-bold text-blue-600 flex items-center gap-2">
            <span class="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></span>
            Synchronizing Identity Nodes...
          </p>
        </div>

        <NuxtLink
          to="/"
          class="px-12 py-4 bg-gray-900 text-white rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-blue-600 transition-all duration-300 shadow-xl hover:shadow-blue-200 active:scale-95"
        >
          Secure Early Access
        </NuxtLink>

      </div>

    </div>
  </main>
</template>

<style scoped>
.blueprint-pattern {
  background-image:
    linear-gradient(to right, #2563eb 1px, transparent 1px),
    linear-gradient(to bottom, #2563eb 1px, transparent 1px);
  background-size: 120px 120px;
}

@keyframes scan {
  0% { top: 0; opacity: 0; }
  50% { opacity: 1; }
  100% { top: 100%; opacity: 0; }
}

.animate-scan {
  animation: scan 4s ease-in-out infinite;
}
</style>