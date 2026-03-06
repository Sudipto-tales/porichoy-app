<template>
  <main class="flex-1 overflow-y-auto scroll-smooth custom-scrollbar">
    <div class="relative bg-[#fafafa] border-b border-gray-100">
      <div class="absolute inset-0 opacity-[0.03] pointer-events-none blueprint-pattern"></div>

      <div
        class="max-w-[1600px] mx-auto px-6 lg:px-12 py-10 relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-12">
        <div class="max-w-2xl">
          <HeroIntro badge="Precision Drafts"
            description="Architecturally sound resumes designed to pass through scanners and leave a lasting impression on humans.">
            <template #title>
              CURATE YOUR <br />
              <span class="text-blue-600 italic">LEGACY.</span>
            </template>
          </HeroIntro>
        </div>
        <div class="w-full max-w-md">
          <div
            class="bg-white p-6 rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100 relative overflow-hidden group">
            <div class="absolute inset-x-0 h-[1px] bg-blue-500/30 top-0 animate-scan z-0"></div>

            <div class="relative z-10 space-y-4">
              <label class="text-[10px] font-black text-gray-400 uppercase tracking-widest">Global Search</label>
              <div
                class="flex items-center border-b-2 border-gray-100 group-focus-within:border-blue-600 transition-colors pb-2">
                <input v-model="searchQuery" type="text" placeholder="e.g. Senior Software Engineer..."
                  class="w-full bg-transparent border-none outline-none text-sm font-bold text-gray-800 placeholder:text-gray-300" />
                <i class="fas fa-search text-gray-400"></i>
              </div>
              <div class="flex flex-wrap gap-2 pt-2">
                <span v-for="tag in ['Tech', 'Minimal', 'Modern']" :key="tag"
                  class="text-[9px] font-bold px-2 py-1 bg-gray-50 text-gray-500 rounded-md cursor-pointer hover:bg-blue-50 hover:text-blue-600 transition-all">
                  #{{ tag }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="max-w-[1600px] mx-auto px-6 lg:px-12 py-12">
      <div class="flex items-center justify-between border-b border-gray-100 mb-12">
        <div class="flex gap-10">
          <button v-for="cat in categories" :key="cat" @click="activeCategory = cat" :class="['pb-4 text-[11px] font-black uppercase tracking-widest transition-all relative',
            activeCategory === cat ? 'text-blue-600' : 'text-gray-400 hover:text-gray-900']">
            {{ cat }}
            <div v-if="activeCategory === cat"
              class="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 animate-in fade-in slide-in-from-left-2"></div>
          </button>
        </div>

        <div class="hidden md:flex items-center gap-6">
          <span class="text-[10px] font-bold text-gray-300 uppercase tracking-widest">{{ filteredResumes.length }}
            Templates
            Found</span>
        </div>
      </div>

      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
        <div v-for="(resume, i) in filteredResumes" :key="i" class="group space-y-4">
          <div
            class="relative aspect-[3/4] bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden group-hover:shadow-2xl group-hover:-translate-y-2 transition-all duration-500">
            <img :src="resume.src" :alt="resume.label" class="w-full h-full object-cover" />

            <div v-if="resume.isPro"
              class="absolute top-3 left-3 px-2 py-0.5 bg-yellow-400 text-[8px] font-black uppercase rounded shadow-sm">
              Pro
            </div>

            <div
              class="absolute inset-0 bg-gray-900/10 opacity-0 group-hover:opacity-100 transition-all flex flex-col items-center justify-end p-6">
              <NuxtLink :to="`/builder/${resume.id}`"
                class="w-full py-3 bg-white text-gray-900 text-[10px] font-black uppercase tracking-widest text-center shadow-xl hover:bg-blue-600 hover:text-white transition-all">
                Use Template
              </NuxtLink>
            </div>
          </div>

          <div class="text-center md:text-left">
            <h4 class="text-sm font-black text-gray-900 uppercase tracking-tight">{{ resume.label }}</h4>
            <div class="flex items-center justify-center md:justify-start gap-2 mt-1">
              <span class="text-[9px] font-bold text-gray-400 uppercase tracking-widest">{{ resume.style }}</span>
              <span class="h-1 w-1 bg-gray-200 rounded-full"></span>
              <span class="text-[9px] font-black" :class="resume.price === 0 ? 'text-green-500' : 'text-gray-900'">
                {{ resume.price === 0 ? 'FREE' : `$${resume.price}` }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref, computed } from 'vue'
import HeroIntro from '~/components/ui/HeroIntro.vue'
import { useTemplateFilter } from '~/composables/useTemplateFilter.js'
definePageMeta({
  layout: 'dashboard-layout'
})

const searchQuery = ref('')
const activeCategory = ref('All Templates')
const categories = ['All Templates', 'ATS Friendly', 'Creative', 'Executive', 'Minimal']

const resumes = ref([
  { id: 'r1', label: 'LINEAR ARCHITECT', style: 'ATS Friendly', price: 0, isPro: false, src: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=400&h=560&fit=crop' },
  { id: 'r2', label: 'SWISS MODERN', style: 'Minimal', price: 9, isPro: true, src: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=400&h=560&fit=crop' },
  { id: 'r3', label: 'FORBES ELITE', style: 'Executive', price: 12, isPro: true, src: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=560&fit=crop' },
  { id: 'r4', label: 'TECH TITAN', style: 'Creative', price: 0, isPro: false, src: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=400&h=560&fit=crop' },
  { id: 'r5', label: 'NOIR MONO', style: 'Minimal', price: 0, isPro: false, src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=560&fit=crop' },
])


const { filtered: filteredResumes } =
  useTemplateFilter(resumes, searchQuery, activeCategory)

const config = useRuntimeConfig()
useSeoMeta({
  title: `Resume Templates — ${config.public.appName}`,
  description: 'Precision-engineered resume templates for every career stage.'
})
</script>

<style scoped>
.blueprint-pattern {
  background-image:
    linear-gradient(to right, #2563eb 1px, transparent 1px),
    linear-gradient(to bottom, #2563eb 1px, transparent 1px);
  background-size: 100px 100px;
}

@keyframes scan {
  0% {
    top: 0;
    opacity: 0;
  }

  50% {
    opacity: 1;
  }

  100% {
    top: 100%;
    opacity: 0;
  }
}

.animate-scan {
  animation: scan 3s ease-in-out infinite;
}

main {
  background-image: radial-gradient(#d1d5db 0.5px, transparent 0.5px);
  background-size: 24px 24px;
}

h1 {
  word-spacing: -0.1em;
}
</style>