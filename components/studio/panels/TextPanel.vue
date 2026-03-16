<template>
  <div class="space-y-4">
    <p class="text-[10px] text-white/30 uppercase tracking-widest font-bold">Click to add to canvas</p>

    <button 
      v-for="preset in textPresets" 
      :key="preset.id"
      @click="store.addTextLayer(preset.id)"
      class="w-full text-left p-3 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.06] hover:border-white/[0.12] transition-all group"
    >
      <div class="flex items-center gap-3">
        <div :class="['h-9 w-9 rounded-lg flex items-center justify-center flex-shrink-0', preset.bgClass]">
          <span :class="['font-bold', preset.iconClass]">{{ preset.iconText }}</span>
        </div>
        <div>
          <p class="text-[12px] font-semibold text-white/70 group-hover:text-white transition-colors">{{ preset.label }}</p>
          <p class="text-[10px] text-white/30">{{ preset.desc }}</p>
        </div>
      </div>
    </button>

    <div class="border-t border-white/[0.06] pt-4 mt-4">
      <p class="text-[10px] text-white/30 uppercase tracking-widest font-bold mb-3">Typography Tips</p>
      <div class="p-3 rounded-xl bg-blue-500/[0.06] border border-blue-500/10">
        <p class="text-[11px] text-blue-300/60 leading-relaxed">Use <strong class="text-blue-300">Heading</strong> for your name, <strong class="text-blue-300">Subheading</strong> for section titles, and <strong class="text-blue-300">Body</strong> for descriptions.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useResumeStore } from '~/composables/useResumeStore'
const store = useResumeStore()

const textPresets = [
  { id: 'heading', label: 'Add Heading', desc: '28px Bold', iconText: 'H', bgClass: 'bg-blue-500/20', iconClass: 'text-blue-400 text-lg' },
  { id: 'subheading', label: 'Add Subheading', desc: '20px Semi-bold', iconText: 'S', bgClass: 'bg-purple-500/20', iconClass: 'text-purple-400 text-base' },
  { id: 'body', label: 'Add Body Text', desc: '14px Regular', iconText: 'B', bgClass: 'bg-emerald-500/20', iconClass: 'text-emerald-400 text-sm' },
  { id: 'label', label: 'Add Label', desc: '10px Spaced Caps', iconText: 'L', bgClass: 'bg-amber-500/20', iconClass: 'text-amber-400 text-xs' },
]
</script>
