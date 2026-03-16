<template>
  <aside 
    v-if="layer"
    class="w-[280px] bg-[#1a1a28] border-l border-white/[0.06] flex flex-col flex-shrink-0 h-full overflow-hidden"
  >
    <!-- Header -->
    <div class="h-12 flex items-center justify-between px-4 border-b border-white/[0.06] flex-shrink-0">
      <h3 class="text-[11px] font-bold uppercase tracking-widest text-white/60">
        Properties
      </h3>
      <button @click="store.deselectAll()"
        class="h-6 w-6 rounded-md flex items-center justify-center text-white/30 hover:text-white hover:bg-white/[0.08] transition-all">
        <i class="fas fa-times text-[10px]"></i>
      </button>
    </div>

    <div class="flex-1 overflow-y-auto custom-scroll p-4 space-y-5">

      <!-- Element Info -->
      <div class="flex items-center gap-2 p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
        <div :class="['h-8 w-8 rounded-lg flex items-center justify-center', typeStyle.bgClass]">
          <i :class="[typeStyle.icon, typeStyle.color, 'text-xs']"></i>
        </div>
        <div>
          <p class="text-[11px] font-semibold text-white/60 truncate">
            {{ layer.label || layer.text?.substring(0, 18) || typeStyle.defaultLabel }}
          </p>
          <p class="text-[9px] text-white/25 uppercase">{{ layer.type }}</p>
        </div>
      </div>

      <!-- TEXT-SPECIFIC Controls -->
      <template v-if="layer.type === 'text'">
        <!-- Font Family -->
        <div>
          <label class="prop-label">Font Family</label>
          <select :value="layer.fontFamily || 'Inter'" @change="update({ fontFamily: $event.target.value })"
            class="prop-select">
            <option v-for="f in fonts" :key="f" :value="f">{{ f }}</option>
          </select>
        </div>

        <!-- Font Size + Style -->
        <div class="grid grid-cols-2 gap-2">
          <div>
            <label class="prop-label">Size</label>
            <input type="number" :value="layer.fontSize || 14" @input="update({ fontSize: +$event.target.value })"
              class="prop-input" min="6" max="120" />
          </div>
          <div>
            <label class="prop-label">Style</label>
            <div class="flex gap-1">
              <button @click="toggleStyle('bold')"
                :class="['prop-style-btn', layer.fontStyle?.includes('bold') ? 'active' : '']">
                <strong>B</strong>
              </button>
              <button @click="toggleStyle('italic')"
                :class="['prop-style-btn', layer.fontStyle?.includes('italic') ? 'active' : '']">
                <em>I</em>
              </button>
            </div>
          </div>
        </div>

        <!-- Text Color -->
        <div>
          <label class="prop-label">Text Color</label>
          <div class="flex items-center gap-2">
            <input type="color" :value="layer.fill || '#000000'" @input="update({ fill: $event.target.value })"
              class="w-8 h-8 rounded-lg cursor-pointer border-2 border-white/10 bg-transparent" />
            <input :value="layer.fill || '#000000'" @input="update({ fill: $event.target.value })"
              class="prop-input flex-1 font-mono uppercase" maxlength="7" />
          </div>
        </div>

        <!-- Letter Spacing -->
        <div>
          <label class="prop-label">Letter Spacing</label>
          <input type="range" :value="layer.letterSpacing || 0" @input="update({ letterSpacing: +$event.target.value })"
            min="-2" max="10" step="0.5" class="w-full accent-blue-500" />
          <span class="text-[10px] text-white/30 font-mono">{{ layer.letterSpacing || 0 }}px</span>
        </div>
      </template>

      <!-- SHAPE Controls -->
      <template v-if="layer.type === 'rect' || layer.type === 'circle'">
        <div>
          <label class="prop-label">Fill Color</label>
          <div class="flex items-center gap-2">
            <input type="color" :value="layer.fill || '#e2e8f0'" @input="update({ fill: $event.target.value })"
              class="w-8 h-8 rounded-lg cursor-pointer border-2 border-white/10 bg-transparent" />
            <input :value="layer.fill || '#e2e8f0'" @input="update({ fill: $event.target.value })"
              class="prop-input flex-1 font-mono uppercase" maxlength="7" />
          </div>
        </div>

        <div v-if="layer.type === 'rect'" class="grid grid-cols-2 gap-2">
          <div>
            <label class="prop-label">Width</label>
            <input type="number" :value="layer.width" @input="update({ width: +$event.target.value })"
              class="prop-input" min="1" />
          </div>
          <div>
            <label class="prop-label">Height</label>
            <input type="number" :value="layer.height" @input="update({ height: +$event.target.value })"
              class="prop-input" min="1" />
          </div>
        </div>

        <div v-if="layer.type === 'rect'">
          <label class="prop-label">Corner Radius</label>
          <input type="range" :value="layer.cornerRadius || 0" @input="update({ cornerRadius: +$event.target.value })"
            min="0" max="50" class="w-full accent-blue-500" />
          <span class="text-[10px] text-white/30 font-mono">{{ layer.cornerRadius || 0 }}px</span>
        </div>

        <div v-if="layer.type === 'circle'">
          <label class="prop-label">Radius</label>
          <input type="number" :value="layer.radius || 50" @input="update({ radius: +$event.target.value })"
            class="prop-input" min="5" max="300" />
        </div>
      </template>

      <!-- IMAGE Controls -->
      <template v-if="layer.type === 'image'">
        <div class="grid grid-cols-2 gap-2">
          <div>
            <label class="prop-label">Width</label>
            <input type="number" :value="layer.width" @input="update({ width: +$event.target.value })"
              class="prop-input" min="10" />
          </div>
          <div>
            <label class="prop-label">Height</label>
            <input type="number" :value="layer.height" @input="update({ height: +$event.target.value })"
              class="prop-input" min="10" />
          </div>
        </div>
        <div>
          <label class="prop-label">Corner Radius</label>
          <input type="range" :value="layer.cornerRadius || 0" @input="update({ cornerRadius: +$event.target.value })"
            min="0" max="100" class="w-full accent-blue-500" />
          <span class="text-[10px] text-white/30 font-mono">{{ layer.cornerRadius || 0 }}px</span>
        </div>
      </template>

      <div class="border-t border-white/[0.06]"></div>

      <!-- COMMON: Position -->
      <div>
        <label class="prop-label">Position</label>
        <div class="grid grid-cols-2 gap-2">
          <div>
            <label class="text-[9px] text-white/20 mb-0.5 block">X</label>
            <input type="number" :value="Math.round(layer.x)" @input="update({ x: +$event.target.value })"
              class="prop-input" />
          </div>
          <div>
            <label class="text-[9px] text-white/20 mb-0.5 block">Y</label>
            <input type="number" :value="Math.round(layer.y)" @input="update({ y: +$event.target.value })"
              class="prop-input" />
          </div>
        </div>
      </div>

      <!-- Opacity -->
      <div>
        <label class="prop-label">Opacity</label>
        <input type="range" :value="(layer.opacity ?? 1) * 100" 
          @input="update({ opacity: +$event.target.value / 100 })"
          min="0" max="100" class="w-full accent-blue-500" />
        <span class="text-[10px] text-white/30 font-mono">{{ Math.round((layer.opacity ?? 1) * 100) }}%</span>
      </div>

      <div class="border-t border-white/[0.06]"></div>

      <!-- Actions -->
      <div class="space-y-2">
        <button @click="store.duplicateLayer(layer.id)"
          class="w-full flex items-center gap-2 px-3 py-2.5 rounded-xl text-[11px] font-medium text-white/50 hover:text-white hover:bg-white/[0.06] transition-all">
          <i class="fas fa-copy text-[10px] text-blue-400/60"></i>
          Duplicate
        </button>
        <button @click="store.moveLayerUp(layer.id)"
          class="w-full flex items-center gap-2 px-3 py-2.5 rounded-xl text-[11px] font-medium text-white/50 hover:text-white hover:bg-white/[0.06] transition-all">
          <i class="fas fa-arrow-up text-[10px] text-emerald-400/60"></i>
          Bring Forward
        </button>
        <button @click="store.moveLayerDown(layer.id)"
          class="w-full flex items-center gap-2 px-3 py-2.5 rounded-xl text-[11px] font-medium text-white/50 hover:text-white hover:bg-white/[0.06] transition-all">
          <i class="fas fa-arrow-down text-[10px] text-amber-400/60"></i>
          Send Backward
        </button>
        <button @click="store.removeLayer(layer.id)"
          class="w-full flex items-center gap-2 px-3 py-2.5 rounded-xl text-[11px] font-medium text-red-400/60 hover:text-red-400 hover:bg-red-500/[0.06] transition-all">
          <i class="fas fa-trash-alt text-[10px]"></i>
          Delete
        </button>
      </div>

    </div>
  </aside>

  <!-- Empty state (nothing selected) -->
  <aside v-else 
    class="w-[280px] bg-[#1a1a28] border-l border-white/[0.06] flex flex-col items-center justify-center flex-shrink-0 h-full">
    <div class="text-center p-6">
      <div class="h-14 w-14 rounded-2xl bg-white/[0.03] flex items-center justify-center mx-auto mb-4">
        <i class="fas fa-mouse-pointer text-xl text-white/10"></i>
      </div>
      <p class="text-[12px] text-white/25 font-medium">Select an element</p>
      <p class="text-[10px] text-white/15 mt-1">Click any element on the canvas to edit its properties</p>
    </div>
  </aside>
</template>

<script setup>
import { computed } from 'vue'
import { useResumeStore } from '~/composables/useResumeStore'

const store = useResumeStore()

const layer = computed(() => store.selectedLayer.value)

const fonts = ['Inter', 'Arial', 'Georgia', 'Times New Roman', 'Courier New', 'Verdana', 'Trebuchet MS', 'Roboto', 'Montserrat']

const typeStyles = {
  text: { icon: 'fas fa-font', color: 'text-blue-400', bgClass: 'bg-blue-500/10', defaultLabel: 'Text' },
  rect: { icon: 'fas fa-square', color: 'text-emerald-400', bgClass: 'bg-emerald-500/10', defaultLabel: 'Shape' },
  circle: { icon: 'fas fa-circle', color: 'text-purple-400', bgClass: 'bg-purple-500/10', defaultLabel: 'Circle' },
  image: { icon: 'fas fa-image', color: 'text-amber-400', bgClass: 'bg-amber-500/10', defaultLabel: 'Image' },
  group: { icon: 'fas fa-object-group', color: 'text-rose-400', bgClass: 'bg-rose-500/10', defaultLabel: 'Section' },
}

const typeStyle = computed(() => typeStyles[layer.value?.type] || typeStyles.rect)

function update(changes) {
  if (layer.value) store.updateLayer(layer.value.id, changes)
}

function toggleStyle(style) {
  if (!layer.value) return
  const current = layer.value.fontStyle || 'normal'
  let parts = current.split(' ').filter(s => s && s !== 'normal')
  
  if (parts.includes(style)) {
    parts = parts.filter(s => s !== style)
  } else {
    parts.push(style)
  }
  
  update({ fontStyle: parts.length ? parts.join(' ') : 'normal' })
}
</script>

<style scoped>
.custom-scroll::-webkit-scrollbar { width: 4px; }
.custom-scroll::-webkit-scrollbar-track { background: transparent; }
.custom-scroll::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.08); border-radius: 4px; }

.prop-label {
  @apply block text-[10px] font-bold uppercase tracking-widest text-white/30 mb-1.5;
}

.prop-input {
  @apply w-full h-8 px-3 bg-white/[0.04] border border-white/[0.08] rounded-lg text-[11px] text-white/60 focus:text-white focus:border-blue-500/40 outline-none transition-all;
}

.prop-select {
  @apply w-full h-8 px-3 bg-white/[0.04] border border-white/[0.08] rounded-lg text-[11px] text-white/60 focus:text-white focus:border-blue-500/40 outline-none transition-all appearance-none cursor-pointer;
}

.prop-style-btn {
  @apply h-8 w-8 rounded-lg flex items-center justify-center text-[12px] text-white/30 border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.06] hover:text-white/60 transition-all cursor-pointer;
}
.prop-style-btn.active {
  @apply bg-blue-500/15 text-blue-400 border-blue-500/20;
}
</style>
