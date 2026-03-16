<template>
  <aside class="w-[72px] bg-[#16161f] border-r border-white/[0.06] flex flex-col flex-shrink-0 h-full">
    
    <!-- Icon Rail -->
    <div class="flex flex-col items-center gap-1 pt-3 flex-1">
      <button 
        v-for="tab in tabs" 
        :key="tab.id"
        @click="activeTab = activeTab === tab.id ? null : tab.id"
        :class="[
          'w-11 h-11 rounded-xl flex flex-col items-center justify-center gap-0.5 transition-all duration-200 group relative',
          activeTab === tab.id 
            ? 'bg-blue-500/15 text-blue-400' 
            : 'text-white/30 hover:text-white/60 hover:bg-white/[0.05]'
        ]"
        :title="tab.label"
      >
        <i :class="[tab.icon, 'text-sm transition-transform duration-200', activeTab === tab.id ? 'scale-110' : 'group-hover:scale-105']"></i>
        <span class="text-[8px] font-bold uppercase tracking-wider">{{ tab.shortLabel }}</span>

        <!-- Active Indicator -->
        <span v-if="activeTab === tab.id" 
          class="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-blue-400 rounded-r-full"></span>
      </button>
    </div>

    <!-- Bottom: Layers Toggle -->
    <div class="flex flex-col items-center gap-1 pb-3 border-t border-white/[0.06] pt-3">
      <button 
        @click="activeTab = activeTab === 'layers' ? null : 'layers'"
        :class="[
          'w-11 h-11 rounded-xl flex flex-col items-center justify-center gap-0.5 transition-all duration-200',
          activeTab === 'layers' ? 'bg-purple-500/15 text-purple-400' : 'text-white/30 hover:text-white/60 hover:bg-white/[0.05]'
        ]"
        title="Layers"
      >
        <i class="fas fa-layer-group text-sm"></i>
        <span class="text-[8px] font-bold uppercase tracking-wider">Layers</span>
      </button>
    </div>
  </aside>

  <!-- Expanded Panel -->
  <Transition name="panel-slide">
    <aside v-if="activeTab" 
      class="w-[280px] bg-[#1a1a28] border-r border-white/[0.06] flex flex-col flex-shrink-0 h-full overflow-hidden">
      
      <!-- Panel Header -->
      <div class="h-12 flex items-center justify-between px-4 border-b border-white/[0.06] flex-shrink-0">
        <h3 class="text-[11px] font-bold uppercase tracking-widest text-white/60">
          {{ currentTab?.label }}
        </h3>
        <button @click="activeTab = null" 
          class="h-6 w-6 rounded-md flex items-center justify-center text-white/30 hover:text-white hover:bg-white/[0.08] transition-all">
          <i class="fas fa-times text-[10px]"></i>
        </button>
      </div>

      <!-- Panel Content -->
      <div class="flex-1 overflow-y-auto custom-scroll p-4">
        <TextPanel v-if="activeTab === 'text'" />
        <SectionsPanel v-if="activeTab === 'sections'" />
        <ShapesPanel v-if="activeTab === 'shapes'" />
        <ImagesPanel v-if="activeTab === 'images'" />
        <SettingsPanel v-if="activeTab === 'settings'" />
        <LayersPanel v-if="activeTab === 'layers'" />
      </div>
    </aside>
  </Transition>
</template>

<script setup>
import { ref, computed } from 'vue'
import TextPanel from './panels/TextPanel.vue'
import SectionsPanel from './panels/SectionsPanel.vue'
import ShapesPanel from './panels/ShapesPanel.vue'
import ImagesPanel from './panels/ImagesPanel.vue'
import SettingsPanel from './panels/SettingsPanel.vue'
import LayersPanel from './panels/LayersPanel.vue'

const activeTab = ref('sections')

const tabs = [
  { id: 'text', label: 'Text', shortLabel: 'Text', icon: 'fas fa-font' },
  { id: 'sections', label: 'Resume Sections', shortLabel: 'Blocks', icon: 'fas fa-puzzle-piece' },
  { id: 'shapes', label: 'Shapes & Lines', shortLabel: 'Shape', icon: 'fas fa-shapes' },
  { id: 'images', label: 'Images', shortLabel: 'Image', icon: 'fas fa-image' },
  { id: 'settings', label: 'Page Settings', shortLabel: 'Setup', icon: 'fas fa-cog' },
]

const currentTab = computed(() => {
  if (activeTab.value === 'layers') return { label: 'Layers' }
  return tabs.find(t => t.id === activeTab.value)
})
</script>

<style scoped>
.custom-scroll::-webkit-scrollbar { width: 4px; }
.custom-scroll::-webkit-scrollbar-track { background: transparent; }
.custom-scroll::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.08); border-radius: 4px; }
.custom-scroll::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.15); }

.panel-slide-enter-active,
.panel-slide-leave-active {
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
}
.panel-slide-enter-from,
.panel-slide-leave-to {
  width: 0;
  opacity: 0;
}
</style>
