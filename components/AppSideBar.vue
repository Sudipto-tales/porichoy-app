<template>
  <aside 
    @mouseenter="isHovered = true" 
    @mouseleave="isHovered = false" 
    :class="[
      'fixed lg:sticky bottom-0 left-0 z-50 transition-all duration-500 ease-in-out',
      'bg-white/90 backdrop-blur-xl border-slate-200/60',
      'h-16 w-full lg:h-screen flex flex-row lg:flex-col border-t lg:border-r lg:border-t-0',
      isExpanded || isHovered ? 'lg:w-64 shadow-2xl' : 'lg:w-20 shadow-sm'
    ]"
  >
    <nav class="flex flex-row lg:flex-col flex-1 min-h-0 w-full overflow-hidden">
      
      <div class="flex flex-row lg:flex-col flex-1 lg:px-3 lg:py-6 gap-1 overflow-y-auto no-scrollbar">
        <template v-for="(group, index) in navigationGroups" :key="index">
          
          <div 
            v-if="(isExpanded || isHovered) && group.label" 
            class="hidden lg:block mt-6 mb-2 px-4 text-[10px] font-black uppercase tracking-[0.2em]"
            :class="group.labelColor || 'text-slate-400'"
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
              :class="item.badgeClass || 'bg-blue-50 text-blue-600 border-blue-100'"
            >
              {{ item.badge }}
            </span>
          </div>
        </template>
      </div>

      <div class="hidden lg:flex flex-col gap-1 px-3 py-4 border-t border-slate-100 bg-white/50">
        <SidebarItem 
          v-for="item in bottomNav" 
          :key="item.to"
          :label="item.label" 
          :icon="item.icon" 
          :to="item.to" 
          :expanded="isExpanded || isHovered" 
        />
        
        <Transition name="fade">
          <div v-if="isExpanded || isHovered" class="mt-4 p-3 rounded-[1.5rem] bg-slate-50 border border-slate-100 flex items-center gap-3">
            <div class="h-8 w-8 rounded-xl bg-gray-900 flex items-center justify-center text-[10px] text-white font-black shadow-lg">
              SG
            </div>
            <div class="flex flex-col overflow-hidden">
              <span class="text-[10px] font-bold text-slate-800 truncate">Sudipta Ghosh</span>
              <span class="text-[8px] font-black text-blue-500 uppercase tracking-tighter">Founder & CEO</span>
            </div>
          </div>
        </Transition>
      </div>
    </nav>

    <button 
      @click="isExpanded = !isExpanded" 
      :class="[
        'hidden lg:flex absolute -right-3 top-20 w-7 h-7 rounded-full border border-slate-200 bg-white items-center justify-center shadow-md transition-all duration-300 hover:scale-110 z-[60]',
        isHovered || isExpanded ? 'opacity-100' : 'opacity-0'
      ]"
    >
      <i :class="['fa-solid fa-chevron-right text-[10px] transition-transform duration-500', isExpanded ? 'rotate-180' : '']"></i>
    </button>
  </aside>
</template>

<script setup>
import { ref, reactive } from 'vue'
import SidebarItem from '~/components/items/SidebarItem.vue'

const isExpanded = ref(false)
const isHovered = ref(false)

// Main Navigation Configuration
const navigationGroups = [
  {
    label: null, // No label for the first group
    items: [
      { label: 'Dashboard', icon: 'fa-solid fa-chart-line', to: '/dashboard' }
    ]
  },
  {
    label: 'Build',
    items: [
      { label: 'Resume Builder', icon: 'fa-solid fa-file-lines', to: '/resumes' },
      { label: 'Portfolio Builder', icon: 'fa-solid fa-palette', to: '/portfolios' }
    ]
  },
  {
    label: 'Manage',
    items: [
      { label: 'My Space', icon: 'fa-solid fa-layer-group', to: '/my-space' },
      { label: 'Analytics', icon: 'fa-solid fa-chart-pie', to: '/analytics' },
      { label: 'Domain', icon: 'fa-solid fa-globe', to: '/domain' },
      { label: 'Saved', icon: 'fa-solid fa-star', to: '/saved' }
    ]
  },
  {
    label: 'Laboratory',
    labelColor: 'text-blue-500',
    items: [
      { 
        label: 'QA Terminal', 
        icon: 'fa-solid fa-flask-vial', 
        to: '/tester', 
        badge: 'Beta',
        badgeClass: 'bg-blue-50 text-blue-600 border-blue-100' 
      }
    ]
  }
]

// Pinned Bottom Navigation
const bottomNav = [
  { label: 'Settings', icon: 'fa-solid fa-gear', to: '/settings' }
]
</script>

<style scoped>
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.fade-enter-active, .fade-leave-active {
  transition: all 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>