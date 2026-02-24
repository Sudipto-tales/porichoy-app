<template>
  <aside
    @mouseenter="isHovered = true"
    @mouseleave="isHovered = false"
    :class="[
      'fixed lg:sticky top-0 left-0 z-50 transition-all duration-500 ease-in-out',
      'bg-white/80 backdrop-blur-xl border-slate-200/60',
      'h-16 w-full bottom-0 flex-row border-t lg:h-screen lg:flex-col lg:border-r lg:border-t-0',
      isExpanded || isHovered ? 'lg:w-64 shadow-xl' : 'lg:w-20 shadow-sm'
    ]"
    class="flex items-center lg:items-stretch"
  >

    <!-- Logo Section -->
    <!-- <div class="hidden lg:flex items-center px-6 h-16 border-b border-slate-100">
      <div class="flex items-center gap-3 overflow-hidden">
        <div class="min-w-[34px] h-9 bg-gradient-to-tr rounded-xl flex items-center justify-center shadow-lg">
          <img src="/porichoy.favicon.png" class="w-6 h-6 object-contain" />
        </div>

        <Transition name="fade">
          <h1
            v-if="isExpanded || isHovered"
            class="text-lg font-black tracking-tight whitespace-nowrap"
          >
            Porichoy
          </h1>
        </Transition>
      </div>
    </div> -->

    <!-- Navigation -->
    <nav class="flex flex-row lg:flex-col flex-1 justify-around lg:justify-start lg:px-3 lg:py-6 gap-2 w-full">

      <SidebarItem label="Home" icon="fa-solid fa-house" :expanded="isExpanded || isHovered" active />
      <SidebarItem label="Resumes" icon="fa-solid fa-file-lines" :expanded="isExpanded || isHovered" />
      <SidebarItem label="Portfolios" icon="fa-solid fa-palette" :expanded="isExpanded || isHovered" />
      <SidebarItem label="Saved" icon="fa-solid fa-star" :expanded="isExpanded || isHovered" />

      <div class="hidden lg:block my-6 border-t border-slate-100"></div>

      <SidebarItem label="Settings" icon="fa-solid fa-gear" :expanded="isExpanded || isHovered" />

    </nav>

    <!-- Expand Button -->
    <button
      @click="isExpanded = !isExpanded"
      :class="[
        'hidden lg:flex absolute -right-3 top-20 w-7 h-7 rounded-full border border-slate-200 bg-white items-center justify-center shadow-md transition-all duration-300 hover:scale-110',
        isHovered ? 'opacity-100' : 'opacity-0'
      ]"
    >
      <i
        :class="[
          'fa-solid fa-chevron-right text-xs transition-transform duration-500',
          isExpanded ? 'rotate-180' : ''
        ]"
      ></i>
    </button>

    <!-- Profile Section -->
    <div class="hidden lg:flex items-center p-4 mt-auto border-t border-slate-100">
      <div class="w-9 h-9 rounded-full bg-indigo-500 flex items-center justify-center text-white font-semibold shadow-md">
        S
      </div>

      <Transition name="fade">
        <div v-if="isExpanded || isHovered" class="ml-3">
          <p class="text-sm font-semibold text-slate-800">Sudipta Ghosh</p>
          <p class="text-xs text-indigo-500 font-medium">Pro Plan</p>
        </div>
      </Transition>
    </div>

  </aside>
</template>

<script setup>
import { ref } from 'vue'
import SidebarItem from '~/components/items/SidebarItem.vue'

const isExpanded = ref(false)
const isHovered = ref(false)
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease, transform 0.25s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateX(-8px);
}
</style>