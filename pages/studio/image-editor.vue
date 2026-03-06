<template>
  <main class="flex-1 overflow-y-auto scroll-smooth custom-scrollbar bg-gray-50/50">
    <div class="max-w-[1200px] mx-auto px-6 py-10">
      
      <section class="mb-8 animate-in fade-in slide-in-from-top-4 duration-700">
        <h1 class="text-3xl font-black text-gray-900 tracking-tight">Image Studio</h1>
        <p class="text-gray-500 mt-2">Crop, enhance, and remove backgrounds for your Porichoy profile.</p>
      </section>

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        <div class="lg:col-span-8">
          <div 
            v-if="!imageSrc"
            @dragover.prevent="isDragging = true"
            @dragleave.prevent="isDragging = false"
            @drop.prevent="handleDrop"
            :class="[
              'relative h-[300px] rounded-[2.5rem] border-2 border-dashed transition-all duration-300 flex flex-col items-center justify-center bg-white shadow-sm',
              isDragging ? 'border-blue-500 bg-blue-50/50 scale-[0.99]' : 'border-gray-200 hover:border-blue-400'
            ]"
          >
            <div class="h-20 w-20 rounded-3xl bg-blue-50 flex items-center justify-center text-blue-500 mb-6">
              <i class="fas fa-cloud-upload-alt text-3xl"></i>
            </div>
            <h3 class="text-xl font-bold text-gray-800">Drop your photo here</h3>
            <p class="text-gray-400 mt-1 mb-6">PNG, JPG or WebP (Max 5MB)</p>
            <button @click="$refs.fileInput.click()" class="px-8 py-3 bg-gray-900 text-white rounded-2xl font-bold hover:bg-gray-800 transition-all shadow-lg shadow-gray-200">
              Select Image
            </button>
            <input type="file" ref="fileInput" class="hidden" accept="image/*" @change="handleFileChange" />
          </div>

          <div v-else class="rounded-[2.5rem] overflow-hidden bg-white border border-gray-100 shadow-xl relative group">
            <div class="h-[500px] bg-slate-900">
                <img :src="imageSrc" class="w-full h-full object-contain opacity-50" /> 
                <div class="absolute inset-0 flex items-center justify-center text-white/50">
                    [Cropper Interface Loaded Here]
                </div>
            </div>
            <div class="absolute top-6 right-6 flex gap-2">
                <button @click="imageSrc = null" class="h-10 w-10 rounded-full bg-white/20 backdrop-blur-md text-white hover:bg-red-500 transition-colors">
                    <i class="fas fa-times"></i>
                </button>
            </div>
          </div>
        </div>

        <div class="lg:col-span-4 space-y-4 animate-in fade-in slide-in-from-right-4 duration-1000">
          <div class="p-6 rounded-[2rem] bg-white border border-gray-100 shadow-sm">
            <h4 class="font-bold text-gray-800 mb-4 flex items-center gap-2">
                <i class="fas fa-magic text-blue-500"></i> AI Enhancements
            </h4>
            
            <button 
                @click="removeBackground"
                :disabled="!imageSrc || isProcessing"
                class="w-full p-4 rounded-2xl border border-blue-100 bg-blue-50/50 hover:bg-blue-50 transition-all flex items-center justify-between group disabled:opacity-50"
            >
                <div class="flex items-center gap-3">
                    <div class="h-10 w-10 rounded-xl bg-white flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                        <i class="fas fa-user-slash text-blue-600"></i>
                    </div>
                    <div class="text-left">
                        <p class="text-sm font-bold text-gray-800">Remove Background</p>
                        <p class="text-[10px] text-blue-600 font-medium uppercase tracking-tighter">AI Powered</p>
                    </div>
                </div>
                <i class="fas fa-chevron-right text-blue-300 text-xs"></i>
            </button>

            <div class="mt-8 pt-6 border-t border-gray-50">
                <h4 class="font-bold text-gray-800 mb-4">Export Options</h4>
                <div class="grid grid-cols-2 gap-3 mb-6">
                    <button class="p-3 rounded-xl border border-gray-100 text-xs font-bold text-gray-600 hover:border-blue-500 hover:text-blue-500 transition-all">Square (1:1)</button>
                    <button class="p-3 rounded-xl border border-gray-100 text-xs font-bold text-gray-600 hover:border-blue-500 hover:text-blue-500 transition-all">Portrait (3:4)</button>
                </div>
                
                <button class="w-full py-4 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 flex items-center justify-center gap-2">
                    <i class="fas fa-check-circle"></i>
                    Apply to Profile
                </button>
            </div>
          </div>

          <div class="p-6 rounded-[2rem] bg-gradient-to-br from-gray-900 to-gray-800 text-white">
            <p class="text-xs font-bold text-yellow-400 uppercase tracking-widest mb-2">Pro Tip</p>
            <p class="text-sm text-gray-300 leading-relaxed">Removing the background works best with clear contrast between the subject and the setting.</p>
          </div>
        </div>

      </div>
    </div>
  </main>
</template>

<script setup>

const config = useRuntimeConfig()
definePageMeta({
  layout: 'dashboard-layout'
})

useSeoMeta({
  title: `Image Studio - ${config.public.appName}`,
  description: 'Crop, enhance, and remove backgrounds for your Porichoy profile pictures with our AI-powered Image Studio.',
  ogTitle: `Image Studio - ${config.public.appName}`,
  ogDescription: 'Crop, enhance, and remove backgrounds for your Porichoy profile pictures with our AI-powered Image Studio.',
  ogImage: '/og-image-studio.png'
})
const imageSrc = ref(null)
const isDragging = ref(false)
const isProcessing = ref(false)

const handleFileChange = (e) => {
  const file = e.target.files[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = (event) => {
      imageSrc.value = event.target.result
    }
    reader.readAsDataURL(file)
  }
}

const handleDrop = (e) => {
  isDragging.value = false
  const file = e.dataTransfer.files[0]
  if (file) {
    handleFileChange({ target: { files: [file] } })
  }
}

const removeBackground = async () => {
    isProcessing.value = true
    // Logic for calling remove.bg or your internal API would go here
    setTimeout(() => { isProcessing.value = false }, 2000)
}
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar { width: 6px; }
.custom-scrollbar::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
main {
  background-image: radial-gradient(#e5e7eb 1px, transparent 1px);
  background-size: 40px 40px;
}
</style>