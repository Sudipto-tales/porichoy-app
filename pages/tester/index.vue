<template>
  <div class="min-h-screen bg-[#f0f2f5] font-sans selection:bg-blue-100 p-4 md:p-8 flex items-center justify-center overflow-hidden">
    <div class="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
      <div class="absolute -top-24 -left-24 w-96 h-96 bg-blue-500/5 blur-[100px] rounded-full"></div>
      <div class="absolute -bottom-24 -right-24 w-96 h-96 bg-purple-500/5 blur-[100px] rounded-full"></div>
    </div>

    <div class="w-full max-w-[1400px] flex flex-col gap-6 relative z-10">
      <header class="flex justify-between items-end px-4">
        <div>
          <h1 class="text-3xl font-black text-gray-900 tracking-tight">
            QA <span class="text-blue-600">Terminal</span>
          </h1>
          <p class="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em]">Ignis IT Internal Audit</p>
        </div>
        <NuxtLink to="/" class="px-5 py-2 rounded-xl bg-white text-[10px] font-black text-gray-500 uppercase tracking-widest hover:text-blue-600 border border-gray-100 shadow-sm transition-all">
          <i class="fas fa-times mr-2"></i> Exit
        </NuxtLink>
      </header>

      <form @submit.prevent="submitReport" class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        <div class="lg:col-span-4 flex flex-col gap-6">
          <div class="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm flex-1 space-y-8">
            <h3 class="text-[10px] font-black text-blue-600 uppercase tracking-widest flex items-center gap-2">
              <span class="h-1.5 w-1.5 rounded-full bg-blue-600"></span> 01. Tester Info
            </h3>
            
            <div class="space-y-6">
              <div class="group">
                <label class="text-[9px] font-black text-gray-400 uppercase tracking-widest block mb-2">Lead Name</label>
                <input v-model="form.name" type="text" placeholder="Sudipta Ghosh" required
                  class="w-full bg-gray-50/50 px-6 py-4 rounded-2xl border border-transparent focus:border-blue-500/20 focus:bg-white transition-all font-bold text-gray-800 outline-none" />
              </div>
              <div class="group">
                <label class="text-[9px] font-black text-gray-400 uppercase tracking-widest block mb-2">Secure Email</label>
                <input v-model="form.email" type="email" placeholder="tester@ignis-it.com" required
                  class="w-full bg-gray-50/50 px-6 py-4 rounded-2xl border border-transparent focus:border-blue-500/20 focus:bg-white transition-all font-bold text-gray-800 outline-none" />
              </div>
              <div class="group">
                <label class="text-[9px] font-black text-gray-400 uppercase tracking-widest block mb-2">Test Case Title</label>
                <input v-model="form.title" type="text" placeholder="Module Identification" required
                  class="w-full bg-gray-50/50 px-6 py-4 rounded-2xl border border-transparent focus:border-blue-500/20 focus:bg-white transition-all font-bold text-gray-800 outline-none" />
              </div>
            </div>
          </div>
        </div>

        <div class="lg:col-span-5 flex flex-col">
          <div class="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm flex-1 flex flex-col gap-6">
             <h3 class="text-[10px] font-black text-purple-600 uppercase tracking-widest flex items-center gap-2">
              <span class="h-1.5 w-1.5 rounded-full bg-purple-600 animate-pulse"></span> 02. Observation Logs
            </h3>
            <textarea v-model="form.description" 
              placeholder="Input full technical observation logs here..."
              class="flex-1 w-full p-8 rounded-[2rem] bg-gray-900 text-gray-300 font-mono text-xs leading-relaxed outline-none border-none resize-none focus:ring-4 focus:ring-blue-500/5 no-scrollbar"></textarea>
          </div>
        </div>

        <div class="lg:col-span-3 flex flex-col gap-6">
          <div class="bg-white p-6 rounded-[2.5rem] border border-gray-100 shadow-sm relative group cursor-pointer overflow-hidden h-44" @click="$refs.screenshotInput.click()">
            <img v-if="previews.screenshot" :src="previews.screenshot" class="absolute inset-0 w-full h-full object-cover" />
            <div class="relative z-10 flex flex-col items-center justify-center h-full gap-2">
              <i class="fas fa-camera text-gray-300 group-hover:text-blue-500 transition-colors"></i>
              <span class="text-[9px] font-black text-gray-400 uppercase tracking-tighter">Capture Sync</span>
            </div>
            <input type="file" ref="screenshotInput" class="hidden" accept="image/*" @change="handleFileChange($event, 'screenshot')" />
          </div>

          <div class="bg-white p-6 rounded-[2.5rem] border border-gray-100 shadow-sm relative group cursor-pointer h-44 flex flex-col items-center justify-center gap-2" @click="$refs.docInput.click()">
            <div class="h-10 w-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center transition-transform group-hover:scale-110">
              <i class="fas" :class="form.doc ? 'fa-check' : 'fa-file-alt'"></i>
            </div>
            <span class="text-[9px] font-black text-gray-400 uppercase tracking-tighter truncate max-w-full px-4">
              {{ form.doc ? form.doc.name : 'Attach Report' }}
            </span>
            <input type="file" ref="docInput" class="hidden" accept=".pdf,.doc,.docx" @change="handleFileChange($event, 'doc')" />
          </div>

          <button type="submit" :disabled="loading"
            class="flex-1 bg-gray-900 rounded-[2.5rem] text-white flex flex-col items-center justify-center gap-3 hover:bg-blue-600 transition-all active:scale-95 group disabled:opacity-50 min-h-[120px]">
            <i class="fas fa-fingerprint text-2xl group-hover:animate-pulse"></i>
            <span class="text-[10px] font-black uppercase tracking-[0.2em]">Seal Vault</span>
          </button>
        </div>

      </form>

      <footer class="flex justify-between items-center px-4">
        <div class="flex gap-8">
          <div class="flex flex-col">
            <span class="text-[8px] font-black text-gray-400 uppercase">Storage Path</span>
            <span class="text-[10px] font-bold text-gray-600">assets/testing/reports.json</span>
          </div>
          <div class="flex flex-col border-l border-gray-200 pl-8">
            <span class="text-[8px] font-black text-gray-400 uppercase">Encrypted</span>
            <span class="text-[10px] font-bold text-green-500">AES-256 Active</span>
          </div>
        </div>
        <p class="text-[10px] font-black text-gray-300">© 2026 IGNIS IT CORE</p>
      </footer>
    </div>
  </div>
</template>

<script setup>
useSeoMeta({
    title: 'QA Terminal - Ignis IT Internal Audit',
    description: 'Submit detailed QA reports securely to the Ignis IT vault.',
    ogTitle: 'QA Terminal - Ignis IT Internal Audit',
    ogDescription: 'Submit detailed QA reports securely to the Ignis IT vault.',
    ogImage: '/qa-terminal-preview.png'
})
useHead({
  link: [
    {
      rel: 'icon',
      type: 'image/png',
      href: '/porichoy.favicon.png'
    }
  ]
})
const loading = ref(false)
const form = reactive({
    name: '',
    email: '',
    title: '',
    description: '',
    screenshot: null,
    doc: null
})

const previews = reactive({
    screenshot: null
})

const handleFileChange = (e, type) => {
    const file = e.target.files[0]
    if (!file) return
    form[type] = file
    if (type === 'screenshot') {
        previews.screenshot = URL.createObjectURL(file)
    }
}

const submitReport = async () => {
    loading.value = true
    const formData = new FormData()
    formData.append('name', form.name)
    formData.append('email', form.email)
    formData.append('title', form.title)
    formData.append('description', form.description)
    if (form.screenshot) formData.append('screenshot', form.screenshot)
    if (form.doc) formData.append('doc', form.doc)

    try {
        const response = await $fetch('/api/submit-test', {
            method: 'POST',
            body: formData
        })
        alert('Report Saved Successfully to /assets/testing!')
        // Reset form
        Object.keys(form).forEach(key => form[key] = null)
        previews.screenshot = null
    } catch (err) {
        console.error(err)
        alert('Submission failed.')
    } finally {
        loading.value = false
    }
}
</script>


<style scoped>
/* Ensure the page fits without global scroll */
@media (min-min-width: 1024px) {
  form {
    height: 70vh;
  }
}

.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
