<template>
  <div class="relative min-h-screen flex flex-col bg-[#FDFDFD] text-[#1A1A1A] font-sans overflow-hidden selection:bg-indigo-100">
    
    <div class="absolute inset-0 z-0 opacity-[0.04] pointer-events-none blueprint-grid"></div>

    <Nav class="relative z-50 border-b border-gray-100 bg-white/50 backdrop-blur-md" />

    <main class="relative z-10 flex flex-1 items-center justify-center px-6 py-20">
      
      <div class="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-24 items-center">

        <div class="relative flex justify-center items-center h-[300px] md:h-[500px]">
          
          <span class="absolute text-[12rem] md:text-[20rem] font-black text-black/[0.03] select-none tracking-tighter">
            404
          </span>

          <div class="relative w-64 h-64 md:w-80 md:h-80 flex items-center justify-center">
            <div class="absolute inset-0 border-2 border-indigo-600/20 rounded-full animate-ping"></div>
            <div class="absolute inset-8 border border-gray-200 rounded-full animate-pulse"></div>
            
            <div class="relative z-10 bg-white p-8 rounded-[2.5rem] shadow-2xl border border-gray-50 animate-float">
              <i class="fas fa-link-slash text-5xl md:text-6xl text-indigo-600"></i>
            </div>

            <div class="absolute -bottom-10 flex flex-col items-center">
               <span class="text-[9px] font-black uppercase tracking-[0.4em] text-gray-400">Node_Status: Unreachable</span>
               <div class="h-12 w-[1px] bg-gradient-to-b from-gray-200 to-transparent mt-2"></div>
            </div>
          </div>
        </div>

        <div class="space-y-10 text-center lg:text-left">
          
          <div class="space-y-4">
            <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-900 text-white">
              <span class="h-1.5 w-1.5 rounded-full bg-indigo-400 animate-pulse"></span>
              <span class="text-[9px] font-black uppercase tracking-widest">Error Sequence: 0x404</span>
            </div>

            <h1 class="text-5xl sm:text-6xl md:text-8xl font-black leading-[0.9] tracking-tighter">
              BEYOND THE <br />
              <span class="text-indigo-600">GRID.</span>
            </h1>

            <p class="text-base md:text-lg font-medium leading-relaxed text-gray-500 max-w-md mx-auto lg:mx-0">
              The structural component you are looking for has been moved or de-indexed from our architectural database.
            </p>
          </div>

          <div class="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start pt-4">
            
            <NuxtLink to="/" class="group flex items-center gap-4 px-8 py-4 bg-gray-900 text-white font-black text-[10px] uppercase tracking-[0.3em] hover:bg-indigo-600 transition-all shadow-xl shadow-indigo-100">
              Return_Home
              <i class="fas fa-arrow-right text-[8px] group-hover:translate-x-1 transition-transform"></i>
            </NuxtLink>

            <button @click="$router.back()" class="flex items-center gap-4 px-8 py-4 border border-gray-200 hover:border-black transition-all group">
              <i class="fas fa-undo text-[10px] text-gray-400 group-hover:text-black"></i>
              <span class="text-[10px] font-black uppercase tracking-[0.3em]">Previous_Node</span>
            </button>

          </div>
        </div>

      </div>

      <div class="absolute right-[-3rem] top-1/2 -rotate-90 hidden xl:block">
        <span class="text-[10px] font-black uppercase tracking-[1em] opacity-10">
          Porichoy Identity Architecture
        </span>
      </div>

    </main>

    <Footer class="relative z-50 mt-auto border-t border-gray-100" />
  </div>
</template>

<script setup>
import Nav from '~/components/nav.vue'
import Footer from '~/components/footer.vue'

useHead({
  title: 'Node Not Found | 404',
  link: [{ rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css' }]
})
</script>

<style scoped>
.blueprint-grid {
  background-image: 
    linear-gradient(to right, rgba(0,0,0,0.1) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(0,0,0,0.1) 1px, transparent 1px);
  background-size: 80px 80px;
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-20px); }
}

.animate-float {
  animation: float 5s ease-in-out infinite;
}

h1 { word-spacing: -0.1em; }
</style>