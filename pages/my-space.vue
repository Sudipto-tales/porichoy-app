<template>
  <div class="h-screen w-full bg-[#f8f9fc] flex flex-col overflow-hidden font-sans selection:bg-blue-100">

    <Nav class="z-50 bg-white/80 backdrop-blur-md border-b border-gray-100"
      :profile="{ name: 'Sudipta', avatar: '/porichoy.favicon.png' }" />

    <div class="flex flex-1 overflow-hidden relative">
      <sideBar class="z-40 border-r border-gray-100 bg-white" />

      <main class="flex-1 overflow-y-auto scroll-smooth custom-scrollbar">
        <div class="max-w-[1400px] mx-auto px-6 lg:px-12 py-8">

          <!-- Header -->
          <section class="mb-8 animate-in fade-in slide-in-from-top-4 duration-700">
            <div class="flex items-center justify-between">
              <div>
                <div class="flex items-center gap-3 mb-1">
                  <div class="w-9 h-9 rounded-full bg-indigo-500 flex items-center justify-center text-white font-bold text-sm shadow-md">S</div>
                  <div>
                    <h1 class="text-xl font-black text-gray-900">My Space</h1>
                    <p class="text-xs text-gray-400">Your generated CVs and portfolios</p>
                  </div>
                </div>
              </div>
              <NuxtLink to="/dashboard"
                class="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-500 hover:bg-blue-600 text-white text-xs font-bold uppercase tracking-wider transition-all shadow-sm shadow-blue-200">
                <i class="fas fa-plus text-xs"></i>
                New Template
              </NuxtLink>
            </div>
          </section>

          <!-- Stats Row -->
          <section class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div class="p-4 rounded-2xl bg-white border border-gray-100 shadow-sm">
              <p class="text-2xl font-black text-gray-900">{{ myResumes.length }}</p>
              <p class="text-xs text-gray-400 font-medium mt-0.5">Resumes</p>
            </div>
            <div class="p-4 rounded-2xl bg-white border border-gray-100 shadow-sm">
              <p class="text-2xl font-black text-gray-900">{{ myPortfolios.length }}</p>
              <p class="text-xs text-gray-400 font-medium mt-0.5">Portfolios</p>
            </div>
            <div class="p-4 rounded-2xl bg-white border border-gray-100 shadow-sm">
              <p class="text-2xl font-black text-gray-900">{{ myPortfolios.filter(p => p.deployed).length }}</p>
              <p class="text-xs text-gray-400 font-medium mt-0.5">Deployed</p>
            </div>
            <div class="p-4 rounded-2xl bg-white border border-gray-100 shadow-sm">
              <p class="text-2xl font-black text-gray-900">{{ myResumes.length + myPortfolios.length }}</p>
              <p class="text-xs text-gray-400 font-medium mt-0.5">Total</p>
            </div>
          </section>

          <!-- Tabs -->
          <div class="flex items-center gap-1 mb-6 bg-white border border-gray-100 rounded-2xl p-1 w-fit shadow-sm">
            <button
              v-for="tab in tabs" :key="tab.key"
              @click="activeTab = tab.key"
              :class="['px-5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all', activeTab === tab.key ? 'bg-gray-900 text-white shadow-sm' : 'text-gray-500 hover:text-gray-800']"
            >
              {{ tab.label }}
            </button>
          </div>

          <!-- Resumes Tab -->
          <section v-if="activeTab === 'resumes'" class="animate-in fade-in duration-300">
            <div v-if="myResumes.length === 0" class="flex flex-col items-center justify-center py-20 text-center">
              <div class="w-16 h-16 rounded-3xl bg-blue-50 flex items-center justify-center mb-4">
                <i class="fas fa-file-lines text-2xl text-blue-300"></i>
              </div>
              <h3 class="font-bold text-gray-700 mb-1">No resumes yet</h3>
              <p class="text-sm text-gray-400 mb-4">Generate your first resume from a template</p>
              <NuxtLink to="/dashboard"
                class="px-5 py-2.5 rounded-xl bg-blue-500 hover:bg-blue-600 text-white text-xs font-bold uppercase tracking-wider transition-all">
                Browse Templates
              </NuxtLink>
            </div>

            <div v-else class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
              <div
                v-for="resume in myResumes" :key="resume.id"
                class="group relative bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer"
              >
                <div class="relative aspect-[3/4] overflow-hidden">
                  <img :src="resume.src" :alt="resume.label" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <!-- Hover Actions -->
                  <div class="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
                    <button class="w-9 h-9 rounded-xl bg-white/20 hover:bg-white/30 backdrop-blur-sm flex items-center justify-center text-white transition-all" title="Download">
                      <i class="fas fa-download text-xs"></i>
                    </button>
                    <button class="w-9 h-9 rounded-xl bg-white/20 hover:bg-white/30 backdrop-blur-sm flex items-center justify-center text-white transition-all" title="Preview">
                      <i class="fas fa-eye text-xs"></i>
                    </button>
                    <button @click.stop="deleteItem('resume', resume.id)" class="w-9 h-9 rounded-xl bg-red-500/70 hover:bg-red-500 backdrop-blur-sm flex items-center justify-center text-white transition-all" title="Delete">
                      <i class="fas fa-trash text-xs"></i>
                    </button>
                  </div>
                </div>
                <div class="p-3">
                  <p class="text-xs font-bold text-gray-800 truncate">{{ resume.label }}</p>
                  <p class="text-[10px] text-gray-400 mt-0.5">{{ resume.generatedAt }}</p>
                </div>
              </div>
            </div>
          </section>

          <!-- Portfolios Tab -->
          <section v-if="activeTab === 'portfolios'" class="animate-in fade-in duration-300">
            <div v-if="myPortfolios.length === 0" class="flex flex-col items-center justify-center py-20 text-center">
              <div class="w-16 h-16 rounded-3xl bg-purple-50 flex items-center justify-center mb-4">
                <i class="fas fa-palette text-2xl text-purple-300"></i>
              </div>
              <h3 class="font-bold text-gray-700 mb-1">No portfolios yet</h3>
              <p class="text-sm text-gray-400 mb-4">Generate your first portfolio from a template</p>
              <NuxtLink to="/dashboard"
                class="px-5 py-2.5 rounded-xl bg-purple-500 hover:bg-purple-600 text-white text-xs font-bold uppercase tracking-wider transition-all">
                Browse Templates
              </NuxtLink>
            </div>

            <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              <div
                v-for="portfolio in myPortfolios" :key="portfolio.id"
                class="group relative bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                <div class="relative aspect-[16/9] overflow-hidden">
                  <img :src="portfolio.src" :alt="portfolio.label" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div class="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
                    <a v-if="portfolio.deployed" :href="portfolio.url" target="_blank"
                      class="w-9 h-9 rounded-xl bg-white/20 hover:bg-white/30 backdrop-blur-sm flex items-center justify-center text-white transition-all" title="Visit Site">
                      <i class="fas fa-external-link-alt text-xs"></i>
                    </a>
                    <button class="w-9 h-9 rounded-xl bg-white/20 hover:bg-white/30 backdrop-blur-sm flex items-center justify-center text-white transition-all" title="Edit">
                      <i class="fas fa-pen text-xs"></i>
                    </button>
                    <button @click.stop="deleteItem('portfolio', portfolio.id)" class="w-9 h-9 rounded-xl bg-red-500/70 hover:bg-red-500 backdrop-blur-sm flex items-center justify-center text-white transition-all" title="Delete">
                      <i class="fas fa-trash text-xs"></i>
                    </button>
                  </div>
                </div>
                <div class="p-4">
                  <div class="flex items-start justify-between gap-2">
                    <div>
                      <p class="text-sm font-bold text-gray-800">{{ portfolio.label }}</p>
                      <p class="text-[10px] text-gray-400 mt-0.5">{{ portfolio.generatedAt }}</p>
                    </div>
                    <span v-if="portfolio.deployed"
                      class="shrink-0 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-green-100 text-green-600">
                      Live
                    </span>
                    <span v-else
                      class="shrink-0 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-gray-100 text-gray-500">
                      Draft
                    </span>
                  </div>
                  <div v-if="portfolio.deployed" class="mt-2 flex items-center gap-1.5">
                    <i class="fas fa-globe text-[10px] text-purple-400"></i>
                    <a :href="portfolio.url" target="_blank" class="text-[10px] text-purple-500 hover:text-purple-700 transition-colors truncate font-medium">
                      {{ portfolio.url }}
                    </a>
                  </div>
                  <button v-else @click="openDeployModal(portfolio)"
                    class="mt-3 w-full py-2 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-600 text-xs font-bold uppercase tracking-wider transition-all border border-purple-100">
                    <i class="fas fa-rocket mr-1.5"></i>Deploy
                  </button>
                </div>
              </div>
            </div>
          </section>

        </div>
      </main>
    </div>

    <!-- Deploy Modal -->
    <Teleport to="body">
      <Transition name="modal">
        <div v-if="showDeployModal" class="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div class="absolute inset-0 bg-black/40 backdrop-blur-sm" @click="showDeployModal = false"></div>
          <div class="relative w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 animate-in zoom-in-95 duration-200">

            <button @click="showDeployModal = false"
              class="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors">
              <i class="fas fa-times text-xs text-gray-500"></i>
            </button>

            <div class="w-12 h-12 rounded-2xl bg-purple-500 flex items-center justify-center text-white mb-4">
              <i class="fas fa-globe text-lg"></i>
            </div>

            <h2 class="text-xl font-black text-gray-900 mb-1">Deploy Portfolio</h2>
            <p class="text-sm text-gray-500 mb-6">Choose where to deploy <span class="font-semibold text-gray-700">{{ deployingPortfolio?.label }}</span>.</p>

            <div class="space-y-3 mb-6">
              <label class="flex items-center gap-3 p-4 rounded-2xl border-2 cursor-pointer transition-all"
                :class="deployOption === 'subdomain' ? 'border-purple-500 bg-purple-50' : 'border-gray-100 hover:border-gray-200'">
                <input type="radio" v-model="deployOption" value="subdomain" class="hidden" />
                <div :class="['w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0', deployOption === 'subdomain' ? 'border-purple-500' : 'border-gray-300']">
                  <div v-if="deployOption === 'subdomain'" class="w-2 h-2 rounded-full bg-purple-500"></div>
                </div>
                <div>
                  <p class="text-sm font-bold text-gray-800">Free Subdomain</p>
                  <p class="text-xs text-gray-400">yourname.porichoy.app</p>
                </div>
                <span class="ml-auto text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-green-100 text-green-600">Free</span>
              </label>

              <label class="flex items-center gap-3 p-4 rounded-2xl border-2 cursor-pointer transition-all"
                :class="deployOption === 'custom' ? 'border-purple-500 bg-purple-50' : 'border-gray-100 hover:border-gray-200'">
                <input type="radio" v-model="deployOption" value="custom" class="hidden" />
                <div :class="['w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0', deployOption === 'custom' ? 'border-purple-500' : 'border-gray-300']">
                  <div v-if="deployOption === 'custom'" class="w-2 h-2 rounded-full bg-purple-500"></div>
                </div>
                <div>
                  <p class="text-sm font-bold text-gray-800">Custom Domain</p>
                  <p class="text-xs text-gray-400">yourdomain.com</p>
                </div>
                <span class="ml-auto text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-yellow-100 text-yellow-600">Pro</span>
              </label>
            </div>

            <div v-if="deployOption === 'subdomain'" class="mb-6">
              <label class="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2 block">Your Subdomain</label>
              <div class="flex items-center rounded-2xl border border-gray-200 overflow-hidden focus-within:border-purple-400 focus-within:ring-2 focus-within:ring-purple-100 transition-all">
                <input v-model="subdomainInput" type="text" placeholder="yourname"
                  class="flex-1 px-4 py-3 text-sm outline-none bg-white" />
                <span class="px-3 py-3 text-sm text-gray-400 bg-gray-50 border-l border-gray-200 whitespace-nowrap">.porichoy.app</span>
              </div>
            </div>

            <div v-if="deployOption === 'custom'" class="mb-6">
              <label class="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2 block">Custom Domain / URL</label>
              <input v-model="customDomainInput" type="text" placeholder="https://yourdomain.com"
                class="w-full px-4 py-3 text-sm rounded-2xl border border-gray-200 outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-100 transition-all" />
              <p class="text-[10px] text-gray-400 mt-2">Point your domain's CNAME to <span class="font-mono text-purple-500">cname.porichoy.app</span></p>
            </div>

            <button @click="confirmDeploy" :disabled="isDeploying"
              class="w-full py-3.5 rounded-2xl bg-purple-500 hover:bg-purple-600 disabled:opacity-60 text-white font-bold text-sm uppercase tracking-widest transition-all flex items-center justify-center gap-2 shadow-lg shadow-purple-200">
              <i v-if="isDeploying" class="fas fa-spinner fa-spin"></i>
              <i v-else class="fas fa-rocket"></i>
              {{ isDeploying ? 'Deploying...' : 'Deploy Now' }}
            </button>
          </div>
        </div>
      </Transition>
    </Teleport>

  </div>
</template>

<script setup>
import { ref } from 'vue'
import Nav from '~/components/nav.vue'
import sideBar from '~/components/sideBar.vue'

const activeTab = ref('resumes')
const showDeployModal = ref(false)
const deployingPortfolio = ref(null)
const deployOption = ref('subdomain')
const subdomainInput = ref('')
const customDomainInput = ref('')
const isDeploying = ref(false)

const tabs = [
  { key: 'resumes', label: 'Resumes' },
  { key: 'portfolios', label: 'Portfolios' },
]

// Mock data — replace with real store/API data
const myResumes = ref([
  { id: 1, label: 'Minimal Clean', generatedAt: 'Feb 24, 2026', src: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=400&h=560&fit=crop' },
  { id: 2, label: 'Developer Pro', generatedAt: 'Feb 20, 2026', src: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=560&fit=crop' },
])

const myPortfolios = ref([
  { id: 1, label: 'Design Folio', generatedAt: 'Feb 22, 2026', deployed: true, url: 'https://sudipta.porichoy.app', src: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=800&h=450&fit=crop' },
  { id: 2, label: 'Web Showcase', generatedAt: 'Feb 18, 2026', deployed: false, url: null, src: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=450&fit=crop' },
])

function deleteItem(type, id) {
  if (type === 'resume') myResumes.value = myResumes.value.filter(r => r.id !== id)
  else myPortfolios.value = myPortfolios.value.filter(p => p.id !== id)
}

function openDeployModal(portfolio) {
  deployingPortfolio.value = portfolio
  showDeployModal.value = true
}

function confirmDeploy() {
  isDeploying.value = true
  setTimeout(() => {
    isDeploying.value = false
    const url = deployOption.value === 'subdomain'
      ? `https://${subdomainInput.value || 'yourname'}.porichoy.app`
      : customDomainInput.value
    if (deployingPortfolio.value) {
      const p = myPortfolios.value.find(p => p.id === deployingPortfolio.value.id)
      if (p) { p.deployed = true; p.url = url }
    }
    showDeployModal.value = false
    deployingPortfolio.value = null
  }, 2000)
}

const config = useRuntimeConfig()
useSeoMeta({
  title: `My Space — ${config.public.appName}`,
  description: 'Your personal space for generated CVs and portfolios.',
})

useHead({
  link: [
    { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css' }
  ]
})
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar { width: 6px; }
.custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
.custom-scrollbar::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
.custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #cbd5e1; }

main {
  background-image: radial-gradient(#e5e7eb 1px, transparent 1px);
  background-size: 40px 40px;
  background-attachment: local;
}

.modal-enter-active, .modal-leave-active { transition: opacity 0.2s ease; }
.modal-enter-from, .modal-leave-to { opacity: 0; }
</style>
