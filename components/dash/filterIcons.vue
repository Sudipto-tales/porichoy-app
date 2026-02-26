<template>
  <div class="w-full py-6 transparent overflow-hidden">
    <div class="flex items-center gap-6 overflow-x-auto px-4 pb-4 no-scrollbar">
      
      <button
        v-for="item in filters"
        :key="item.label"
        @click="activeFilter = item.label"
        @mouseenter="hoveredItem = item.label"
        @mouseleave="hoveredItem = null"
        class="group flex flex-col items-center gap-2 min-w-[85px] py-3 transition-all"
      >
        
        <div
          :class="[
            'w-16 h-16 rounded-full flex items-center justify-center border-2 transition-all duration-300',
            activeFilter === item.label
              ? 'border-blue-600 bg-blue-50 text-blue-600 shadow-md scale-110'
              : 'border-gray-100 bg-gray-50 text-gray-400 group-hover:border-blue-400 group-hover:bg-blue-50 group-hover:text-blue-500'
          ]"
        >
          <i 
            :class="[
              (activeFilter === item.label || hoveredItem === item.label) 
                ? item.activeIcon 
                : item.icon,
              'text-xl transition-all duration-200'
            ]"
          ></i>
        </div>

        <span 
          :class="[
            'text-[10px] font-black uppercase tracking-wider transition-all duration-300',
            activeFilter === item.label 
              ? 'text-blue-600 opacity-100 translate-y-0' 
              : 'text-gray-400 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 group-hover:text-blue-500'
          ]"
        >
          {{ item.label }}
        </span>

      </button>

    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const activeFilter = ref('Presentation')
const hoveredItem = ref(null) // Track hover state manually for reliability

const filters = [
  { label: 'Present', icon: 'fa-solid fa-tv', activeIcon: 'fa-solid fa-laptop' },
  { label: 'Social', icon: 'fa-regular fa-share-from-square', activeIcon: 'fa-solid fa-share-nodes' },
  { label: 'Resumes', icon: 'fa-regular fa-file', activeIcon: 'fa-solid fa-file-lines' },
  { label: 'Portfolio', icon: 'fa-solid fa-address-card', activeIcon: 'fa-solid fa-briefcase' },
  { label: 'Crop', icon: 'fa-solid fa-crop-simple', activeIcon: 'fa-solid fa-crop' },
  { label: 'Remove BG', icon: 'fa-regular fa-user', activeIcon: 'fa-solid fa-user-minus' },
  { label: 'Templates', icon: 'fa-solid fa-object-group', activeIcon: 'fa-solid fa-layer-group' },
]
</script>

<style scoped>
.no-scrollbar::-webkit-scrollbar { display: none; }
.no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
</style>