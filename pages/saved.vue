<template>
  <main class="flex-1 overflow-y-auto scroll-smooth custom-scrollbar">
    <div class="relative bg-[#fafafa] border-b border-gray-100">
      <div class="max-w-[1600px] mx-auto px-6 lg:px-12 py-10">
        <div class="max-w-2xl">
          <HeroIntro badge="Your Collection"
            description="All your starred templates and designs in one place. Pick up where you left off.">
            <template #title>
              SAVED <br />
              <span class="text-blue-600 italic">FAVORITES.</span>
            </template>
          </HeroIntro>
        </div>
      </div>
    </div>

    <div class="max-w-[1600px] mx-auto px-6 lg:px-12 py-12">
      <div v-if="starredItems.length === 0" class="py-32 text-center">
        <i class="fas fa-star text-6xl text-gray-100 mb-6"></i>
        <h3 class="text-xl font-black text-gray-400 uppercase tracking-widest mb-4">No Saved Items Yet</h3>
        <p class="text-gray-500 mb-8">Start exploring templates and save your favorites</p>
        <div class="flex gap-4 justify-center">
          <NuxtLink to="/resumes"
            class="px-6 py-3 bg-blue-600 text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-blue-700 transition-all">
            Browse Resumes
          </NuxtLink>
          <NuxtLink to="/portfolios"
            class="px-6 py-3 bg-indigo-600 text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-indigo-700 transition-all">
            Browse Portfolios
          </NuxtLink>
        </div>
      </div>

      <div v-else>
        <div class="flex items-center justify-between mb-8">
          <h2 class="text-lg font-black text-gray-900 uppercase tracking-widest">
            {{ starredItems.length }} Saved {{ starredItems.length === 1 ? 'Item' : 'Items' }}
          </h2>
          <button @click="clearAll"
            class="text-xs font-bold text-red-500 hover:text-red-600 uppercase tracking-widest">
            Clear All
          </button>
        </div>

        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          <TemplateCard v-for="item in starredItems" :key="item.id" :item="item"
            :action-link="`/editor/${item.type}/${item.id}`" action-text="Edit Template" :show-star="true"
            :is-starred="true" @toggle-star="toggleStar" />
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
  { id: 'p1', type: 'portfolio', label: 'NEON VOID', category: 'Creative', tech: 'Nuxt 3', price: 0, isPro: false, src: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=800&h=500&fit=crop' },
  { id: 'p2', type: 'portfolio', label: 'SILICON GHOST', category: 'Developer', tech: 'Tailwind', price: 12, isPro: true, src: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=500&fit=crop' },
]

const starredItems = computed(() => allTemplates.filter(t => starred.value.includes(t.id)))

const clearAll = () => {
  if (confirm('Remove all saved items?')) {
    starred.value = []
    if (process.client) localStorage.removeItem('starred')
  }
}

const config = useRuntimeConfig()
useSeoMeta({
  title: `Saved Templates — ${config.public.appName}`,
  description: 'Your collection of starred templates and designs.'
})
</script>

<style scoped>
main {
  background-image: radial-gradient(#d1d5db 0.5px, transparent 0.5px);
  background-size: 24px 24px;
}
</style>
