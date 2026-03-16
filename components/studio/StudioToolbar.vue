<template>
  <header class="h-14 bg-[#1a1a24] border-b border-white/[0.06] flex items-center justify-between px-4 flex-shrink-0 z-50">

    <!-- Left: Logo + Back + Project Name -->
    <div class="flex items-center gap-3">
      <NuxtLink to="/dashboard" 
        class="h-8 w-8 rounded-lg bg-white/[0.06] hover:bg-white/[0.1] flex items-center justify-center transition-all group"
        title="Back to Dashboard">
        <i class="fas fa-arrow-left text-[11px] text-white/50 group-hover:text-white transition-colors"></i>
      </NuxtLink>

      <div class="h-5 w-px bg-white/10"></div>

      <div class="flex items-center gap-2">
        <img src="/porichoy.favicon.png" alt="Logo" class="w-6 h-6 object-contain" />
        <input 
          v-model="store.state.projectName"
          class="bg-transparent text-sm font-semibold text-white/80 focus:text-white border-none outline-none px-1 py-0.5 rounded hover:bg-white/[0.06] focus:bg-white/[0.08] transition-all w-48"
          spellcheck="false"
        />
      </div>

      <span class="text-[9px] font-bold uppercase tracking-widest text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded-md border border-blue-500/20">
        Studio
      </span>
    </div>

    <!-- Center: Tools -->
    <div class="flex items-center gap-1">
      <button @click="store.undo()" 
        class="toolbar-btn" title="Undo (Ctrl+Z)">
        <i class="fas fa-undo text-[11px]"></i>
      </button>
      <button @click="store.redo()" 
        class="toolbar-btn" title="Redo (Ctrl+Y)">
        <i class="fas fa-redo text-[11px]"></i>
      </button>

      <div class="h-5 w-px bg-white/10 mx-1"></div>

      <!-- Zoom -->
      <button @click="store.setZoom(store.state.canvasConfig.zoom - 0.1)" 
        class="toolbar-btn" title="Zoom Out">
        <i class="fas fa-search-minus text-[11px]"></i>
      </button>
      <span class="text-[11px] text-white/50 font-mono min-w-[40px] text-center tabular-nums">
        {{ Math.round(store.state.canvasConfig.zoom * 100) }}%
      </span>
      <button @click="store.setZoom(store.state.canvasConfig.zoom + 0.1)" 
        class="toolbar-btn" title="Zoom In">
        <i class="fas fa-search-plus text-[11px]"></i>
      </button>

      <div class="h-5 w-px bg-white/10 mx-1"></div>

      <button @click="store.toggleGrid()" 
        :class="['toolbar-btn', store.state.canvasConfig.showGrid ? 'text-blue-400 bg-blue-500/10' : '']"
        title="Toggle Grid">
        <i class="fas fa-th text-[11px]"></i>
      </button>
    </div>

    <!-- Right: Actions -->
    <div class="flex items-center gap-2">
      <button @click="$emit('save')"
        class="h-8 px-4 rounded-lg bg-white/[0.06] hover:bg-white/[0.1] text-[11px] font-bold text-white/60 hover:text-white uppercase tracking-wider transition-all flex items-center gap-2">
        <i class="fas fa-save text-[10px]"></i>
        Save
      </button>

      <!-- Export Dropdown -->
      <div class="relative" ref="exportDropdownRef">
        <button 
          @click="showExportMenu = !showExportMenu"
          class="h-8 px-4 rounded-lg bg-blue-600 hover:bg-blue-500 text-[11px] font-bold text-white uppercase tracking-wider transition-all flex items-center gap-2 shadow-lg shadow-blue-600/20">
          <i class="fas fa-download text-[10px]"></i>
          Export
          <i class="fas fa-chevron-down text-[8px] ml-0.5"></i>
        </button>

        <Transition name="dropdown">
          <div v-if="showExportMenu"
            class="absolute right-0 top-full mt-2 w-48 bg-[#24243a] rounded-xl border border-white/[0.08] shadow-2xl overflow-hidden z-50">
            <button @click="handleExport('png')" class="export-item">
              <i class="fas fa-image text-emerald-400"></i>
              <span>Export as PNG</span>
            </button>
            <button @click="handleExport('json')" class="export-item">
              <i class="fas fa-code text-amber-400"></i>
              <span>Export as JSON</span>
            </button>
            <div class="border-t border-white/[0.06]"></div>
            <button class="export-item opacity-40 cursor-not-allowed">
              <i class="fas fa-file-pdf text-red-400"></i>
              <span>Export as PDF</span>
              <span class="text-[8px] bg-white/10 px-1.5 py-0.5 rounded ml-auto">Soon</span>
            </button>
          </div>
        </Transition>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useResumeStore } from '~/composables/useResumeStore'

const store = useResumeStore()
const showExportMenu = ref(false)
const exportDropdownRef = ref(null)

const emit = defineEmits(['save', 'export'])

function handleExport(format) {
  showExportMenu.value = false
  emit('export', format)
}

function handleClickOutside(e) {
  if (exportDropdownRef.value && !exportDropdownRef.value.contains(e.target)) {
    showExportMenu.value = false
  }
}

onMounted(() => document.addEventListener('click', handleClickOutside))
onUnmounted(() => document.removeEventListener('click', handleClickOutside))
</script>

<style scoped>
.toolbar-btn {
  @apply h-8 w-8 rounded-lg flex items-center justify-center text-white/40 hover:text-white hover:bg-white/[0.08] transition-all;
}

.export-item {
  @apply w-full flex items-center gap-2.5 px-4 py-2.5 text-[12px] font-medium text-white/70 hover:text-white hover:bg-white/[0.06] transition-all;
}

.dropdown-enter-active,
.dropdown-leave-active {
  transition: all 0.2s ease;
}
.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-4px) scale(0.97);
}
</style>
