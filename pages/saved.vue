<template>
  <main class="flex-1 overflow-y-auto scroll-smooth custom-scrollbar">
    <div class="relative" :style="{ borderBottom: '1px solid var(--border)' }">
      <div class="max-w-[1600px] mx-auto px-6 lg:px-12 py-10">
        <div class="max-w-2xl">
          <HeroIntro badge="Your Collection" description="All your starred templates and designs in one place.">
            <template #title>SAVED <br /><span class="text-blue-400 italic">FAVORITES.</span></template>
          </HeroIntro>
        </div>
      </div>
    </div>
    <div class="max-w-[1600px] mx-auto px-6 lg:px-12 py-12">
      <div v-if="starredItems.length === 0" class="py-32 text-center">
        <i class="fas fa-star text-6xl mb-6" :style="{ color: 'var(--text-dimmed)' }"></i>
        <h3 class="text-xl font-black uppercase tracking-widest mb-4" :style="{ color: 'var(--text-muted)' }">No Saved Items Yet</h3>
        <p class="mb-8" :style="{ color: 'var(--text-muted)' }">Start exploring templates and save your favorites</p>
        <div class="flex gap-4 justify-center">
          <NuxtLink to="/studio/resume-builder" class="px-6 py-3 bg-blue-600 text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-blue-500 transition-all">Open Studio</NuxtLink>
          <NuxtLink to="/dashboard" class="px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all"
            :style="{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border)', color: 'var(--text-secondary)' }">Browse Templates</NuxtLink>
        </div>
      </div>
      <div v-else>
        <div class="flex items-center justify-between mb-8">
          <h2 class="text-lg font-black uppercase tracking-widest" :style="{ color: 'var(--text-primary)' }">{{ starredItems.length }} Saved</h2>
          <button @click="clearAll" class="text-xs font-bold text-red-400/60 hover:text-red-400 uppercase tracking-widest">Clear All</button>
        </div>
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          <TemplateCard v-for="item in starredItems" :key="item.id" :item="item" :action-link="`/editor/${item.type}/${item.id}`" action-text="Edit" :show-star="true" :is-starred="true" @toggle-star="toggleStar" />
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { computed } from 'vue'
import HeroIntro from '~/components/ui/HeroIntro.vue'
import TemplateCard from '~/components/cards/TemplateCard.vue'
import { useStarred } from '~/composables/useStarred'

definePageMeta({ layout: 'dashboard-layout' })
const { starred, toggleStar } = useStarred()

const allTemplates = [
  { id: 'r1', type: 'resume', label: 'LINEAR ARCHITECT', style: 'ATS Friendly', price: 0, isPro: false, src: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=400&h=560&fit=crop' },
  { id: 'r2', type: 'resume', label: 'SWISS MODERN', style: 'Minimal', price: 9, isPro: true, src: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=400&h=560&fit=crop' },
]
const starredItems = computed(() => allTemplates.filter(t => starred.value.includes(t.id)))
const clearAll = () => { if (confirm('Remove all?')) { starred.value = []; if (process.client) localStorage.removeItem('starred') } }

const config = useRuntimeConfig()
useSeoMeta({ title: `Saved — ${config.public.appName}` })
</script>

<style scoped>
main { background-image: radial-gradient(var(--dot-pattern) 0.5px, transparent 0.5px); background-size: 24px 24px; }
.custom-scrollbar::-webkit-scrollbar { width: 6px; }
.custom-scrollbar::-webkit-scrollbar-thumb { background: var(--scrollbar-thumb); border-radius: 10px; }
</style>
