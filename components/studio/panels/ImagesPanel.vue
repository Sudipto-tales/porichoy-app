<template>
  <div class="space-y-4">
    <p class="text-[10px] text-white/30 uppercase tracking-widest font-bold">Upload Image</p>

    <!-- Drop Zone -->
    <div 
      @dragover.prevent="isDragging = true"
      @dragleave.prevent="isDragging = false"
      @drop.prevent="handleDrop"
      :class="[
        'relative rounded-xl border-2 border-dashed transition-all duration-300 p-6 flex flex-col items-center justify-center gap-2 cursor-pointer',
        isDragging ? 'border-blue-500/50 bg-blue-500/[0.06]' : 'border-white/[0.08] hover:border-white/[0.15] bg-white/[0.02]'
      ]"
      @click="$refs.fileInput.click()"
    >
      <div class="h-10 w-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
        <i class="fas fa-cloud-upload-alt text-blue-400"></i>
      </div>
      <p class="text-[11px] text-white/40 text-center">
        Drop image here or <span class="text-blue-400 font-medium">browse</span>
      </p>
      <p class="text-[9px] text-white/20">PNG, JPG, WebP</p>
      <input type="file" ref="fileInput" class="hidden" accept="image/*" @change="handleFileChange" />
    </div>

    <!-- Quick Assets -->
    <div class="border-t border-white/[0.06] pt-4">
      <p class="text-[10px] text-white/30 uppercase tracking-widest font-bold mb-3">Quick Placeholders</p>
      <div class="grid grid-cols-2 gap-2">
        <button 
          v-for="asset in quickAssets" 
          :key="asset.label"
          @click="addPlaceholder(asset)"
          class="flex flex-col items-center gap-2 p-3 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.06] hover:border-white/[0.12] transition-all group"
        >
          <div :class="['h-10 w-10 rounded-lg flex items-center justify-center', asset.bgClass]">
            <i :class="[asset.icon, asset.iconColor, 'text-sm']"></i>
          </div>
          <span class="text-[10px] text-white/30 group-hover:text-white/60 font-medium">{{ asset.label }}</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useResumeStore } from '~/composables/useResumeStore'

const store = useResumeStore()
const isDragging = ref(false)
const fileInput = ref(null)

const quickAssets = [
  { label: 'Avatar', icon: 'fas fa-user-circle', bgClass: 'bg-indigo-500/15', iconColor: 'text-indigo-400' },
  { label: 'Logo', icon: 'fas fa-star', bgClass: 'bg-amber-500/15', iconColor: 'text-amber-400' },
  { label: 'QR Code', icon: 'fas fa-qrcode', bgClass: 'bg-emerald-500/15', iconColor: 'text-emerald-400' },
  { label: 'Icon', icon: 'fas fa-icons', bgClass: 'bg-rose-500/15', iconColor: 'text-rose-400' },
]

function handleFileChange(e) {
  const file = e.target.files[0]
  if (!file) return
  const reader = new FileReader()
  reader.onload = (event) => {
    store.addImageLayer(event.target.result)
  }
  reader.readAsDataURL(file)
}

function handleDrop(e) {
  isDragging.value = false
  const file = e.dataTransfer.files[0]
  if (file && file.type.startsWith('image/')) {
    const reader = new FileReader()
    reader.onload = (event) => {
      store.addImageLayer(event.target.result)
    }
    reader.readAsDataURL(file)
  }
}

function addPlaceholder(asset) {
  // Create a placeholder colored rect as image stand-in
  store.addLayer({
    type: 'rect',
    fill: '#dbeafe',
    width: 100,
    height: 100,
    cornerRadius: asset.label === 'Avatar' ? 50 : 8,
    label: asset.label,
  })
}
</script>
