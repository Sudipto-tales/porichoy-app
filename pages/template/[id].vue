<template>
  <div class="h-screen w-full bg-[#f8f9fc] flex flex-col overflow-hidden font-sans selection:bg-blue-100">

    <Nav class="z-50 bg-white/80 backdrop-blur-md border-b border-gray-100"
      :profile="{ name: 'Sudipta', avatar: '/porichoy.favicon.png' }" />

    <div class="flex flex-1 overflow-hidden relative">
      <sideBar class="z-40 border-r border-gray-100 bg-white" />

      <main class="flex-1 overflow-y-auto scroll-smooth custom-scrollbar">
        <div class="max-w-[1200px] mx-auto px-6 lg:px-12 py-8">

          <!-- Back Button -->
          <NuxtLink to="/dashboard"
            class="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-800 transition-colors mb-6 group">
            <i class="fas fa-arrow-left text-xs group-hover:-translate-x-1 transition-transform"></i>
            Back to Dashboard
          </NuxtLink>

          <div class="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-8 animate-in fade-in slide-in-from-bottom-4 duration-700">

            <!-- Preview Panel -->
            <div class="space-y-4">
              <div class="flex items-center gap-3 mb-2">
                <span :class="['text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full', template.type === 'resume' ? 'bg-blue-50 text-blue-600 border border-blue-100' : 'bg-purple-50 text-purple-600 border border-purple-100']">
                  {{ template.type }}
                </span>
                <h1 class="text-xl font-black text-gray-900">{{ template.label }}</h1>
                <span class="text-sm text-gray-400">{{ template.subtitle }}</span>
              </div>

              <!-- Full Preview -->
              <div class="relative rounded-3xl overflow-hidden border border-gray-100 shadow-xl bg-white">
                <img :src="template.src" :alt="template.label"
                  class="w-full object-cover"
                  :class="template.type === 'resume' ? 'max-h-[800px]' : 'max-h-[560px]'" />

                <!-- Overlay watermark -->
                <div class="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <span class="text-white/10 text-6xl font-black uppercase tracking-widest rotate-[-30deg] select-none">Preview</span>
                </div>
              </div>

              <!-- Tags -->
              <div class="flex flex-wrap gap-2 pt-2">
                <span v-for="tag in template.tags" :key="tag"
                  class="text-[10px] font-semibold uppercase tracking-wider px-3 py-1 rounded-full bg-gray-100 text-gray-500">
                  {{ tag }}
                </span>
              </div>
            </div>

            <!-- Action Panel -->
            <div class="space-y-4 lg:sticky lg:top-8 self-start">

              <!-- Template Info Card -->
              <div class="p-6 rounded-3xl bg-white border border-gray-100 shadow-sm">
                <h2 class="font-black text-gray-900 text-lg mb-1">{{ template.label }}</h2>
                <p class="text-sm text-gray-500 mb-4">{{ template.description }}</p>

                <div class="space-y-2 mb-6">
                  <div class="flex items-center gap-2 text-sm text-gray-600">
                    <i class="fas fa-check-circle text-green-500 w-4"></i>
                    ATS Friendly format
                  </div>
                  <div class="flex items-center gap-2 text-sm text-gray-600">
                    <i class="fas fa-check-circle text-green-500 w-4"></i>
                    Auto-filled from your profile
                  </div>
                  <div class="flex items-center gap-2 text-sm text-gray-600">
                    <i class="fas fa-check-circle text-green-500 w-4"></i>
                    Saved to My Space
                  </div>
                  <div v-if="template.type === 'portfolio'" class="flex items-center gap-2 text-sm text-gray-600">
                    <i class="fas fa-check-circle text-green-500 w-4"></i>
                    Deploy to custom domain
                  </div>
                </div>

                <!-- Generate Button -->
                <button
                  @click="handleGenerate"
                  class="w-full py-3.5 rounded-2xl font-bold text-sm uppercase tracking-widest transition-all duration-200 flex items-center justify-center gap-2 group"
                  :class="template.type === 'resume'
                    ? 'bg-blue-500 hover:bg-blue-600 text-white shadow-lg shadow-blue-200 hover:shadow-blue-300'
                    : 'bg-purple-500 hover:bg-purple-600 text-white shadow-lg shadow-purple-200 hover:shadow-purple-300'"
                >
                  <i :class="['fas', template.type === 'resume' ? 'fa-file-arrow-down' : 'fa-globe', 'group-hover:scale-110 transition-transform']"></i>
                  Generate {{ template.type === 'resume' ? 'Resume' : 'Portfolio' }}
                </button>

                <p class="text-[10px] text-center text-gray-400 mt-3">
                  Uses your profile details to auto-generate
                </p>
              </div>

              <!-- Similar Templates -->
              <div class="p-5 rounded-3xl bg-white border border-gray-100 shadow-sm">
                <h3 class="text-xs font-bold uppercase tracking-widest text-gray-500 mb-3">Similar Templates</h3>
                <div class="space-y-3">
                  <NuxtLink
                    v-for="(sim, i) in similarTemplates"
                    :key="i"
                    :to="`/template/${sim.id}`"
                    class="flex items-center gap-3 group cursor-pointer"
                  >
                    <img :src="sim.src" :alt="sim.label" class="w-12 h-14 object-cover rounded-xl border border-gray-100 group-hover:shadow-md transition-shadow" />
                    <div>
                      <p class="text-sm font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">{{ sim.label }}</p>
                      <p class="text-[10px] text-gray-400">{{ sim.subtitle }}</p>
                    </div>
                  </NuxtLink>
                </div>
              </div>

            </div>
          </div>
        </div>
      </main>
    </div>

    <!-- Portfolio Deploy Modal -->
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
            <p class="text-sm text-gray-500 mb-6">Choose where to deploy your generated portfolio site.</p>

            <!-- Domain Options -->
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

            <!-- Subdomain Input -->
            <div v-if="deployOption === 'subdomain'" class="mb-6">
              <label class="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2 block">Your Subdomain</label>
              <div class="flex items-center gap-0 rounded-2xl border border-gray-200 overflow-hidden focus-within:border-purple-400 focus-within:ring-2 focus-within:ring-purple-100 transition-all">
                <input
                  v-model="subdomainInput"
                  type="text"
                  placeholder="yourname"
                  class="flex-1 px-4 py-3 text-sm outline-none bg-white"
                />
                <span class="px-3 py-3 text-sm text-gray-400 bg-gray-50 border-l border-gray-200 whitespace-nowrap">.porichoy.app</span>
              </div>
            </div>

            <!-- Custom Domain Input -->
            <div v-if="deployOption === 'custom'" class="mb-6">
              <label class="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2 block">Custom Domain / URL</label>
              <input
                v-model="customDomainInput"
                type="text"
                placeholder="https://yourdomain.com"
                class="w-full px-4 py-3 text-sm rounded-2xl border border-gray-200 outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-100 transition-all"
              />
              <p class="text-[10px] text-gray-400 mt-2">Point your domain's CNAME to <span class="font-mono text-purple-500">cname.porichoy.app</span></p>
            </div>

            <button
              @click="confirmDeploy"
              :disabled="isDeploying"
              class="w-full py-3.5 rounded-2xl bg-purple-500 hover:bg-purple-600 disabled:opacity-60 text-white font-bold text-sm uppercase tracking-widest transition-all flex items-center justify-center gap-2 shadow-lg shadow-purple-200"
            >
              <i v-if="isDeploying" class="fas fa-spinner fa-spin"></i>
              <i v-else class="fas fa-rocket"></i>
              {{ isDeploying ? 'Generating...' : 'Generate & Deploy' }}
            </button>

          </div>
        </div>
      </Transition>
    </Teleport>

    <!-- Resume Generated Toast -->
    <Teleport to="body">
      <Transition name="toast">
        <div v-if="showToast"
          class="fixed bottom-6 right-6 z-[200] flex items-center gap-3 px-5 py-4 rounded-2xl bg-gray-900 text-white shadow-2xl">
          <i class="fas fa-check-circle text-green-400"></i>
          <div>
            <p class="text-sm font-bold">{{ toastMessage }}</p>
            <NuxtLink to="/my-space" class="text-xs text-blue-400 hover:text-blue-300 transition-colors">View in My Space →</NuxtLink>
          </div>
        </div>
      </Transition>
    </Teleport>

  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import Nav from '~/components/nav.vue'
import sideBar from '~/components/sideBar.vue'

const route = useRoute()
const router = useRouter()

const showDeployModal = ref(false)
const showToast = ref(false)
const toastMessage = ref('')
const deployOption = ref('subdomain')
const subdomainInput = ref('')
const customDomainInput = ref('')
const isDeploying = ref(false)

// Template data map — in a real app this comes from an API/store
const templateMap = {
  'minimal-clean': {
    id: 'minimal-clean', label: 'Minimal Clean', subtitle: 'Resume • A4', type: 'resume',
    description: 'A clean, minimal resume template perfect for professionals who want to make a strong first impression.',
    src: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&h=1100&fit=crop',
    tags: ['Minimal', 'ATS Friendly', 'A4', 'Professional'],
  },
  'bold-creative': {
    id: 'bold-creative', label: 'Bold Creative', subtitle: 'Resume • A4', type: 'resume',
    description: 'Stand out with bold typography and creative layout. Great for designers and creatives.',
    src: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=800&h=1100&fit=crop',
    tags: ['Creative', 'Bold', 'A4', 'Designer'],
  },
  'developer-pro': {
    id: 'developer-pro', label: 'Developer Pro', subtitle: 'Resume • A4', type: 'resume',
    description: 'Tailored for software developers with sections for skills, projects, and GitHub links.',
    src: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=1100&fit=crop',
    tags: ['Developer', 'Tech', 'A4', 'GitHub'],
  },
  'design-folio': {
    id: 'design-folio', label: 'Design Folio', subtitle: 'Portfolio • Web', type: 'portfolio',
    description: 'A stunning portfolio layout for designers to showcase their work with visual impact.',
    src: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=800&h=600&fit=crop',
    tags: ['Portfolio', 'Designer', 'Web', 'Visual'],
  },
  'web-showcase': {
    id: 'web-showcase', label: 'Web Showcase', subtitle: 'Portfolio • Web', type: 'portfolio',
    description: 'A developer-focused portfolio to showcase projects, skills, and open source contributions.',
    src: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=600&fit=crop',
    tags: ['Portfolio', 'Developer', 'Web', 'Projects'],
  },
}

const template = computed(() => {
  return templateMap[route.params.id] || {
    id: route.params.id, label: 'Template', subtitle: 'Resume • A4', type: 'resume',
    description: 'A professional template to help you stand out.',
    src: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&h=1100&fit=crop',
    tags: ['Professional', 'A4'],
  }
})

const similarTemplates = computed(() => {
  return Object.values(templateMap)
    .filter(t => t.type === template.value.type && t.id !== template.value.id)
    .slice(0, 3)
})

function handleGenerate() {
  if (template.value.type === 'portfolio') {
    showDeployModal.value = true
  } else {
    generateResume()
  }
}

function generateResume() {
  isDeploying.value = true
  setTimeout(() => {
    isDeploying.value = false
    toastMessage.value = 'Resume generated and saved!'
    showToast.value = true
    setTimeout(() => { showToast.value = false }, 4000)
  }, 1800)
}

function confirmDeploy() {
  isDeploying.value = true
  setTimeout(() => {
    isDeploying.value = false
    showDeployModal.value = false
    toastMessage.value = 'Portfolio generated and deployed!'
    showToast.value = true
    setTimeout(() => { showToast.value = false }, 4000)
  }, 2000)
}

const config = useRuntimeConfig()
useSeoMeta({
  title: `${template.value.label} — ${config.public.appName}`,
  description: template.value.description,
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

.toast-enter-active { transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1); }
.toast-leave-active { transition: all 0.2s ease; }
.toast-enter-from { opacity: 0; transform: translateY(16px) scale(0.95); }
.toast-leave-to { opacity: 0; transform: translateY(8px); }
</style>
