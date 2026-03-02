<script setup>
import Nav from '~/components/nav.vue'
import Footer from '~/components/footer.vue'

const config = useRuntimeConfig()

// SEO Meta
useSeoMeta({
  title: `Internal Calibration | ${config.public.appName}`,
  description: "It's not you, it's us. We are currently stabilizing our structural node."
})

// Loading Lottie via CDN for immediate use
useHead({
  script: [
    { 
      src: 'https://unpkg.com/@dotlottie/player-component@latest/dist/dotlottie-player.mjs', 
      type: 'module' 
    }
  ],
  link: [
    { rel: 'icon', type: 'image/png', href: '/porichoy.favicon.png' },
    { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css' }
  ]
})
</script>

<template>
  <div class="relative min-h-screen flex flex-col bg-[#FDFDFD] text-[#1A1A1A] font-sans selection:bg-indigo-100">
    
    <div class="absolute inset-0 z-0 opacity-[0.04] pointer-events-none blueprint-fine"></div>

    <Nav class="relative z-50 border-b border-gray-100 bg-white/60 backdrop-blur-xl" />

    <main class="relative z-10 flex flex-1 flex-col items-center justify-center px-6 py-12">
      
      <div class="relative mb-16 group">
        <div class="absolute inset-0 -m-8 border border-gray-100 rounded-full animate-pulse-slow"></div>
        <div class="absolute inset-0 -m-16 border border-gray-50 rounded-full animate-spin-slow opacity-50"></div>
        
        <div class="w-56 h-56 md:w-72 md:h-72 flex items-center justify-center relative bg-white rounded-full shadow-2xl shadow-gray-100 border border-gray-50">
          <img 
            src="/image/sand-clock-nobg.png" >
        </img>
          
          <div class="absolute -bottom-4 bg-gray-900 text-white text-[8px] font-black uppercase tracking-[0.4em] px-4 py-1.5 rounded-full">
            Status_Offline
          </div>
        </div>
      </div>

      <div class="max-w-xl text-center space-y-10">
        <div class="space-y-4">
          <p class="text-[10px] font-black uppercase tracking-[0.5em] text-indigo-500">System Handshake Interrupted</p>
          
          <h1 class="text-4xl md:text-6xl font-black tracking-tighter leading-[0.85] text-gray-900">
            IT’S NOT YOU. <br />
            <span class="text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-400">IT’S US.</span>
          </h1>
        </div>

        <p class="text-base md:text-lg text-gray-500 font-medium leading-relaxed max-w-xl mx-auto">
          Our internal foundation is currently undergoing essential calibration. Architectural synchronization will be restored within moments.
        </p>

        <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button @click="$router.go(0)" class="group min-w-[240px] px-10 py-5 bg-gray-900 text-white font-black text-[10px] uppercase tracking-[0.3em] hover:bg-indigo-600 transition-all shadow-2xl shadow-gray-200 flex items-center justify-center gap-4">
            Try Reconnecting
            <i class="fas fa-sync-alt text-[8px] group-hover:rotate-180 transition-transform duration-700"></i>
          </button>
          
          <button class="flex items-center gap-4 group transition-all">
            <div class="h-10 w-10 rounded-full border border-gray-200 flex items-center justify-center group-hover:border-gray-900 transition-all">
              <i class="fas fa-headset text-[10px] text-gray-400 group-hover:text-indigo-600"></i>
            </div>
            <span class="text-[10px] font-black uppercase tracking-[0.2em] border-b border-transparent group-hover:border-gray-900 pb-1">
              Contact Technical Ops
            </span>
          </button>
        </div>
      </div>

      <div class="absolute right-12 bottom-12 hidden xl:block">
        <div class="flex flex-col items-end opacity-20">
          <span class="text-[9px] font-bold uppercase tracking-[0.2em]">Node: Mainframe_001</span>
          <span class="text-[9px] font-bold uppercase tracking-[0.2em]">Region: Sector_Delta</span>
        </div>
      </div>

    </main>

    <Footer class="relative z-50 mt-auto border-t border-gray-100" />
  </div>
</template>

<style scoped>
/* Fine blueprint grid that fits the professional theme */
.blueprint-fine {
  background-image:
    linear-gradient(to right, rgba(0,0,0,0.06) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(0,0,0,0.06) 1px, transparent 1px);
  background-size: 80px 80px;
}

/* Sophisticated animations for a premium feel */
.animate-spin-slow {
  animation: spin 40s linear infinite;
}

.animate-pulse-slow {
  animation: pulse-ring 6s ease-in-out infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

@keyframes pulse-ring {
  0%, 100% { transform: scale(1); opacity: 0.1; }
  50% { transform: scale(1.05); opacity: 0.3; }
}

h1 {
  word-spacing: -0.1em;
}

/* Custom scrollbar for professional feel */
::-webkit-scrollbar {
  width: 5px;
}
::-webkit-scrollbar-track {
  background: transparent;
}
::-webkit-scrollbar-thumb {
  background: #e5e7eb;
  border-radius: 10px;
}
</style>