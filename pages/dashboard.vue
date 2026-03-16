<template>
  <main class="flex-1 overflow-y-auto scroll-smooth custom-scrollbar" :style="{ backgroundColor: 'var(--bg-page)' }">

    <div class="max-w-[1600px] mx-auto px-6 lg:px-12 py-8">

      <section class="mb-10 animate-in fade-in slide-in-from-top-4 duration-700">
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 mb-4">
          <span class="relative flex h-2 w-2">
            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span class="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
          </span>
          <span class="text-[10px] font-bold uppercase tracking-widest text-blue-400">Beta Testing</span>
        </div>
        <Welcome />
      </section>

      <!-- Quick Actions -->
      <section class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 animate-in fade-in slide-in-from-bottom-4 duration-1000">
        <NuxtLink to="/my-space"
          class="p-6 rounded-3xl transition-all group cursor-pointer flex items-center gap-4"
          :style="{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border)' }">
          <div class="h-10 w-10 rounded-xl bg-blue-500/15 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform shrink-0">
            <i class="fas fa-layer-group"></i>
          </div>
          <div>
            <h3 class="font-bold" :style="{ color: 'var(--text-primary)' }">My Space</h3>
            <p class="text-sm" :style="{ color: 'var(--text-secondary)' }">View your generated CVs & portfolios</p>
          </div>
        </NuxtLink>

        <NuxtLink to="/coming-soon"
          class="p-6 rounded-3xl transition-all group cursor-pointer flex items-center gap-4"
          :style="{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border)' }">
          <div class="h-10 w-10 rounded-xl bg-purple-500/15 flex items-center justify-center text-purple-400 group-hover:scale-110 transition-transform shrink-0">
            <i class="fas fa-bolt"></i>
          </div>
          <div>
            <h3 class="font-bold" :style="{ color: 'var(--text-primary)' }">AI Generator</h3>
            <p class="text-sm" :style="{ color: 'var(--text-secondary)' }">Generate a resume with Porichoy AI</p>
          </div>
          <span class="text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20 ml-auto">Soon</span>
        </NuxtLink>

        <NuxtLink to="/coming-soon"
          class="p-6 rounded-3xl transition-all group cursor-pointer flex items-center gap-4"
          :style="{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border)' }">
          <div class="h-10 w-10 rounded-xl bg-amber-500/10 flex items-center justify-center shrink-0">
            <i class="fas fa-crown text-amber-400"></i>
          </div>
          <div>
            <h3 class="font-bold" :style="{ color: 'var(--text-primary)' }">{{ config.public.appName }} Pro</h3>
            <p class="text-sm" :style="{ color: 'var(--text-secondary)' }">Unlock premium templates</p>
          </div>
          <span class="text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 ml-auto">Soon</span>
        </NuxtLink>
      </section>

      <!-- Featured Templates -->
      <section class="mb-10 animate-in fade-in slide-in-from-bottom-4 duration-1000">
        <div class="flex items-center justify-between mb-5">
          <h2 class="text-base font-bold uppercase tracking-widest" :style="{ color: 'var(--text-secondary)' }">Featured Templates</h2>
          <span class="text-xs font-medium" :style="{ color: 'var(--text-muted)' }">Click to preview</span>
        </div>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <NuxtLink v-for="(item, i) in featuredTemplates" :key="i" :to="`/template/${item.id}`"
            class="group relative rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer"
            :style="{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border)' }">
            <div :class="['relative overflow-hidden', item.type === 'resume' ? 'aspect-[3/4]' : 'aspect-[4/3]']">
              <img :src="item.src" :alt="item.label" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
                <span class="text-white text-xs font-bold uppercase tracking-wider">Preview</span>
              </div>
              <div class="absolute top-2 right-2">
                <span :class="['text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full', item.type === 'resume' ? 'bg-blue-500 text-white' : 'bg-purple-500 text-white']">
                  {{ item.type }}
                </span>
              </div>
            </div>
            <div class="p-3">
              <p class="text-xs font-bold truncate" :style="{ color: 'var(--text-primary)' }">{{ item.label }}</p>
              <p class="text-[10px] mt-0.5" :style="{ color: 'var(--text-muted)' }">{{ item.subtitle }}</p>
            </div>
          </NuxtLink>
        </div>
      </section>

      <section class="sticky top-0 z-30 transparent py-4 space-y-6 px-2 -mx-2 transition-all duration-300">
        <div class="flex flex-col md:flex-row md:items-center gap-4">
          <div class="flex-1"><SearchBar /></div>
        </div>
      </section>

      <div class="relative"><filterIcons /></div>

      <div class="space-y-16 pb-20 -mx-6 lg:-mx-12">
        <DashboardRow v-for="category in categories" :key="category.title" :title="category.title" :layout="category.layout" :items="category.items" />
      </div>

    </div>
  </main>
</template>

<script setup>
definePageMeta({ layout: 'dashboard-layout' })
import DashboardRow from '~/components/dash/rows.vue'
import Welcome from '~/components/dash/welcome.vue'
import SearchBar from '~/components/ui/searchBar.vue';
import filterIcons from '~/components/dash/filterIcons.vue';

const featuredTemplates = [
  { id: 'minimal-clean', label: 'Minimal Clean', subtitle: 'Resume • A4', type: 'resume', src: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=400&h=560&fit=crop' },
  { id: 'bold-creative', label: 'Bold Creative', subtitle: 'Resume • A4', type: 'resume', src: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=400&h=560&fit=crop' },
  { id: 'design-folio', label: 'Design Folio', subtitle: 'Portfolio • Web', type: 'portfolio', src: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=400&h=300&fit=crop' },
  { id: 'web-showcase', label: 'Web Showcase', subtitle: 'Portfolio • Web', type: 'portfolio', src: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=300&fit=crop' },
]

const categories = [
  {
    title: 'Creative Resumes', layout: 'a4',
    items: [
      { src: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=400&h=560&fit=crop', label: 'Minimal Clean', subtitle: 'Resume • A4' },
      { src: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=400&h=560&fit=crop', label: 'Bold Creative', subtitle: 'Resume • A4' },
      { src: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=560&fit=crop', label: 'Developer Pro', subtitle: 'Resume • A4' },
      { src: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=400&h=560&fit=crop', label: 'Elegant Writer', subtitle: 'Resume • A4' },
      { src: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=560&fit=crop', label: 'Corporate Edge', subtitle: 'Resume • A4' },
      { src: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=560&fit=crop', label: 'Team Spirit', subtitle: 'Resume • A4' },
    ]
  },
  {
    title: 'Portfolio Showcase', layout: 'portfolio',
    items: [
      { src: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=400&h=560&fit=crop', label: 'Design Folio', subtitle: 'Portfolio • A4' },
      { src: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=560&fit=crop', label: 'Web Showcase', subtitle: 'Portfolio • Banner' },
      { src: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=560&fit=crop', label: 'Art Collection', subtitle: 'Portfolio • A4' },
      { src: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=560&fit=crop', label: 'Analytics View', subtitle: 'Portfolio • Banner' },
    ]
  },
  {
    title: 'Presentations', layout: 'presentation',
    items: [
      { src: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=700&h=400&fit=crop', label: 'Pitch Deck', subtitle: 'Presentation • 16:9' },
      { src: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=700&h=400&fit=crop', label: 'Keynote Pro', subtitle: 'Presentation • 16:9' },
      { src: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=700&h=400&fit=crop', label: 'Dev Talk', subtitle: 'Presentation • 16:9' },
    ]
  },
]

const config = useRuntimeConfig()
useSeoMeta({
  title: `${config.public.appName} Dashboard`,
  description: 'Your creative workspace for crafting professional identities.',
})
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar { width: 6px; }
.custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
.custom-scrollbar::-webkit-scrollbar-thumb { background: var(--scrollbar-thumb); border-radius: 10px; }
.custom-scrollbar::-webkit-scrollbar-thumb:hover { background: var(--scrollbar-hover); }

main {
  background-image: radial-gradient(var(--dot-pattern) 1px, transparent 1px);
  background-size: 40px 40px;
  background-attachment: local;
}
</style>