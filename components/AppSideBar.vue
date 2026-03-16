<template>
  <aside 
    @mouseenter="isHovered = true" 
    @mouseleave="isHovered = false" 
    :class="[
      'fixed lg:sticky bottom-0 left-0 z-50 transition-all duration-500 ease-in-out',
      'backdrop-blur-xl',
      'h-16 w-full lg:h-screen flex flex-row lg:flex-col',
      isExpanded || isHovered ? 'lg:w-64 shadow-2xl' : 'lg:w-20 shadow-sm'
    ]"
    :style="{ backgroundColor: 'var(--sidebar-bg)', borderRight: '1px solid var(--border)', borderTop: 'none' }"
  >
    <nav class="flex flex-row lg:flex-col flex-1 min-h-0 w-full overflow-hidden">
      
      <div class="flex flex-row lg:flex-col flex-1 lg:px-3 lg:py-6 gap-1 overflow-y-auto no-scrollbar">
        <template v-for="(group, index) in navigationGroups" :key="index">
          
          <div 
            v-if="(isExpanded || isHovered) && group.label" 
            class="hidden lg:block mt-6 mb-2 px-4 text-[10px] font-black uppercase tracking-[0.2em]"
            :style="{ color: group.labelColor || 'var(--text-dimmed)' }"
          >
            {{ group.label }}
          </div>

          <div v-for="item in group.items" :key="item.to" class="relative group/item">
            <SidebarItem 
              :label="item.label" 
              :icon="item.icon" 
              :to="item.to" 
              :expanded="isExpanded || isHovered" 
            />
            
            <span 
              v-if="(isExpanded || isHovered) && item.badge"
              class="absolute right-4 top-1/2 -translate-y-1/2 px-1.5 py-0.5 rounded-md text-[8px] font-black uppercase border"
              :class="item.badgeClass || 'bg-blue-500/10 text-blue-400 border-blue-500/20'"
            >
              {{ item.badge }}
            </span>
          </div>
        </template>
      </div>

      <div class="hidden lg:flex flex-col gap-1 px-3 py-4" :style="{ borderTop: '1px solid var(--border)' }">
        <SidebarItem 
          v-for="item in bottomNav" 
          :key="item.to"
          :label="item.label" 
          :icon="item.icon" 
          :to="item.to" 
          :expanded="isExpanded || isHovered" 
        />
        
        <Transition name="fade">
          <div v-if="isExpanded || isHovered" class="mt-4 p-3 rounded-[1.5rem] flex items-center gap-3"
            :style="{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border)' }">
            <div class="h-8 w-8 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-[10px] text-white font-black shadow-lg">
              SG
            </div>
            <div class="flex flex-col overflow-hidden">
              <span class="text-[10px] font-bold truncate" :style="{ color: 'var(--text-secondary)' }">Sudipta Ghosh</span>
              <span class="text-[8px] font-black text-blue-400 uppercase tracking-tighter">Founder & CEO</span>
            </div>
          </div>
        </Transition>
      </div>
    </nav>

    <button 
      @click="isExpanded = !isExpanded" 
      :class="[
        'hidden lg:flex absolute -right-3 top-20 w-7 h-7 rounded-full items-center justify-center shadow-md transition-all duration-300 hover:scale-110 z-[60]',
        isHovered || isExpanded ? 'opacity-100' : 'opacity-0'
      ]"
      :style="{ backgroundColor: 'var(--bg-surface-alt)', border: '1px solid var(--border)' }"
    >
      <i :class="['fa-solid fa-chevron-right text-[10px] transition-transform duration-500', isExpanded ? 'rotate-180' : '']" :style="{ color: 'var(--text-muted)' }"></i>
    </button>
  </aside>
</template>

<script setup>
import { ref } from 'vue'
import SidebarItem from '~/components/items/SidebarItem.vue'

const isExpanded = ref(false)
const isHovered = ref(false)

const navigationGroups = [
  {
    label: null,
    items: [
      { label: 'Dashboard', icon: 'fa-solid fa-chart-line', to: '/dashboard' }
    ]
  },
  {
    label: 'Create',
    labelColor: 'rgba(96,165,250,0.5)',
    items: [
      { label: 'Resume Studio', icon: 'fa-solid fa-wand-magic-sparkles', to: '/studio/resume-builder', badge: 'New', badgeClass: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' },
      { label: 'Image Studio', icon: 'fa-solid fa-crop', to: '/studio/image-editor' },
    ]
  },
  {
    label: 'Manage',
    items: [
      { label: 'My Space', icon: 'fa-solid fa-layer-group', to: '/my-space' },
      { label: 'Analytics', icon: 'fa-solid fa-chart-pie', to: '/coming-soon' },
      { label: 'Domain', icon: 'fa-solid fa-globe', to: '/coming-soon' },
      { label: 'Saved', icon: 'fa-solid fa-star', to: '/saved' }
    ]
  },
  {
    label: 'Laboratory',
    labelColor: 'rgba(168,85,247,0.5)',
    items: [
      { label: 'QA Terminal', icon: 'fa-solid fa-flask-vial', to: '/tester', badge: 'Beta', badgeClass: 'bg-purple-500/10 text-purple-400 border-purple-500/20' }
    ]
  }
]

const bottomNav = [
  { label: 'Settings', icon: 'fa-solid fa-gear', to: '/settings' }
]
</script>

<style scoped>
.no-scrollbar::-webkit-scrollbar { display: none; }
.no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
.fade-enter-active, .fade-leave-active { transition: all 0.3s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; transform: translateY(10px); }
</style>