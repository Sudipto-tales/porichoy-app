<template>
  <div class="space-y-1">
    <p class="text-[10px] text-white/30 uppercase tracking-widest font-bold mb-3">
      {{ store.state.layers.length }} Element{{ store.state.layers.length !== 1 ? 's' : '' }}
    </p>

    <div v-if="store.state.layers.length === 0" 
      class="p-6 text-center">
      <i class="fas fa-layer-group text-2xl text-white/10 mb-2"></i>
      <p class="text-[11px] text-white/20">No elements yet</p>
      <p class="text-[10px] text-white/10 mt-1">Add elements from the sidebar</p>
    </div>

    <div
      v-for="(layer, index) in reversedLayers" 
      :key="layer.id"
      @click="store.selectLayer(layer.id)"
      :class="[
        'flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer transition-all group',
        store.state.selectedId === layer.id 
          ? 'bg-blue-500/15 border border-blue-500/20' 
          : 'border border-transparent hover:bg-white/[0.04]'
      ]"
    >
      <!-- Type Icon -->
      <div :class="[
        'h-7 w-7 rounded-md flex items-center justify-center flex-shrink-0 text-[10px]',
        typeConfig[layer.type]?.bgClass || 'bg-white/[0.06]'
      ]">
        <i :class="[typeConfig[layer.type]?.icon || 'fas fa-cube', typeConfig[layer.type]?.color || 'text-white/40']"></i>
      </div>

      <!-- Label -->
      <div class="flex-1 min-w-0">
        <p class="text-[11px] font-medium text-white/60 truncate group-hover:text-white/80 transition-colors">
          {{ layer.label || layer.text?.substring(0, 20) || typeConfig[layer.type]?.defaultLabel || 'Element' }}
        </p>
        <p class="text-[9px] text-white/20 uppercase">{{ layer.type }}</p>
      </div>

      <!-- Actions -->
      <div class="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
        <button @click.stop="store.moveLayerUp(layer.id)" 
          class="layer-action-btn" title="Bring Forward">
          <i class="fas fa-chevron-up"></i>
        </button>
        <button @click.stop="store.moveLayerDown(layer.id)" 
          class="layer-action-btn" title="Send Back">
          <i class="fas fa-chevron-down"></i>
        </button>
        <button @click.stop="store.removeLayer(layer.id)" 
          class="layer-action-btn hover:!text-red-400 hover:!bg-red-500/10" title="Delete">
          <i class="fas fa-trash-alt"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useResumeStore } from '~/composables/useResumeStore'

const store = useResumeStore()

const reversedLayers = computed(() => [...store.state.layers].reverse())

const typeConfig = {
  text: { icon: 'fas fa-font', color: 'text-blue-400', bgClass: 'bg-blue-500/10', defaultLabel: 'Text' },
  rect: { icon: 'fas fa-square', color: 'text-emerald-400', bgClass: 'bg-emerald-500/10', defaultLabel: 'Shape' },
  circle: { icon: 'fas fa-circle', color: 'text-purple-400', bgClass: 'bg-purple-500/10', defaultLabel: 'Circle' },
  image: { icon: 'fas fa-image', color: 'text-amber-400', bgClass: 'bg-amber-500/10', defaultLabel: 'Image' },
  group: { icon: 'fas fa-object-group', color: 'text-rose-400', bgClass: 'bg-rose-500/10', defaultLabel: 'Section' },
}
</script>

<style scoped>
.layer-action-btn {
  @apply h-5 w-5 rounded flex items-center justify-center text-[8px] text-white/20 hover:text-white/60 hover:bg-white/[0.08] transition-all;
}
</style>
