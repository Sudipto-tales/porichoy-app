<template>
  <div class="w-full py-6 transparent overflow-hidden">
    <div class="flex items-center gap-6 overflow-x-auto px-4 pb-4 no-scrollbar">
      <NuxtLink
        v-for="item in filters"
        :key="item.label"
        :to="item.to"
        @mouseenter="hoveredItem = item.label"
        @mouseleave="hoveredItem = null"
        class="group flex flex-col items-center gap-2 min-w-[85px] py-3 transition-all"
      >
        <div
          :class="[
            'w-16 h-16 rounded-full flex items-center justify-center border-2 transition-all duration-300',
            hoveredItem === item.label
              ? 'border-blue-500 bg-blue-500/10 text-blue-400 shadow-md scale-110'
              : 'border-transparent bg-transparent group-hover:border-blue-500/50 group-hover:text-blue-400'
          ]"
          :style="hoveredItem !== item.label ? { backgroundColor: 'var(--icon-bg)', color: 'var(--icon-text)', borderColor: 'var(--border)' } : {}"
        >
          <i :class="[hoveredItem === item.label ? item.activeIcon : item.icon, 'text-xl transition-all duration-200']"></i>
        </div>
        <span 
          :class="[
            'text-[10px] font-black uppercase tracking-wider transition-all duration-300',
            hoveredItem === item.label 
              ? 'text-blue-400 opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 group-hover:text-blue-400'
          ]"
          :style="hoveredItem !== item.label ? { color: 'var(--text-muted)' } : {}"
        >
          {{ item.label }}
        </span>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const hoveredItem = ref(null)

const filters = [
  { label: 'Studio', icon: 'fa-solid fa-wand-magic-sparkles', activeIcon: 'fa-solid fa-wand-magic-sparkles', to: '/studio/resume-builder' },
  { label: 'Resumes', icon: 'fa-regular fa-file', activeIcon: 'fa-solid fa-file-lines', to: '/my-space' },
  { label: 'Portfolio', icon: 'fa-solid fa-address-card', activeIcon: 'fa-solid fa-briefcase', to: '/my-space' },
  { label: 'Crop', icon: 'fa-solid fa-crop-simple', activeIcon: 'fa-solid fa-crop', to: '/studio/image-editor' },
  { label: 'Remove BG', icon: 'fa-regular fa-user', activeIcon: 'fa-solid fa-user-minus', to: '/studio/image-editor' },
  { label: 'Templates', icon: 'fa-solid fa-object-group', activeIcon: 'fa-solid fa-layer-group', to: '/dashboard' },
  { label: 'Social', icon: 'fa-regular fa-share-from-square', activeIcon: 'fa-solid fa-share-nodes', to: '/coming-soon' },
]
</script>

<style scoped>
.no-scrollbar::-webkit-scrollbar { display: none; }
.no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
</style>