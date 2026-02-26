<template>
  <div class="h-screen w-full bg-[#f8f9fc] flex flex-col overflow-hidden font-sans selection:bg-blue-100">

    <Nav class="z-50 bg-white/80 backdrop-blur-md border-b border-gray-100"
      :profile="{ name: 'Sudipta', avatar: '/porichoy.favicon.png' }" />

    <div class="flex flex-1 overflow-hidden relative">
      <sideBar class="z-40 border-r border-gray-100 bg-white" />

      <main class="flex-1 overflow-y-auto scroll-smooth custom-scrollbar">

        <div class="max-w-[1600px] mx-auto px-6 lg:px-12 py-8">

          <section class="mb-10 animate-in fade-in slide-in-from-top-4 duration-700">
            <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 mb-4">
              <span class="relative flex h-2 w-2">
                <span
                  class="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span class="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              <span class="text-[10px] font-bold uppercase tracking-widest text-blue-600">Beta Testing</span>
            </div>
            <Welcome />
          </section>

          <!-- Quick Actions -->
          <section class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <NuxtLink to="/my-space"
              class="p-6 rounded-3xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-all group cursor-pointer flex items-center gap-4">
              <div class="h-10 w-10 rounded-xl bg-blue-500 flex items-center justify-center text-white group-hover:scale-110 transition-transform shrink-0">
                <i class="fas fa-layer-group"></i>
              </div>
              <div>
                <h3 class="font-bold text-gray-800">My Space</h3>
                <p class="text-sm text-gray-500">View your generated CVs & portfolios</p>
              </div>
            </NuxtLink>
            <div class="p-6 rounded-3xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-all group cursor-pointer flex items-center gap-4">
              <div class="h-10 w-10 rounded-xl bg-purple-500 flex items-center justify-center text-white group-hover:scale-110 transition-transform shrink-0">
                <i class="fas fa-bolt"></i>
              </div>
              <div>
                <h3 class="font-bold text-gray-800">AI Generator</h3>
                <p class="text-sm text-gray-500">Generate a resume with Porichoy AI</p>
              </div>
            </div>
            <div class="p-6 rounded-3xl bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-800 shadow-lg group cursor-pointer flex items-center gap-4">
              <div class="h-10 w-10 rounded-xl bg-white/10 flex items-center justify-center text-white shrink-0">
                <i class="fas fa-crown text-yellow-400"></i>
              </div>
              <div>
                <h3 class="font-bold text-white">{{ config.public.appName }} Pro</h3>
                <p class="text-sm text-gray-400">Unlock premium templates</p>
              </div>
            </div>
          </section>

          <!-- Featured Templates -->
          <section class="mb-10 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <div class="flex items-center justify-between mb-5">
              <h2 class="text-base font-bold text-gray-800 uppercase tracking-widest">Featured Templates</h2>
              <span class="text-xs text-gray-400 font-medium">Click to preview</span>
            </div>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
              <NuxtLink
                v-for="(item, i) in featuredTemplates"
                :key="i"
                :to="`/template/${item.id}`"
                class="group relative rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer bg-white"
              >
                <div :class="['relative overflow-hidden', item.type === 'resume' ? 'aspect-[3/4]' : 'aspect-[4/3]']">
                  <img :src="item.src" :alt="item.label" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
                    <span class="text-white text-xs font-bold uppercase tracking-wider">Preview</span>
                  </div>
                  <div class="absolute top-2 right-2">
                    <span :class="['text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full', item.type === 'resume' ? 'bg-blue-500 text-white' : 'bg-purple-500 text-white']">
                      {{ item.type }}
                    </span>
                  </div>
                </div>
                <div class="p-3">
                  <p class="text-xs font-bold text-gray-800 truncate">{{ item.label }}</p>
                  <p class="text-[10px] text-gray-400 mt-0.5">{{ item.subtitle }}</p>
                </div>
              </NuxtLink>
            </div>
          </section>

          <section class="sticky top-0 z-30 transparent py-4 space-y-6 px-2 -mx-2 transition-all duration-300">

            <div class="flex flex-col md:flex-row md:items-center gap-4">
              <div class="flex-1">
                <SearchBar />
              </div>
            </div>

          </section>


          <div class="relative">
            <filterIcons />
          </div>

          <div class="space-y-16 pb-20 -mx-6 lg:-mx-12">
            <DashboardRow v-for="category in categories" :key="category.title" :title="category.title"
              :layout="category.layout" :items="category.items" />
          </div>

        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import DashboardRow from '~/components/dash/rows.vue'
import Nav from '~/components/nav.vue'
import Welcome from '~/components/dash/welcome.vue'
import sideBar from '~/components/sideBar.vue';
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
    title: 'Creative Resumes',
    layout: 'a4',
    items: [
      { src: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=400&h=560&fit=crop', label: 'Minimal Clean', subtitle: 'Resume • A4' },
      { src: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=400&h=560&fit=crop', label: 'Bold Creative', subtitle: 'Resume • A4' },
      { src: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=560&fit=crop', label: 'Developer Pro', subtitle: 'Resume • A4' },
      { src: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=400&h=560&fit=crop', label: 'Elegant Writer', subtitle: 'Resume • A4' },
      { src: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=560&fit=crop', label: 'Corporate Edge', subtitle: 'Resume • A4' },
      { src: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=560&fit=crop', label: 'Team Spirit', subtitle: 'Resume • A4' },
      { src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=560&fit=crop', label: 'Classic Mono', subtitle: 'Resume • A4' },
    ]
  },
  {
    title: 'Portfolio Showcase',
    layout: 'portfolio',
    items: [
      { src: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=400&h=560&fit=crop', label: 'Design Folio', subtitle: 'Portfolio • A4' },
      { src: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=560&fit=crop', label: 'Web Showcase', subtitle: 'Portfolio • Banner' },
      { src: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=560&fit=crop', label: 'Art Collection', subtitle: 'Portfolio • A4' },
      { src: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=560&fit=crop', label: 'Analytics View', subtitle: 'Portfolio • Banner' },
      { src: 'https://images.unsplash.com/photo-1545235617-9465d2a55698?w=400&h=560&fit=crop', label: 'Mobile First', subtitle: 'Portfolio • A4' },
      { src: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?w=800&h=560&fit=crop', label: 'Freelancer Hub', subtitle: 'Portfolio • Banner' },
    ]
  },
  {
    title: 'Professional Resumes',
    layout: 'a4',
    items: [
      { src: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=400&h=560&fit=crop', label: 'Executive Suite', subtitle: 'Resume • A4' },
      { src: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=400&h=560&fit=crop', label: 'Tech Lead', subtitle: 'Resume • A4' },
      { src: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=400&h=560&fit=crop', label: 'Boardroom', subtitle: 'Resume • A4' },
      { src: 'https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?w=400&h=560&fit=crop', label: 'Workspace', subtitle: 'Resume • A4' },
      { src: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=400&h=560&fit=crop', label: 'Startup Vibe', subtitle: 'Resume • A4' },
      { src: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=560&fit=crop', label: 'Team Player', subtitle: 'Resume • A4' },
    ]
  },
  {
    title: 'Presentations',
    layout: 'presentation',
    items: [
      { src: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=700&h=400&fit=crop', label: 'Pitch Deck', subtitle: 'Presentation • 16:9' },
      { src: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=700&h=400&fit=crop', label: 'Keynote Pro', subtitle: 'Presentation • 16:9' },
      { src: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=700&h=400&fit=crop', label: 'Dev Talk', subtitle: 'Presentation • 16:9' },
      { src: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=700&h=400&fit=crop', label: 'Brand Story', subtitle: 'Presentation • 16:9' },
      { src: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=700&h=400&fit=crop', label: 'Workshop', subtitle: 'Presentation • 16:9' },
    ]
  },
  {
    title: 'Social Media Kits',
    layout: 'social',
    items: [
      { src: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=500&h=500&fit=crop', label: 'Instagram Pack', subtitle: 'Social • Square' },
      { src: 'https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=500&h=500&fit=crop', label: 'Story Kit', subtitle: 'Social • Square' },
      { src: 'https://images.unsplash.com/photo-1563986768609-322da13575f2?w=500&h=500&fit=crop', label: 'LinkedIn Banner', subtitle: 'Social • Square' },
      { src: 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=500&h=500&fit=crop', label: 'Twitter Header', subtitle: 'Social • Square' },
      { src: 'https://images.unsplash.com/photo-1611162618071-b39a2ec055fb?w=500&h=500&fit=crop', label: 'Facebook Cover', subtitle: 'Social • Square' },
    ]
  },
]

const config = useRuntimeConfig()
useSeoMeta({
  title: `${config.public.appName} Dashboard`,
  description: 'Your creative workspace for crafting professional identities. Explore templates, manage projects, and bring your vision to life.',
  ogTitle: `${config.public.appName} Dashboard`,
  ogDescription: 'Your creative workspace for crafting professional identities. Explore templates, manage projects, and bring your vision to life.',
  ogImage: '/porichoy.og-image.png'
})

useHead({
  link: [
    {
      rel: 'icon',
      type: 'image/png',
      href: '/porichoy.favicon.png'
    },
    {
      rel: 'stylesheet',
      href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css'
    }
  ]
})
</script>

<style scoped>
/* Creative Scrollbar for a premium look */
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #e2e8f0;
  border-radius: 10px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #cbd5e1;
}

/* Ensure background stays clean */
main {
  background-image: radial-gradient(#e5e7eb 1px, transparent 1px);
  background-size: 40px 40px;
  background-attachment: local;
}
</style>