<template>
  <div class="space-y-4">
    <p class="text-[10px] text-white/30 uppercase tracking-widest font-bold">Lines & Shapes</p>

    <div class="grid grid-cols-2 gap-2">
      <button 
        v-for="shape in shapes" 
        :key="shape.id"
        @click="store.addShape(shape.id)"
        class="flex flex-col items-center justify-center gap-2 p-4 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.06] hover:border-white/[0.12] transition-all group aspect-square"
      >
        <div class="flex items-center justify-center flex-1">
          <div :class="shape.previewClass"></div>
        </div>
        <span class="text-[10px] text-white/30 group-hover:text-white/60 font-medium transition-colors">{{ shape.label }}</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { useResumeStore } from '~/composables/useResumeStore'
const store = useResumeStore()

const shapes = [
  { id: 'rect', label: 'Rectangle', previewClass: 'w-12 h-8 bg-white/20 rounded-sm' },
  { id: 'roundedRect', label: 'Rounded', previewClass: 'w-12 h-8 bg-white/20 rounded-lg' },
  { id: 'circle', label: 'Circle', previewClass: 'w-10 h-10 bg-white/20 rounded-full' },
  { id: 'line', label: 'Thin Line', previewClass: 'w-14 h-[2px] bg-white/30' },
  { id: 'thickLine', label: 'Thick Line', previewClass: 'w-14 h-[4px] bg-white/40 rounded-full' },
  { id: 'divider', label: 'Divider', previewClass: 'w-14 h-[2px] bg-blue-400/60' },
]
</script>
