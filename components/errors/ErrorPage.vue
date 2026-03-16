<template>
  <div class="relative flex flex-col items-center justify-center min-h-screen bg-[#0c0c14] text-white overflow-hidden selection:bg-blue-500/30 p-6">
    
    <!-- Background Grid -->
    <div class="absolute inset-0 opacity-[0.04] pointer-events-none" style="background-image: linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px); background-size: 80px 80px;"></div>

    <!-- Glow -->
    <div class="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-red-600/8 rounded-full blur-[150px]"></div>

    <div class="relative z-10 max-w-2xl w-full">

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

        <!-- Visual -->
        <div class="flex justify-center">
          <div class="relative">
            <span class="absolute text-[12rem] font-black text-white/[0.02] select-none tracking-tighter -top-10 -left-8">
              {{ code }}
            </span>
            <div class="relative z-10 bg-white/[0.03] border border-white/[0.08] p-10 rounded-3xl animate-float">
              <i :class="[icon, 'text-6xl', iconColor]"></i>
            </div>
            <div class="absolute -bottom-8 left-1/2 -translate-x-1/2">
              <span class="text-[9px] font-black uppercase tracking-[0.4em] text-white/15">{{ statusLabel }}</span>
            </div>
          </div>
        </div>

        <!-- Content -->
        <div class="text-center lg:text-left space-y-6">

          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.06]">
            <span class="h-1.5 w-1.5 rounded-full animate-pulse" :class="dotColor"></span>
            <span class="text-[9px] font-black uppercase tracking-[0.4em] text-white/30">Error: 0x{{ code }}</span>
          </div>

          <h1 class="text-5xl md:text-6xl font-black leading-[0.85] tracking-tighter">
            <slot name="title">
              <span class="text-white/90">BEYOND THE</span><br>
              <span :class="accentColor">GRID.</span>
            </slot>
          </h1>

          <p class="text-base text-white/30 leading-relaxed max-w-md">
            {{ description }}
          </p>

          <div class="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-2">
            <NuxtLink to="/"
              class="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-white/[0.06] border border-white/[0.08] rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] text-white/60 hover:text-white hover:bg-white/[0.1] transition-all">
              Return Home
              <i class="fas fa-arrow-right text-[10px] group-hover:translate-x-1 transition-transform"></i>
            </NuxtLink>
            <button @click="goBack"
              class="inline-flex items-center justify-center gap-3 px-8 py-4 border border-white/[0.06] rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] text-white/30 hover:text-white/60 hover:border-white/[0.12] transition-all">
              <i class="fas fa-undo text-[10px]"></i>
              Go Back
            </button>
          </div>
        </div>

      </div>
    </div>

    <!-- Side decoration -->
    <div class="absolute right-[-2rem] top-1/2 -rotate-90 hidden xl:block">
      <span class="text-[10px] font-black uppercase tracking-[1em] text-white/[0.03]">
        Porichoy Identity Architecture
      </span>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  code: { type: String, default: '404' },
  icon: { type: String, default: 'fas fa-link-slash' },
  iconColor: { type: String, default: 'text-blue-400/60' },
  statusLabel: { type: String, default: 'Node_Status: Unreachable' },
  dotColor: { type: String, default: 'bg-blue-400' },
  accentColor: { type: String, default: 'text-blue-400' },
  description: { type: String, default: 'The structural component you are looking for has been moved or de-indexed from our architectural database.' },
})

const router = useRouter()
function goBack() { router.back() }
</script>

<style scoped>
@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-20px); }
}
.animate-float { animation: float 5s ease-in-out infinite; }
</style>
