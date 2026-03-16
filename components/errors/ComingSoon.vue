<template>
  <div class="relative flex flex-col items-center justify-center min-h-screen bg-[#0c0c14] text-white overflow-hidden selection:bg-blue-500/30 p-6">
    
    <!-- Background Grid -->
    <div class="absolute inset-0 opacity-[0.04] pointer-events-none" style="background-image: linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px); background-size: 80px 80px;"></div>

    <!-- Glow -->
    <div class="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[150px]"></div>

    <div class="relative z-10 max-w-lg text-center">

      <!-- Icon -->
      <div class="mx-auto mb-8 relative">
        <div class="absolute inset-0 w-32 h-32 mx-auto border-2 border-blue-500/10 rounded-full animate-ping"></div>
        <div class="relative w-28 h-28 mx-auto bg-white/[0.03] border border-white/[0.08] rounded-3xl flex items-center justify-center animate-float">
          <i :class="[icon, 'text-5xl text-blue-400/60']"></i>
        </div>
      </div>

      <!-- Badge -->
      <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.06] mb-6">
        <span class="h-1.5 w-1.5 rounded-full bg-blue-400 animate-pulse"></span>
        <span class="text-[9px] font-black uppercase tracking-[0.4em] text-white/30">{{ badge }}</span>
      </div>

      <h1 class="text-5xl md:text-7xl font-black tracking-tighter leading-[0.85] mb-6">
        <slot name="title">
          COMING<br>
          <span class="text-blue-400 italic">SOON.</span>
        </slot>
      </h1>

      <p class="text-base text-white/30 leading-relaxed max-w-sm mx-auto mb-10">
        {{ description }}
      </p>

      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <NuxtLink :to="backTo"
          class="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-white/[0.06] border border-white/[0.08] rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] text-white/60 hover:text-white hover:bg-white/[0.1] transition-all">
          <i class="fas fa-arrow-left text-[10px] group-hover:-translate-x-1 transition-transform"></i>
          {{ backLabel }}
        </NuxtLink>
        <NuxtLink v-if="showDashboard" to="/dashboard"
          class="inline-flex items-center justify-center gap-3 px-8 py-4 bg-blue-600 rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] text-white hover:bg-blue-500 transition-all shadow-lg shadow-blue-600/20">
          Go to Dashboard
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  icon: { type: String, default: 'fas fa-rocket' },
  badge: { type: String, default: 'Status: Building' },
  description: { type: String, default: 'This feature is under construction. We\'re building something incredible for you.' },
  backTo: { type: String, default: '/dashboard' },
  backLabel: { type: String, default: 'Go Back' },
  showDashboard: { type: Boolean, default: false },
})
</script>

<style scoped>
@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-16px); }
}
.animate-float { animation: float 5s ease-in-out infinite; }
</style>
