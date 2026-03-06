<template>
  <main class="flex-1 overflow-hidden flex flex-col">
    <div class="border-b border-gray-200 bg-white px-6 py-4 flex items-center justify-between">
      <div class="flex items-center gap-4">
        <NuxtLink to="/resumes"
          class="h-10 w-10 rounded-xl bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-all">
          <i class="fas fa-arrow-left text-sm"></i>
        </NuxtLink>
        <div>
          <h1 class="text-lg font-black text-gray-900 uppercase tracking-tight">Resume Editor</h1>
          <p class="text-xs text-gray-500">Customize your resume design</p>
        </div>
      </div>
      <div class="flex items-center gap-3">
        <button @click="saveDesign"
          class="px-6 py-3 bg-gray-100 text-gray-900 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-gray-200 transition-all">
          Save Draft
        </button>
        <button @click="exportResume"
          class="px-6 py-3 bg-blue-600 text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-blue-700 transition-all">
          Export PDF
        </button>
      </div>
    </div>

    <div class="flex-1 flex overflow-hidden">
      <div class="w-80 border-r border-gray-200 bg-white overflow-y-auto p-6 space-y-6">
        <div>
          <label class="text-xs font-black text-gray-700 uppercase tracking-widest mb-3 block">Full Name</label>
          <input v-model="formData.name" type="text"
            class="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm font-medium focus:border-blue-500 focus:outline-none" />
        </div>

        <div>
          <label class="text-xs font-black text-gray-700 uppercase tracking-widest mb-3 block">Job Title</label>
          <input v-model="formData.title" type="text"
            class="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm font-medium focus:border-blue-500 focus:outline-none" />
        </div>

        <div>
          <label class="text-xs font-black text-gray-700 uppercase tracking-widest mb-3 block">Email</label>
          <input v-model="formData.email" type="email"
            class="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm font-medium focus:border-blue-500 focus:outline-none" />
        </div>

        <div>
          <label class="text-xs font-black text-gray-700 uppercase tracking-widest mb-3 block">Phone</label>
          <input v-model="formData.phone" type="tel"
            class="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm font-medium focus:border-blue-500 focus:outline-none" />
        </div>

        <div>
          <label class="text-xs font-black text-gray-700 uppercase tracking-widest mb-3 block">Summary</label>
          <textarea v-model="formData.summary" rows="4"
            class="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm font-medium focus:border-blue-500 focus:outline-none resize-none"></textarea>
        </div>

        <div>
          <label class="text-xs font-black text-gray-700 uppercase tracking-widest mb-3 block">Primary Color</label>
          <input v-model="formData.color" type="color"
            class="w-full h-12 border border-gray-200 rounded-xl cursor-pointer" />
        </div>
      </div>

      <div class="flex-1 bg-gray-100 overflow-auto p-12 flex items-center justify-center">
        <div class="bg-white shadow-2xl" style="width: 210mm; min-height: 297mm; padding: 20mm;">
          <div class="space-y-6">
            <div class="border-b pb-6" :style="{ borderColor: formData.color }">
              <h1 class="text-4xl font-black uppercase tracking-tight" :style="{ color: formData.color }">
                {{ formData.name || 'Your Name' }}
              </h1>
              <p class="text-xl text-gray-600 mt-2">{{ formData.title || 'Your Job Title' }}</p>
              <div class="flex gap-6 mt-4 text-sm text-gray-600">
                <span v-if="formData.email">{{ formData.email }}</span>
                <span v-if="formData.phone">{{ formData.phone }}</span>
              </div>
            </div>

            <div v-if="formData.summary">
              <h2 class="text-lg font-black uppercase tracking-widest mb-3" :style="{ color: formData.color }">
                Professional Summary
              </h2>
              <p class="text-gray-700 leading-relaxed">{{ formData.summary }}</p>
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
  title: '',
  email: '',
  phone: '',
  summary: '',
  color: '#2563eb'
})

const saveDesign = () => {
  if (process.client) {
    localStorage.setItem(`resume-${route.params.id}`, JSON.stringify(formData.value))
    alert('Design saved!')
  }
}

const exportResume = () => {
  alert('Export functionality coming soon!')
}

onMounted(() => {
  if (process.client) {
    const saved = localStorage.getItem(`resume-${route.params.id}`)
    if (saved) formData.value = JSON.parse(saved)
  }
})
</script>
