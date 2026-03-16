<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="show" class="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm" @click.self="$emit('close')">
        <div class="bg-[#1e1e2e] border border-white/10 rounded-2xl w-[600px] max-h-[80vh] flex flex-col shadow-2xl">
          
          <!-- Header -->
          <div class="flex items-center justify-between px-6 py-4 border-b border-white/[0.06]">
            <h3 class="text-sm font-bold text-white/70 uppercase tracking-widest">Crop Image</h3>
            <button @click="$emit('close')"
              class="h-7 w-7 rounded-lg flex items-center justify-center text-white/30 hover:text-white hover:bg-white/[0.08] transition-all">
              <i class="fas fa-times text-xs"></i>
            </button>
          </div>

          <!-- Crop Area -->
          <div class="flex-1 overflow-hidden p-6">
            <div ref="cropperContainer" class="bg-black/30 rounded-xl overflow-hidden">
              <img ref="imageRef" :src="imageSrc" class="max-w-full block" />
            </div>
          </div>

          <!-- Footer -->
          <div class="flex items-center justify-end gap-2 px-6 py-4 border-t border-white/[0.06]">
            <button @click="$emit('close')"
              class="px-5 py-2.5 rounded-lg text-xs font-bold text-white/40 hover:text-white hover:bg-white/[0.06] transition-all">
              Cancel
            </button>
            <button @click="applyCrop"
              class="px-5 py-2.5 rounded-lg text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 transition-all">
              <i class="fas fa-crop-alt mr-1"></i> Apply Crop
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { ref, watch, nextTick, onUnmounted } from 'vue'
import Cropper from 'cropperjs'
import 'cropperjs/dist/cropper.css'

const props = defineProps({
  show: Boolean,
  imageSrc: String,
})

const emit = defineEmits(['close', 'crop'])

const imageRef = ref(null)
let cropperInstance = null

watch(() => props.show, async (val) => {
  if (val) {
    await nextTick()
    if (imageRef.value) {
      cropperInstance = new Cropper(imageRef.value, {
        aspectRatio: NaN,
        viewMode: 1,
        background: false,
      })
    }
  } else {
    destroyCropper()
  }
})

function applyCrop() {
  if (cropperInstance) {
    const canvas = cropperInstance.getCroppedCanvas()
    const dataUrl = canvas.toDataURL('image/png')
    emit('crop', dataUrl)
  }
  emit('close')
}

function destroyCropper() {
  if (cropperInstance) {
    cropperInstance.destroy()
    cropperInstance = null
  }
}

onUnmounted(destroyCropper)
</script>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: all 0.3s ease;
}
.modal-enter-from,
.modal-leave-to {
  opacity: 0;
  transform: scale(0.95);
}
</style>
