<template>
  <main class="flex-1 overflow-y-auto scroll-smooth custom-scrollbar">
    <div class="max-w-[1400px] mx-auto px-6 lg:px-12 py-8">

      <section class="mb-8">
        <div class="flex items-center justify-between">
          <div>
            <div class="flex items-center gap-3 mb-1">
              <div class="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm shadow-md">S</div>
              <div>
                <h1 class="text-xl font-black" :style="{ color: 'var(--text-primary)' }">My Space</h1>
                <p class="text-xs" :style="{ color: 'var(--text-muted)' }">Your generated CVs and portfolios</p>
              </div>
            </div>
          </div>
          <NuxtLink to="/studio/resume-builder" class="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold uppercase tracking-wider transition-all shadow-lg shadow-blue-600/20">
            <i class="fas fa-plus text-xs"></i> New Resume
          </NuxtLink>
        </div>
      </section>

      <section class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div v-for="stat in stats" :key="stat.label" class="p-4 rounded-2xl" :style="{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border)' }">
          <p class="text-2xl font-black" :style="{ color: 'var(--text-primary)' }">{{ stat.value }}</p>
          <p class="text-xs font-medium mt-0.5" :style="{ color: 'var(--text-muted)' }">{{ stat.label }}</p>
        </div>
      </section>

      <div class="flex items-center gap-1 mb-6 rounded-2xl p-1 w-fit" :style="{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border)' }">
        <button v-for="tab in tabs" :key="tab.key" @click="activeTab = tab.key"
          :class="['px-5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all', activeTab === tab.key ? 'bg-blue-600 text-white shadow-sm' : '']"
          :style="activeTab !== tab.key ? { color: 'var(--text-muted)' } : {}">
          {{ tab.label }}
        </button>
      </div>

      <section v-if="activeTab === 'resumes'">
        <div v-if="myResumes.length === 0" class="flex flex-col items-center justify-center py-20 text-center">
          <div class="w-16 h-16 rounded-3xl bg-blue-500/10 flex items-center justify-center mb-4"><i class="fas fa-file-lines text-2xl text-blue-400/40"></i></div>
          <h3 class="font-bold mb-1" :style="{ color: 'var(--text-secondary)' }">No resumes yet</h3>
          <p class="text-sm mb-4" :style="{ color: 'var(--text-muted)' }">Generate your first resume from a template</p>
          <NuxtLink to="/studio/resume-builder" class="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold uppercase tracking-wider transition-all">Open Studio</NuxtLink>
        </div>
        <div v-else class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
          <div v-for="resume in myResumes" :key="resume.id" class="group relative rounded-2xl hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer"
            :style="{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border)' }">
            <div class="relative aspect-[3/4] overflow-hidden">
              <img :src="resume.src" :alt="resume.label" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div class="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
                <button class="w-9 h-9 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-sm flex items-center justify-center text-white"><i class="fas fa-download text-xs"></i></button>
                <button class="w-9 h-9 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-sm flex items-center justify-center text-white"><i class="fas fa-eye text-xs"></i></button>
                <button @click.stop="deleteItem('resume', resume.id)" class="w-9 h-9 rounded-xl bg-red-500/40 hover:bg-red-500 backdrop-blur-sm flex items-center justify-center text-white"><i class="fas fa-trash text-xs"></i></button>
              </div>
            </div>
            <div class="p-3">
              <p class="text-xs font-bold truncate" :style="{ color: 'var(--text-primary)' }">{{ resume.label }}</p>
              <p class="text-[10px] mt-0.5" :style="{ color: 'var(--text-muted)' }">{{ resume.generatedAt }}</p>
            </div>
          </div>
        </div>
      </section>

      <section v-if="activeTab === 'portfolios'">
        <div v-if="myPortfolios.length === 0" class="flex flex-col items-center justify-center py-20 text-center">
          <div class="w-16 h-16 rounded-3xl bg-purple-500/10 flex items-center justify-center mb-4"><i class="fas fa-palette text-2xl text-purple-400/40"></i></div>
          <h3 class="font-bold mb-1" :style="{ color: 'var(--text-secondary)' }">No portfolios yet</h3>
          <p class="text-sm mb-4" :style="{ color: 'var(--text-muted)' }">Generate your first portfolio from a template</p>
        </div>
        <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <div v-for="portfolio in myPortfolios" :key="portfolio.id" class="group relative rounded-2xl hover:shadow-xl transition-all duration-300 overflow-hidden"
            :style="{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border)' }">
            <div class="relative aspect-[16/9] overflow-hidden">
              <img :src="portfolio.src" :alt="portfolio.label" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
            <div class="p-4">
              <p class="text-sm font-bold" :style="{ color: 'var(--text-primary)' }">{{ portfolio.label }}</p>
              <p class="text-[10px] mt-0.5" :style="{ color: 'var(--text-muted)' }">{{ portfolio.generatedAt }}</p>
              <span v-if="portfolio.deployed" class="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">Live</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  </main>
</template>

<script setup>
import { ref } from 'vue'
definePageMeta({ layout: 'dashboard-layout' })

const activeTab = ref('resumes')
const tabs = [{ key: 'resumes', label: 'Resumes' }, { key: 'portfolios', label: 'Portfolios' }]

const myResumes = ref([
  { id: 1, label: 'Minimal Clean', generatedAt: 'Feb 24, 2026', src: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=400&h=560&fit=crop' },
  { id: 2, label: 'Developer Pro', generatedAt: 'Feb 20, 2026', src: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=560&fit=crop' },
])
const myPortfolios = ref([
  { id: 1, label: 'Design Folio', generatedAt: 'Feb 22, 2026', deployed: true, src: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=800&h=450&fit=crop' },
  { id: 2, label: 'Web Showcase', generatedAt: 'Feb 18, 2026', deployed: false, src: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=450&fit=crop' },
])
const stats = computed(() => [
  { label: 'Resumes', value: myResumes.value.length },
  { label: 'Portfolios', value: myPortfolios.value.length },
  { label: 'Deployed', value: myPortfolios.value.filter(p => p.deployed).length },
  { label: 'Total', value: myResumes.value.length + myPortfolios.value.length },
])

function deleteItem(type, id) {
  if (type === 'resume') myResumes.value = myResumes.value.filter(r => r.id !== id)
  else myPortfolios.value = myPortfolios.value.filter(p => p.id !== id)
}

const config = useRuntimeConfig()
useSeoMeta({ title: `My Space — ${config.public.appName}` })
</script>

<style scoped>
main { background-image: radial-gradient(var(--dot-pattern) 1px, transparent 1px); background-size: 40px 40px; }
.custom-scrollbar::-webkit-scrollbar { width: 6px; }
.custom-scrollbar::-webkit-scrollbar-thumb { background: var(--scrollbar-thumb); border-radius: 10px; }
</style>
