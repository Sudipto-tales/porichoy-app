<template>
  <main class="flex-1 overflow-y-auto scroll-smooth custom-scrollbar">
    <div class="relative bg-white border-b border-gray-100 overflow-hidden">
      <div class="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-indigo-50/50 to-transparent"></div>

      <div class="max-w-[1600px] mx-auto px-6 lg:px-12 py-16 relative z-10">
        <div class="max-w-3xl">
          <!-- <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 mb-6">
            <i class="fas fa-sparkles text-indigo-500 text-[10px]"></i>
            <span class="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-600">Curated Showcases</span>
          </div>
          <h1 class="text-4xl md:text-6xl font-black text-gray-900 tracking-tighter leading-[0.9] mb-6">
            DIGITAL <br />
            <span class="text-indigo-600">FRONTIERS.</span>
          </h1>
          <p class="text-gray-500 text-lg font-medium max-w-xl mb-10 leading-relaxed">
            High-performance portfolio templates designed to turn your professional journey into a visual narrative.
          </p> -->
          <HeroIntro badge="Curated Showcases"
            description="High-performance portfolio templates designed to turn your professional journey into a visual narrative.">
            <template #title>
              DIGITAL <br />
              <span class="text-blue-600 italic">FRONTIERS.</span>
            </template>
          </HeroIntro>

          <div class="relative max-w-2xl group pt-5">
            <div class="absolute inset-0 bg-indigo-600/5 blur-xl group-focus-within:bg-indigo-600/10 transition-all">
            </div>
            <div
              class="relative flex items-center bg-white border-2 border-gray-100 group-focus-within:border-indigo-500 rounded-2xl p-2 transition-all shadow-sm">
              <div class="flex-1 flex items-center px-4">
                <i class="fas fa-search text-gray-400 mr-3"></i>
                <input v-model="searchQuery" type="text" placeholder="Search by industry, style, or tech stack..."
                  class="w-full bg-transparent border-none outline-none text-sm font-bold text-gray-700 placeholder:text-gray-300" />
              </div>
              <button
                class="px-6 py-3 bg-gray-900 text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-indigo-600 transition-all">
                Find Template
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="max-w-[1600px] mx-auto px-6 lg:px-12 py-12">
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div class="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
          <button v-for="filter in filters" :key="filter" @click="activeFilter = filter"
            :class="['px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest whitespace-nowrap border-2 transition-all',
              activeFilter === filter ? 'bg-indigo-600 border-indigo-600 text-white shadow-lg shadow-indigo-100' : 'bg-white border-gray-100 text-gray-400 hover:border-gray-300']">
            {{ filter }}
          </button>
        </div>
        <div class="flex items-center gap-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">
          <span>Sort By:</span>
          <select class="bg-transparent border-none outline-none text-gray-900 cursor-pointer">
            <option>Trending</option>
            <option>Newest</option>
            <option>Premium First</option>
          </select>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        <div v-for="(item, i) in filteredPortfolios" :key="i" class="group flex flex-col gap-5">
          <div
            class="relative aspect-[16/10] rounded-[2.5rem] overflow-hidden border-4 border-white shadow-sm hover:shadow-2xl hover:border-indigo-50 transition-all duration-500 bg-gray-100">
            <img :src="item.src" :alt="item.label"
              class="w-full h-full object-cover grayscale-[40%] group-hover:grayscale-0 transition-all duration-700" />

            <div class="absolute top-6 right-6">
              <div v-if="item.isPro"
                class="h-8 w-8 rounded-xl bg-gray-900 flex items-center justify-center text-yellow-400 shadow-xl">
                <i class="fas fa-crown text-xs"></i>
              </div>
            </div>

            <div
              class="absolute inset-0 bg-indigo-900/80 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col items-center justify-center p-8 text-center">
              <p class="text-indigo-200 text-[10px] font-black uppercase tracking-[0.3em] mb-4">Architecture v2.0</p>
              <h3 class="text-white text-2xl font-black mb-8 leading-tight">{{ item.label }}</h3>

              <div class="flex items-center gap-3">
                <NuxtLink :to="`/preview/${item.id}`"
                  class="px-6 py-3 bg-white text-gray-900 rounded-xl text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-transform">
                  Live Preview
                </NuxtLink>
                <button
                  class="h-11 w-11 rounded-xl bg-white/10 text-white hover:bg-white hover:text-indigo-600 transition-all">
                  <i class="fas fa-heart"></i>
                </button>
              </div>
            </div>
          </div>

          <div class="px-4 flex items-start justify-between">
            <div>
              <h4 class="font-black text-gray-900 text-lg uppercase tracking-tight">{{ item.label }}</h4>
              <div class="flex items-center gap-3 mt-1">
                <span class="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{{ item.category }}</span>
                <span class="h-1 w-1 rounded-full bg-gray-200"></span>
                <span class="text-[10px] font-bold text-indigo-500 uppercase tracking-widest">{{ item.tech }}</span>
              </div>
            </div>
            <div class="text-right">
              <span class="text-sm font-black text-gray-900">{{ item.price === 0 ? 'FREE' : `$${item.price}` }}</span>
            </div>
          </div>
        </div>
      </div>

      <div v-if="filteredPortfolios.length === 0" class="py-32 text-center">
        <i class="fas fa-search text-4xl text-gray-100 mb-6"></i>
        <h3 class="text-xl font-black text-gray-400 uppercase tracking-widest">No Matches Found</h3>
        <button @click="searchQuery = ''; activeFilter = 'All'"
          class="text-indigo-600 font-bold text-xs mt-4 underline underline-offset-4">Reset Scanners</button>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref } from 'vue'
import HeroIntro from '~/components/ui/HeroIntro.vue'
definePageMeta({
  layout: 'dashboard-layout'
})

const searchQuery = ref('')
const activeFilter = ref('All')
const filters = ['All', 'Minimal', 'Creative', 'Developer', 'Agency', 'Pro']

const portfolios = [
  { id: 'p1', label: 'NEON VOID', category: 'Creative', tech: 'Nuxt 3', price: 0, isPro: false, src: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=800&h=500&fit=crop' },
  { id: 'p2', label: 'SILICON GHOST', category: 'Developer', tech: 'Tailwind', price: 12, isPro: true, src: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=500&fit=crop' },
  { id: 'p3', label: 'ECHO STUDIO', category: 'Agency', tech: 'GSAP', price: 0, isPro: false, src: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=500&fit=crop' },
  { id: 'p4', label: 'RAW BRUTALIST', category: 'Minimal', tech: 'Vue 3', price: 15, isPro: true, src: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=500&fit=crop' },
  { id: 'p5', label: 'DARK MATTER', category: 'Creative', tech: 'Three.js', price: 19, isPro: true, src: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?w=800&h=500&fit=crop' },
  { id: 'p6', label: 'WHITE SPACE', category: 'Minimal', tech: 'CSS Grid', price: 0, isPro: false, src: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&h=500&fit=crop' },
]

const filteredPortfolios = computed(() => {
  return portfolios.filter(p => {
    const matchesSearch = p.label.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      p.tech.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchesFilter = activeFilter.value === 'All' || p.category === activeFilter.value || (activeFilter.value === 'Pro' && p.isPro)
    return matchesSearch && matchesFilter
  })
})

const config = useRuntimeConfig()
useSeoMeta({
  title: `Portfolio Templates — ${config.public.appName}`,
  description: 'Deploy high-end digital showcases in seconds.'
})
</script>

<style scoped>
.no-scrollbar::-webkit-scrollbar {
  display: none;
}

.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

main {
  background-image: radial-gradient(#e5e7eb 0.5px, transparent 0.5px);
  background-size: 30px 30px;
}

h1 {
  word-spacing: -0.15em;
}
</style>