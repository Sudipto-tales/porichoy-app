<script setup>
import Nav from '~/components/nav.vue'
import Footer from '~/components/footer.vue'

const config = useRuntimeConfig()

useSeoMeta({
  title: `Sector Offline | ${config.public.appName}`,
  description: 'The requested architectural node is currently unreachable.'
})

useHead({
  link: [
    { rel: 'icon', type: 'image/png', href: '/porichoy.favicon.png' },
    { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css' }
  ]
})
</script>

<template>
  <div class="relative min-h-screen flex flex-col bg-[#FDFDFD] text-[#1A1A1A] font-sans overflow-hidden selection:bg-yellow-400">
    
    <!-- Subtle Grid Background -->
    <div class="absolute inset-0 z-0 opacity-[0.03] pointer-events-none blueprint-lines"></div>

    <Nav class="relative z-50" />

    <!-- MAIN SECTION -->
    <main class="relative z-10 flex flex-1 items-center justify-center px-6 sm:px-10 lg:px-20 py-16 sm:py-20 lg:py-28">
      
      <div class="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 lg:gap-24 items-center">

        <!-- LEFT SIDE (IoT Visual) -->
        <div class="relative flex justify-center items-center h-[280px] sm:h-[380px] md:h-[480px]">

          <!-- IoT Background Image -->
          <img 
            src="/image/404-nobg.png"
            alt="IoT Network Grid"
            class="absolute w-[85%] max-w-[500px] animate-float pointer-events-none"
          />

          <!-- Rotating Ring -->
          <div class="absolute w-[220px] sm:w-[300px] md:w-[380px] h-[220px] sm:h-[300px] md:h-[380px] border border-yellow-400/40 rounded-full animate-spin-slow"></div>

          <!-- Vertical Scan Line -->
          <div class="absolute w-[2px] h-[100px] sm:h-[150px] md:h-[200px] bg-gradient-to-t from-yellow-400 to-transparent animate-scan"></div>

          <!-- Center Text -->
          <!-- <div class="relative z-10 text-center">
            <span class="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tight text-black/10">
              404
            </span>
            <p class="text-[10px] font-black uppercase tracking-[0.4em] mt-2">
              Node Lost
            </p>
          </div> -->
        </div>

        <!-- RIGHT SIDE (Content) -->
        <div class="space-y-8 md:space-y-10 lg:space-y-12 text-center lg:text-left">
          
          <div class="space-y-4">
            <div class="inline-block px-3 py-1 bg-black text-white text-[9px] font-black uppercase tracking-widest">
              Error Sequence: 0x404
            </div>

            <h1 class="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black leading-[1.05] tracking-tight">
              BEYOND THE <br />
              <span class="text-yellow-500">GRID.</span>
            </h1>
          </div>

          <p class="text-sm md:text-base font-medium leading-relaxed opacity-60 max-w-md mx-auto lg:mx-0">
            The path you followed led to a structural void. Our scanners cannot locate the requested identity component in this sector.
          </p>

          <!-- ACTION BUTTONS -->
          <div class="flex flex-col sm:flex-row gap-6 sm:gap-8 justify-center lg:justify-start pt-4">
            
            <NuxtLink to="/" class="flex items-center gap-4 group">
              <div class="w-10 h-10 rounded-full bg-yellow-400 flex items-center justify-center transition-transform group-hover:scale-110">
                <i class="fa-solid fa-arrow-right -rotate-45 group-hover:rotate-0 transition-transform"></i>
              </div>
              <span class="text-xs font-black uppercase tracking-widest border-b-2 border-transparent group-hover:border-black transition-all">
                Execute: Return_Home
              </span>
            </NuxtLink>

            <button @click="$router.back()" class="flex items-center gap-4 group">
              <div class="w-10 h-10 rounded-full border border-black/10 flex items-center justify-center transition-transform group-hover:border-black">
                <i class="fa-solid fa-undo text-[10px] group-hover:-rotate-90 transition-transform"></i>
              </div>
              <span class="text-xs font-black uppercase tracking-widest border-b-2 border-transparent group-hover:border-black transition-all">
                Reverse: Previous_Node
              </span>
            </button>

          </div>
        </div>

      </div>

      <!-- Side Label -->
      <div class="absolute right-[-3rem] top-1/2 -rotate-90 hidden xl:block">
        <span class="text-[10px] font-black uppercase tracking-[1em] opacity-10">
          Identity Architecture System
        </span>
      </div>

    </main>

    <Footer class="relative z-50 mt-auto" />
  </div>
</template>

<style scoped>

/* Subtle Grid */
.blueprint-lines {
  background-image:
    linear-gradient(to right, rgba(0,0,0,0.08) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(0,0,0,0.08) 1px, transparent 1px);
  background-size: 100px 100px;
}

/* Slow Spin */
.animate-spin-slow {
  animation: spin 12s linear infinite;
}

/* Floating Image */
.animate-float {
  animation: float 6s ease-in-out infinite;
}

/* Scan Line */
.animate-scan {
  animation: scan 3s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

@keyframes float {
  0% { transform: translateY(0px); }
  50% { transform: translateY(-15px); }
  100% { transform: translateY(0px); }
}

@keyframes scan {
  0% { transform: translateY(-100%); opacity: 0; }
  50% { opacity: 1; }
  100% { transform: translateY(100%); opacity: 0; }
}

h1 {
  word-spacing: -0.1em;
}

</style>