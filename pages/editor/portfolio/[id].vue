<template>
  <main class="flex-1 overflow-hidden flex flex-col">
    <div class="border-b border-gray-200 bg-white px-6 py-4 flex items-center justify-between">
      <div class="flex items-center gap-4">
        <NuxtLink to="/portfolios"
          class="h-10 w-10 rounded-xl bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-all">
          <i class="fas fa-arrow-left text-sm"></i>
        </NuxtLink>
        <div>
          <h1 class="text-lg font-black text-gray-900 uppercase tracking-tight">Portfolio Editor</h1>
          <p class="text-xs text-gray-500">Customize your portfolio design</p>
        </div>
      </div>
      <div class="flex items-center gap-3">
        <button @click="saveDesign"
          class="px-6 py-3 bg-gray-100 text-gray-900 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-gray-200 transition-all">
          Save Draft
        </button>
        <button @click="publishPortfolio"
          class="px-6 py-3 bg-indigo-600 text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-indigo-700 transition-all">
          Publish
        </button>
      </div>
    </div>

    <div class="flex-1 flex overflow-hidden">
      <div class="w-80 border-r border-gray-200 bg-white overflow-y-auto p-6 space-y-6">
        <div>
          <label class="text-xs font-black text-gray-700 uppercase tracking-widest mb-3 block">Portfolio Name</label>
          <input v-model="formData.name" type="text"
            class="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm font-medium focus:border-indigo-500 focus:outline-none" />
        </div>

        <div>
          <label class="text-xs font-black text-gray-700 uppercase tracking-widest mb-3 block">Tagline</label>
          <input v-model="formData.tagline" type="text"
            class="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm font-medium focus:border-indigo-500 focus:outline-none" />
        </div>

        <div>
          <label class="text-xs font-black text-gray-700 uppercase tracking-widest mb-3 block">About</label>
          <textarea v-model="formData.about" rows="4"
            class="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm font-medium focus:border-indigo-500 focus:outline-none resize-none"></textarea>
        </div>

        <div>
          <label class="text-xs font-black text-gray-700 uppercase tracking-widest mb-3 block">Theme Color</label>
          <input v-model="formData.color" type="color"
            class="w-full h-12 border border-gray-200 rounded-xl cursor-pointer" />
        </div>

        <div>
          <label class="text-xs font-black text-gray-700 uppercase tracking-widest mb-3 block">Layout Style</label>
          <select v-model="formData.layout"
            class="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm font-medium focus:border-indigo-500 focus:outline-none">
            <option value="minimal">Minimal</option>
            <option value="creative">Creative</option>
            <option value="modern">Modern</option>
          </select>
        </div>
      </div>

      <div class="flex-1 bg-gray-100 overflow-auto p-12">
        <div class="bg-white shadow-2xl rounded-3xl overflow-hidden">
          <div class="h-64 flex items-center justify-center" :style="{ backgroundColor: formData.color }">
            <div class="text-center text-white">
              <h1 class="text-5xl font-black uppercase tracking-tight mb-4">
                {{ formData.name || 'Your Portfolio' }}
              </h1>
              <p class="text-xl opacity-90">{{ formData.tagline || 'Your tagline here' }}</p>
            </div>
          </div>

          <div class="p-12">
            <div v-if="formData.about" class="mb-12">
              <h2 class="text-2xl font-black uppercase tracking-tight mb-4" :style="{ color: formData.color }">
                About
              </h2>
              <p class="text-gray-700 leading-relaxed">{{ formData.about }}</p>
            </div>

            <div class="grid grid-cols-2 gap-6">
              <div v-for="i in 4" :key="i" class="aspect-square bg-gray-100 rounded-2xl"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref } from 'vue'

definePageMeta({ layout: 'dashboard-layout' })

const route = useRoute()
const formData = ref({
  name: '',
  tagline: '',
  about: '',
  color: '#6366f1',
  layout: 'minimal'
})

const saveDesign = () => {
  if (process.client) {
    localStorage.setItem(`portfolio-${route.params.id}`, JSON.stringify(formData.value))
    alert('Design saved!')
  }
}

const publishPortfolio = () => {
  saveDesign()
  alert('Publish functionality coming soon!')
}

onMounted(() => {
  if (process.client) {
    const saved = localStorage.getItem(`portfolio-${route.params.id}`)
    if (saved) formData.value = JSON.parse(saved)
  }
})
</script>
