<script setup>
import Nav from '~/components/nav.vue'
import Footer from '~/components/footer.vue'

const config = useRuntimeConfig()

useSeoMeta({
  title: `Sector Unstable | ${config.public.appName}`,
  description: 'Incompatible versioning detected in the architectural node.'
})

useHead({
  link: [
    { rel: 'icon', type: 'image/png', href: '/porichoy.favicon.png' },
    { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css' }
  ]
})
</script>

<template>
  <div class="relative min-h-screen flex flex-col bg-[#FDFDFD] text-[#1A1A1A] font-sans overflow-hidden selection:bg-red-500 selection:text-white">
    
    <div class="absolute inset-0 z-0 opacity-[0.05] pointer-events-none blueprint-glitch"></div>

    <Nav class="relative z-50" />

    <main class="relative z-10 flex flex-1 items-center justify-center px-6 sm:px-10 lg:px-20 py-16 sm:py-20 lg:py-28">
      
      <div class="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 lg:gap-24 items-center">

        <div class="relative flex justify-center items-center h-[280px] sm:h-[380px] md:h-[480px]">

          <img 
            src="/image/404-nobg.png"
            alt="Corrupted Node"
            class="absolute w-[80%] max-w-[450px] grayscale brightness-50 contrast-125 opacity-20 pointer-events-none"
          />

          <div class="absolute w-[220px] sm:w-[300px] border-2 border-red-500/20 rounded-full animate-wobble"></div>
          <div class="absolute w-[240px] sm:w-[320px] border border-black/5 rounded-full animate-spin-slow"></div>
          
          <div class="relative z-10 flex flex-col items-center animate-pulse-fast">
            <i class="fa-solid fa-triangle-exclamation text-6xl sm:text-8xl text-red-600"></i>
            <span class="mt-4 text-[9px] font-black bg-red-600 text-white px-2 py-0.5 uppercase tracking-[0.3em]">Critical_Version_Mismatch</span>
          </div>

          <div class="absolute top-10 left-0 text-[8px] font-mono opacity-20 animate-float">01101001 01100111 01101110 01101001 01110011</div>
        </div>

        <div class="space-y-8 md:space-y-10 lg:space-y-12 text-center lg:text-left">
          
          <div class="space-y-4">
            <div class="inline-flex items-center gap-2 px-3 py-1 bg-red-50 border border-red-100">
              <span class="h-1.5 w-1.5 bg-red-600 rounded-full animate-ping"></span>
              <span class="text-red-600 text-[9px] font-black uppercase tracking-widest">Protocol Error: 505</span>
            </div>

            <h1 class="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black leading-[0.95] tracking-tight">
              STRUCTURAL <br />
              <span class="relative">
                VERSION. 
                <span class="absolute inset-0 bg-black animate-redact"></span>
              </span>
            </h1>
          </div>

          <p class="text-sm md:text-base font-medium leading-relaxed opacity-60 max-w-md mx-auto lg:mx-0 italic">
            "The architectural version requested by your client node is no longer supported by the central core. System integrity compromised."
          </p>

          <div class="flex flex-col sm:flex-row gap-6 sm:gap-8 justify-center lg:justify-start pt-4">
            
            <button @click="$router.go(0)" class="flex items-center gap-4 group">
              <div class="w-10 h-10 rounded-full bg-red-600 text-white flex items-center justify-center transition-transform group-hover:scale-110">
                <i class="fa-solid fa-sync group-hover:rotate-180 transition-transform duration-500"></i>
              </div>
              <span class="text-xs font-black uppercase tracking-widest border-b-2 border-transparent group-hover:border-red-600 transition-all">
                Attempt: System_Reboot
              </span>
            </button>

            <NuxtLink to="/" class="flex items-center gap-4 group">
              <div class="w-10 h-10 rounded-full border border-black/10 flex items-center justify-center transition-transform group-hover:border-black">
                <i class="fa-solid fa-shield-halved text-[10px] group-hover:scale-125 transition-transform"></i>
              </div>
              <span class="text-xs font-black uppercase tracking-widest border-b-2 border-transparent group-hover:border-black transition-all">
                Access: Safe_Node
              </span>
            </NuxtLink>

          </div>
        </div>

      </div>

      <div class="absolute left-6 bottom-10 hidden md:block font-mono text-[8px] opacity-30 space-y-1">
        <p>> [LOG] Requesting Identity_Handshake...</p>
        <p class="text-red-600">> [FAIL] HTTP_VERSION_NOT_SUPPORTED</p>
        <p>> [LOG] Retrying architectural bridge...</p>
      </div>

    </main>

    <Footer class="relative z-50 mt-auto" />
  </div>
</template>

<style scoped>
/* Glitched Blueprint Lines */
.blueprint-glitch {
  background-image:
    linear-gradient(to right, rgba(0,0,0,0.08) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(239,68,68,0.1) 1px, transparent 1px);
  background-size: 80px 80px;
}

/* Redaction Animation */
.animate-redact {
  animation: redact 4s steps(1) infinite;
}

/* Wobble ring */
.animate-wobble {
  animation: wobble 4s ease-in-out infinite;
}

.animate-spin-slow {
  animation: spin 15s linear infinite;
}

.animate-pulse-fast {
  animation: pulse 0.5s ease-in-out infinite;
}

@keyframes redact {
  0%, 100% { width: 0; }
  50% { width: 100%; }
}

@keyframes wobble {
  0%, 100% { transform: rotate(0deg) scale(1); }
  50% { transform: rotate(10deg) scale(1.05); border-color: rgba(239,68,68,0.5); }
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}
</style>