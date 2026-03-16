<template>
  <div class="h-full flex flex-col">

    <!-- Studio Toolbar -->
    <StudioToolbar 
      @save="handleSave" 
      @export="handleExport" 
    />

    <!-- Main Studio Area -->
    <div class="flex-1 flex overflow-hidden">

      <!-- Left: Sidebar -->
      <StudioSidebar />

      <!-- Center: Canvas -->
      <ResumeCanvas ref="canvasRef" />

      <!-- Right: Properties -->
      <PropertiesPanel />

    </div>

    <!-- Toast Notification -->
    <Transition name="toast">
      <div v-if="showToast" 
        class="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] px-5 py-3 rounded-xl bg-emerald-500 text-white text-sm font-semibold shadow-2xl shadow-emerald-500/30 flex items-center gap-2">
        <i class="fas fa-check-circle"></i>
        {{ toastMessage }}
      </div>
    </Transition>

    <!-- Mobile Warning -->
    <div class="lg:hidden fixed inset-0 z-[200] bg-[#0f0f14] flex items-center justify-center p-6">
      <div class="text-center max-w-sm">
        <div class="h-20 w-20 rounded-3xl bg-white/[0.04] flex items-center justify-center mx-auto mb-6">
          <i class="fas fa-desktop text-3xl text-white/20"></i>
        </div>
        <h2 class="text-xl font-bold text-white/80 mb-2">Desktop Required</h2>
        <p class="text-sm text-white/30 leading-relaxed mb-6">
          The Resume Studio requires a larger screen for the best drag-and-drop experience. Please switch to a desktop or laptop.
        </p>
        <NuxtLink to="/dashboard"
          class="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 text-white text-sm font-bold hover:bg-blue-500 transition-all">
          <i class="fas fa-arrow-left text-[11px]"></i>
          Back to Dashboard
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import StudioToolbar from '~/components/studio/StudioToolbar.vue'
import StudioSidebar from '~/components/studio/StudioSidebar.vue'
import ResumeCanvas from '~/components/studio/ResumeCanvas.vue'
import PropertiesPanel from '~/components/studio/PropertiesPanel.vue'
import { useResumeStore } from '~/composables/useResumeStore'
import { useCanvasExport } from '~/composables/useCanvasExport'

definePageMeta({
  layout: 'studio-layout'
})

const config = useRuntimeConfig()

useSeoMeta({
  title: `Resume Studio — ${config.public.appName || 'Porichoy'}`,
  description: 'Build beautiful resumes with our Canva-style drag-and-drop studio. Add text, sections, shapes, images and export to PNG or PDF.',
})

const store = useResumeStore()
const { exportToPNG, exportToJSON, saveToLocalStorage, loadFromLocalStorage } = useCanvasExport()

const canvasRef = ref(null)
const showToast = ref(false)
const toastMessage = ref('')

function toast(msg) {
  toastMessage.value = msg
  showToast.value = true
  setTimeout(() => { showToast.value = false }, 2500)
}

function handleSave() {
  saveToLocalStorage('current', store.getStateJSON)
  toast('Design saved!')
}

function handleExport(format) {
  if (format === 'png') {
    exportToPNG(canvasRef.value?.stageRef)
    toast('PNG exported!')
  } else if (format === 'json') {
    exportToJSON(store.getStateJSON)
    toast('JSON exported!')
  }
}

// Auto-load on mount
onMounted(() => {
  const saved = loadFromLocalStorage('current')
  if (saved) {
    store.loadStateJSON(saved)
  }
})
</script>

<style scoped>
.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translate(-50%, 20px);
}
</style>
