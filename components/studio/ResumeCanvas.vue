<template>
  <div 
    class="flex-1 overflow-auto flex items-center justify-center relative"
    :style="{ background: 'radial-gradient(circle, #1e1e2e 1px, transparent 1px)', backgroundSize: '24px 24px' }"
    @click.self="store.deselectAll()"
    ref="canvasWrapper"
  >
    <!-- Zoom Container -->
    <div 
      class="relative transition-transform duration-200"
      :style="{ transform: `scale(${store.state.canvasConfig.zoom})`, transformOrigin: 'center center' }"
    >
      <!-- A4 Paper Shadow -->
      <div class="relative rounded-sm" style="filter: drop-shadow(0 20px 60px rgba(0,0,0,0.5))">
        
        <!-- The Konva Stage -->
        <v-stage 
          ref="stageRef"
          :config="stageConfig" 
          @click="handleStageClick"
          @tap="handleStageClick"
        >
          <!-- Background Layer -->
          <v-layer>
            <v-rect :config="{
              x: 0, y: 0,
              width: store.state.canvasConfig.width,
              height: store.state.canvasConfig.height,
              fill: store.state.canvasConfig.background,
            }" />

            <!-- Grid Overlay -->
            <template v-if="store.state.canvasConfig.showGrid">
              <v-line 
                v-for="gx in gridLinesX" 
                :key="'gx-'+gx"
                :config="{ points: [gx, 0, gx, store.state.canvasConfig.height], stroke: '#e2e8f0', strokeWidth: 0.5, opacity: 0.3 }"
              />
              <v-line 
                v-for="gy in gridLinesY" 
                :key="'gy-'+gy"
                :config="{ points: [0, gy, store.state.canvasConfig.width, gy], stroke: '#e2e8f0', strokeWidth: 0.5, opacity: 0.3 }"
              />
            </template>
          </v-layer>

          <!-- Elements Layer -->
          <v-layer ref="mainLayerRef">
            <template v-for="layer in store.state.layers" :key="layer.id">
              
              <!-- Group (Section Block) -->
              <v-group 
                v-if="layer.type === 'group'"
                :config="{
                  x: layer.x,
                  y: layer.y,
                  draggable: !layer.locked,
                  id: layer.id,
                }"
                @dragend="handleDragEnd($event, layer)"
                @click="handleElementClick(layer)"
                @tap="handleElementClick(layer)"
              >
                <template v-for="(child, ci) in layer.children" :key="ci">
                  <v-text v-if="child.type === 'text'" :config="{
                    x: child.x || 0,
                    y: child.y || 0,
                    text: child.text,
                    fontSize: child.fontSize || 14,
                    fontFamily: child.fontFamily || 'Inter',
                    fontStyle: child.fontStyle || 'normal',
                    fill: child.fill || '#000',
                    width: child.width || layer.width,
                    letterSpacing: child.letterSpacing || 0,
                    lineHeight: 1.5,
                  }" />
                  <v-rect v-if="child.type === 'rect'" :config="{
                    x: child.x || 0,
                    y: child.y || 0,
                    width: child.width || 100,
                    height: child.height || 2,
                    fill: child.fill || '#000',
                  }" />
                </template>

                <!-- Selection highlight for group -->
                <v-rect v-if="store.state.selectedId === layer.id" :config="{
                  x: -4, y: -4,
                  width: (layer.width || 200) + 8,
                  height: (layer.height || 100) + 8,
                  stroke: '#3b82f6',
                  strokeWidth: 1.5,
                  dash: [6, 3],
                  cornerRadius: 4,
                  listening: false,
                }" />
              </v-group>

              <!-- Text -->
              <v-group 
                v-else-if="layer.type === 'text'"
                :config="{
                  x: layer.x,
                  y: layer.y,
                  draggable: !layer.locked,
                  id: layer.id,
                }"
                @dragend="handleDragEnd($event, layer)"
                @click="handleElementClick(layer)"
                @tap="handleElementClick(layer)"
                @dblclick="handleTextDblClick(layer)"
              >
                <v-text :config="{
                  text: layer.text,
                  fontSize: layer.fontSize || 14,
                  fontFamily: layer.fontFamily || 'Inter',
                  fontStyle: layer.fontStyle || 'normal',
                  fill: layer.fill || '#000',
                  width: layer.width,
                  letterSpacing: layer.letterSpacing || 0,
                  lineHeight: 1.5,
                  opacity: layer.opacity ?? 1,
                }" />

                <!-- Selection border -->
                <v-rect v-if="store.state.selectedId === layer.id" :config="{
                  x: -3, y: -3,
                  width: (layer.width || 200) + 6,
                  height: (layer.height || 30) + 6,
                  stroke: '#3b82f6',
                  strokeWidth: 1.5,
                  dash: [6, 3],
                  cornerRadius: 3,
                  listening: false,
                }" />
              </v-group>

              <!-- Rectangle -->
              <v-group
                v-else-if="layer.type === 'rect'"
                :config="{
                  x: layer.x,
                  y: layer.y,
                  draggable: !layer.locked,
                  id: layer.id,
                }"
                @dragend="handleDragEnd($event, layer)"
                @click="handleElementClick(layer)"
                @tap="handleElementClick(layer)"
              >
                <v-rect :config="{
                  width: layer.width || 200,
                  height: layer.height || 100,
                  fill: layer.fill || '#e2e8f0',
                  cornerRadius: layer.cornerRadius || 0,
                  stroke: layer.stroke || '',
                  strokeWidth: layer.strokeWidth || 0,
                  opacity: layer.opacity ?? 1,
                }" />

                <v-rect v-if="store.state.selectedId === layer.id" :config="{
                  x: -3, y: -3,
                  width: (layer.width || 200) + 6,
                  height: (layer.height || 100) + 6,
                  stroke: '#3b82f6',
                  strokeWidth: 1.5,
                  dash: [6, 3],
                  cornerRadius: 3,
                  listening: false,
                }" />
              </v-group>

              <!-- Circle -->
              <v-group
                v-else-if="layer.type === 'circle'"
                :config="{
                  x: layer.x,
                  y: layer.y,
                  draggable: !layer.locked,
                  id: layer.id,
                }"
                @dragend="handleDragEnd($event, layer)"
                @click="handleElementClick(layer)"
                @tap="handleElementClick(layer)"
              >
                <v-circle :config="{
                  x: layer.radius || 50,
                  y: layer.radius || 50,
                  radius: layer.radius || 50,
                  fill: layer.fill || '#e2e8f0',
                  opacity: layer.opacity ?? 1,
                }" />

                <v-rect v-if="store.state.selectedId === layer.id" :config="{
                  x: -3, y: -3,
                  width: ((layer.radius || 50) * 2) + 6,
                  height: ((layer.radius || 50) * 2) + 6,
                  stroke: '#3b82f6',
                  strokeWidth: 1.5,
                  dash: [6, 3],
                  cornerRadius: 3,
                  listening: false,
                }" />
              </v-group>

              <!-- Image -->
              <v-group
                v-else-if="layer.type === 'image'"
                :config="{
                  x: layer.x,
                  y: layer.y,
                  draggable: !layer.locked,
                  id: layer.id,
                }"
                @dragend="handleDragEnd($event, layer)"
                @click="handleElementClick(layer)"
                @tap="handleElementClick(layer)"
              >
                <v-image v-if="loadedImages[layer.id]" :config="{
                  image: loadedImages[layer.id],
                  width: layer.width || 150,
                  height: layer.height || 150,
                  cornerRadius: layer.cornerRadius || 0,
                  opacity: layer.opacity ?? 1,
                }" />

                <v-rect v-if="store.state.selectedId === layer.id" :config="{
                  x: -3, y: -3,
                  width: (layer.width || 150) + 6,
                  height: (layer.height || 150) + 6,
                  stroke: '#3b82f6',
                  strokeWidth: 1.5,
                  dash: [6, 3],
                  cornerRadius: 3,
                  listening: false,
                }" />
              </v-group>

            </template>
          </v-layer>
        </v-stage>

      </div>
    </div>

    <!-- Text Edit Overlay (appears on double-click) -->
    <div v-if="editingLayer" 
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      @click.self="finishEditing"
    >
      <div class="bg-[#1e1e2e] border border-white/10 rounded-2xl p-6 w-[500px] shadow-2xl">
        <h3 class="text-sm font-bold text-white/60 uppercase tracking-widest mb-3">Edit Text</h3>
        <textarea 
          v-model="editingText"
          rows="4"
          class="w-full bg-white/[0.04] border border-white/10 rounded-xl p-4 text-white text-sm font-medium focus:border-blue-500/40 outline-none resize-none"
          autofocus
        ></textarea>
        <div class="flex justify-end gap-2 mt-3">
          <button @click="cancelEditing" class="px-4 py-2 rounded-lg text-xs font-bold text-white/40 hover:text-white hover:bg-white/[0.06] transition-all">
            Cancel
          </button>
          <button @click="finishEditing" class="px-4 py-2 rounded-lg text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 transition-all">
            Apply
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, reactive, onMounted } from 'vue'
import { useResumeStore } from '~/composables/useResumeStore'

const store = useResumeStore()
const stageRef = ref(null)
const mainLayerRef = ref(null)
const canvasWrapper = ref(null)

// Expose stageRef for exports
defineExpose({ stageRef })

const stageConfig = computed(() => ({
  width: store.state.canvasConfig.width,
  height: store.state.canvasConfig.height,
}))

// Grid lines
const gridLinesX = computed(() => {
  const lines = []
  for (let x = 40; x < store.state.canvasConfig.width; x += 40) lines.push(x)
  return lines
})

const gridLinesY = computed(() => {
  const lines = []
  for (let y = 40; y < store.state.canvasConfig.height; y += 40) lines.push(y)
  return lines
})

// Image loading
const loadedImages = reactive({})

watch(() => store.state.layers, (layers) => {
  layers.forEach(layer => {
    if (layer.type === 'image' && layer.src && !loadedImages[layer.id]) {
      const img = new window.Image()
      img.crossOrigin = 'anonymous'
      img.onload = () => { loadedImages[layer.id] = img }
      img.src = layer.src
    }
  })
}, { deep: true, immediate: true })

// Event handlers
function handleStageClick(e) {
  if (e.target === e.target.getStage()) {
    store.deselectAll()
  }
}

function handleElementClick(layer) {
  store.selectLayer(layer.id)
}

function handleDragEnd(e, layer) {
  const node = e.target
  store.updateLayer(layer.id, {
    x: Math.round(node.x()),
    y: Math.round(node.y()),
  })
}

// Text editing
const editingLayer = ref(null)
const editingText = ref('')

function handleTextDblClick(layer) {
  editingLayer.value = layer
  editingText.value = layer.text
}

function finishEditing() {
  if (editingLayer.value) {
    store.updateLayer(editingLayer.value.id, { text: editingText.value })
  }
  editingLayer.value = null
  editingText.value = ''
}

function cancelEditing() {
  editingLayer.value = null
  editingText.value = ''
}

// Keyboard shortcuts
function handleKeyDown(e) {
  if (editingLayer.value) return

  if (e.key === 'Delete' || e.key === 'Backspace') {
    if (store.state.selectedId) {
      e.preventDefault()
      store.removeLayer(store.state.selectedId)
    }
  }

  if (e.ctrlKey || e.metaKey) {
    if (e.key === 'z') { e.preventDefault(); store.undo() }
    if (e.key === 'y') { e.preventDefault(); store.redo() }
    if (e.key === 'd') { 
      e.preventDefault()
      if (store.state.selectedId) store.duplicateLayer(store.state.selectedId)
    }
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeyDown)
})
</script>
