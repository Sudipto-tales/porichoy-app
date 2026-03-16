<template>
  <div class="space-y-5">
    <!-- Page Background -->
    <div>
      <label class="settings-label">Page Background</label>
      <div class="flex items-center gap-2">
        <div class="relative">
          <input 
            type="color" 
            :value="store.state.canvasConfig.background" 
            @input="store.state.canvasConfig.background = $event.target.value"
            class="w-8 h-8 rounded-lg cursor-pointer border-2 border-white/10 bg-transparent"
          />
        </div>
        <input 
          :value="store.state.canvasConfig.background" 
          @input="store.state.canvasConfig.background = $event.target.value"
          class="settings-input flex-1 font-mono uppercase"
          maxlength="7"
        />
      </div>
    </div>

    <!-- Quick Colors -->
    <div>
      <label class="settings-label">Quick Colors</label>
      <div class="flex flex-wrap gap-1.5">
        <button 
          v-for="color in quickColors" 
          :key="color"
          @click="store.state.canvasConfig.background = color"
          :class="[
            'w-7 h-7 rounded-lg border-2 transition-all hover:scale-110',
            store.state.canvasConfig.background === color ? 'border-blue-400 ring-2 ring-blue-400/30' : 'border-white/10'
          ]"
          :style="{ background: color }"
        ></button>
      </div>
    </div>

    <div class="border-t border-white/[0.06]"></div>

    <!-- Page Size -->
    <div>
      <label class="settings-label">Page Size</label>
      <div class="grid grid-cols-2 gap-2">
        <button 
          v-for="size in pageSizes" 
          :key="size.label"
          @click="applyPageSize(size)"
          :class="[
            'p-3 rounded-xl border text-[11px] font-medium transition-all',
            isCurrentSize(size) 
              ? 'border-blue-500/30 bg-blue-500/10 text-blue-300' 
              : 'border-white/[0.06] bg-white/[0.02] text-white/40 hover:text-white/60 hover:border-white/[0.12]'
          ]"
        >
          <div class="font-semibold">{{ size.label }}</div>
          <div class="text-[9px] mt-0.5 opacity-60">{{ size.w }}×{{ size.h }}px</div>
        </button>
      </div>
    </div>

    <div class="border-t border-white/[0.06]"></div>

    <!-- Grid Toggle -->
    <div>
      <label class="settings-label">Canvas Options</label>
      <div class="space-y-2">
        <label class="flex items-center justify-between p-3 rounded-xl border border-white/[0.06] bg-white/[0.02] cursor-pointer hover:bg-white/[0.04] transition-all">
          <div class="flex items-center gap-2">
            <i class="fas fa-th text-[11px] text-white/30"></i>
            <span class="text-[12px] text-white/50 font-medium">Show Grid</span>
          </div>
          <div 
            @click="store.toggleGrid()"
            :class="[
              'w-8 h-5 rounded-full transition-all relative cursor-pointer',
              store.state.canvasConfig.showGrid ? 'bg-blue-500' : 'bg-white/10'
            ]"
          >
            <div :class="[
              'absolute top-0.5 w-4 h-4 rounded-full bg-white shadow-sm transition-all',
              store.state.canvasConfig.showGrid ? 'left-3.5' : 'left-0.5'
            ]"></div>
          </div>
        </label>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useResumeStore } from '~/composables/useResumeStore'
const store = useResumeStore()

const quickColors = [
  '#ffffff', '#f8fafc', '#f1f5f9', '#e2e8f0',
  '#fefce8', '#fef3c7', '#ecfdf5', '#ede9fe',
  '#fef2f2', '#1e293b', '#0f172a', '#000000',
]

const pageSizes = [
  { label: 'A4', w: 794, h: 1123 },
  { label: 'Letter', w: 816, h: 1056 },
  { label: 'Legal', w: 816, h: 1344 },
  { label: 'Square', w: 800, h: 800 },
]

function isCurrentSize(size) {
  return store.state.canvasConfig.width === size.w && store.state.canvasConfig.height === size.h
}

function applyPageSize(size) {
  store.state.canvasConfig.width = size.w
  store.state.canvasConfig.height = size.h
}
</script>

<style scoped>
.settings-label {
  @apply block text-[10px] font-bold uppercase tracking-widest text-white/30 mb-2;
}
.settings-input {
  @apply h-8 px-3 bg-white/[0.04] border border-white/[0.08] rounded-lg text-[11px] text-white/60 focus:text-white focus:border-blue-500/40 outline-none transition-all;
}
</style>
