<template>
  <main class="flex-1 overflow-y-auto scroll-smooth custom-scrollbar">
    <div class="max-w-[1200px] mx-auto px-6 py-10">
      
      <section class="mb-8">
        <h1 class="text-3xl font-black tracking-tight" :style="{ color: 'var(--text-primary)' }">Image Studio</h1>
        <p class="mt-2" :style="{ color: 'var(--text-secondary)' }">Crop, enhance, and remove backgrounds for your Porichoy profile.</p>
      </section>

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div class="lg:col-span-8">
          <div v-if="!imageSrc"
            @dragover.prevent="isDragging = true" @dragleave.prevent="isDragging = false" @drop.prevent="handleDrop"
            :class="['relative h-[300px] rounded-[2.5rem] border-2 border-dashed transition-all duration-300 flex flex-col items-center justify-center', isDragging ? 'border-blue-500/50 bg-blue-500/[0.04] scale-[0.99]' : '']"
            :style="!isDragging ? { backgroundColor: 'var(--bg-card)', borderColor: 'var(--border)' } : {}">
            <div class="h-20 w-20 rounded-3xl bg-blue-500/10 flex items-center justify-center text-blue-400 mb-6"><i class="fas fa-cloud-upload-alt text-3xl"></i></div>
            <h3 class="text-xl font-bold" :style="{ color: 'var(--text-secondary)' }">Drop your photo here</h3>
            <p class="mt-1 mb-6" :style="{ color: 'var(--text-muted)' }">PNG, JPG or WebP (Max 5MB)</p>
            <button @click="$refs.fileInput.click()" class="px-8 py-3 rounded-2xl font-bold transition-all" :style="{ backgroundColor: 'var(--icon-bg)', border: '1px solid var(--border)', color: 'var(--text-secondary)' }">Select Image</button>
            <input type="file" ref="fileInput" class="hidden" accept="image/*" @change="handleFileChange" />
          </div>
          <div v-else class="rounded-[2.5rem] overflow-hidden shadow-xl relative group" :style="{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border)' }">
            <div class="h-[500px] bg-black/30"><img :src="imageSrc" class="w-full h-full object-contain opacity-50" /></div>
            <div class="absolute top-6 right-6"><button @click="imageSrc = null" class="h-10 w-10 rounded-full bg-white/10 backdrop-blur-md text-white hover:bg-red-500 transition"><i class="fas fa-times"></i></button></div>
          </div>
        </div>

        <div class="lg:col-span-4 space-y-4">
          <div class="p-6 rounded-[2rem]" :style="{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border)' }">
            <h4 class="font-bold mb-4 flex items-center gap-2" :style="{ color: 'var(--text-secondary)' }"><i class="fas fa-magic text-blue-400"></i> AI Enhancements</h4>
            <button :disabled="!imageSrc" class="w-full p-4 rounded-2xl border border-blue-500/10 bg-blue-500/[0.04] hover:bg-blue-500/[0.08] transition-all flex items-center justify-between group disabled:opacity-50">
              <div class="flex items-center gap-3">
                <div class="h-10 w-10 rounded-xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform" :style="{ backgroundColor: 'var(--icon-bg)' }"><i class="fas fa-user-slash text-blue-400"></i></div>
                <div class="text-left">
                  <p class="text-sm font-bold" :style="{ color: 'var(--text-secondary)' }">Remove Background</p>
                  <p class="text-[10px] text-blue-400 font-medium uppercase tracking-tighter">AI Powered</p>
                </div>
              </div>
              <i class="fas fa-chevron-right text-xs" :style="{ color: 'var(--text-dimmed)' }"></i>
            </button>
            <div class="mt-8 pt-6" :style="{ borderTop: '1px solid var(--border)' }">
              <h4 class="font-bold mb-4" :style="{ color: 'var(--text-secondary)' }">Export Options</h4>
              <div class="grid grid-cols-2 gap-3 mb-6">
                <button class="p-3 rounded-xl text-xs font-bold transition-all" :style="{ border: '1px solid var(--border)', color: 'var(--text-muted)' }">Square (1:1)</button>
                <button class="p-3 rounded-xl text-xs font-bold transition-all" :style="{ border: '1px solid var(--border)', color: 'var(--text-muted)' }">Portrait (3:4)</button>
              </div>
              <button class="w-full py-4 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-500 transition-all shadow-lg shadow-blue-600/20 flex items-center justify-center gap-2"><i class="fas fa-check-circle"></i> Apply to Profile</button>
            </div>
          </div>
          <div class="p-6 rounded-[2rem]" :style="{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border)' }">
            <p class="text-xs font-bold text-amber-400 uppercase tracking-widest mb-2">Pro Tip</p>
            <p class="text-sm leading-relaxed" :style="{ color: 'var(--text-muted)' }">Removing backgrounds works best with clear contrast.</p>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
const config = useRuntimeConfig()
definePageMeta({ layout: 'dashboard-layout' })
useSeoMeta({ title: `Image Studio - ${config.public.appName}` })

const imageSrc = ref(null)
const isDragging = ref(false)

const handleFileChange = (e) => {
  const file = e.target.files[0]
  if (file) { const reader = new FileReader(); reader.onload = (ev) => { imageSrc.value = ev.target.result }; reader.readAsDataURL(file) }
}
const handleDrop = (e) => { isDragging.value = false; const file = e.dataTransfer.files[0]; if (file) handleFileChange({ target: { files: [file] } }) }
</script>

<style scoped>
main { background-image: radial-gradient(var(--dot-pattern) 1px, transparent 1px); background-size: 40px 40px; }
.custom-scrollbar::-webkit-scrollbar { width: 6px; }
.custom-scrollbar::-webkit-scrollbar-thumb { background: var(--scrollbar-thumb); border-radius: 10px; }
</style>