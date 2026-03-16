import { reactive, ref, computed, toRaw } from 'vue'

const state = reactive({
  projectName: 'Untitled Resume',
  layers: [],
  selectedId: null,
  history: [],
  historyIndex: -1,
  canvasConfig: {
    width: 794,   // A4 at 96DPI
    height: 1123,
    background: '#ffffff',
    showGrid: true,
    zoom: 1,
  }
})

let idCounter = 0

function generateId() {
  return `el-${Date.now()}-${++idCounter}`
}

function pushHistory() {
  const snapshot = JSON.parse(JSON.stringify(state.layers))
  // Trim any redo states
  state.history = state.history.slice(0, state.historyIndex + 1)
  state.history.push(snapshot)
  if (state.history.length > 50) state.history.shift()
  state.historyIndex = state.history.length - 1
}

export function useResumeStore() {

  const selectedLayer = computed(() =>
    state.layers.find(l => l.id === state.selectedId) || null
  )

  function addLayer(layerData) {
    pushHistory()
    const layer = {
      id: generateId(),
      x: 60,
      y: 60 + state.layers.length * 30,
      width: 200,
      height: 40,
      rotation: 0,
      locked: false,
      visible: true,
      opacity: 1,
      ...layerData
    }
    state.layers.push(layer)
    state.selectedId = layer.id
    return layer
  }

  function addTextLayer(preset = 'body') {
    const presets = {
      heading: { text: 'Heading', fontSize: 28, fontFamily: 'Inter', fontStyle: 'bold', fill: '#1e293b', width: 400, height: 45 },
      subheading: { text: 'Subheading', fontSize: 20, fontFamily: 'Inter', fontStyle: 'bold', fill: '#475569', width: 350, height: 35 },
      body: { text: 'Body text — click to edit', fontSize: 14, fontFamily: 'Inter', fontStyle: 'normal', fill: '#334155', width: 500, height: 24 },
      label: { text: 'LABEL', fontSize: 10, fontFamily: 'Inter', fontStyle: 'bold', fill: '#94a3b8', width: 120, height: 18, letterSpacing: 2 },
    }
    return addLayer({ type: 'text', ...presets[preset] || presets.body })
  }

  function addSectionBlock(sectionType) {
    const sectionConfigs = {
      header: {
        type: 'group',
        label: 'Header',
        width: 674,
        height: 120,
        children: [
          { type: 'text', text: 'Your Name', fontSize: 32, fontFamily: 'Inter', fontStyle: 'bold', fill: '#0f172a', x: 0, y: 0 },
          { type: 'text', text: 'Software Developer', fontSize: 16, fontFamily: 'Inter', fontStyle: 'normal', fill: '#64748b', x: 0, y: 44 },
          { type: 'text', text: 'email@example.com  •  +91 9876543210  •  Kolkata, India', fontSize: 11, fontFamily: 'Inter', fontStyle: 'normal', fill: '#94a3b8', x: 0, y: 70 },
        ]
      },
      experience: {
        type: 'group',
        label: 'Experience',
        width: 674,
        height: 160,
        children: [
          { type: 'text', text: 'EXPERIENCE', fontSize: 12, fontFamily: 'Inter', fontStyle: 'bold', fill: '#3b82f6', x: 0, y: 0, letterSpacing: 3 },
          { type: 'rect', fill: '#3b82f6', x: 0, y: 20, width: 674, height: 2 },
          { type: 'text', text: 'Software Developer — Company Name', fontSize: 15, fontFamily: 'Inter', fontStyle: 'bold', fill: '#1e293b', x: 0, y: 34 },
          { type: 'text', text: 'Jan 2024 – Present', fontSize: 11, fontFamily: 'Inter', fontStyle: 'normal', fill: '#94a3b8', x: 0, y: 56 },
          { type: 'text', text: '• Developed and maintained full-stack web applications\n• Collaborated with cross-functional teams on product features\n• Optimized performance resulting in 40% faster load times', fontSize: 12, fontFamily: 'Inter', fontStyle: 'normal', fill: '#475569', x: 0, y: 78, width: 674 },
        ]
      },
      education: {
        type: 'group',
        label: 'Education',
        width: 674,
        height: 120,
        children: [
          { type: 'text', text: 'EDUCATION', fontSize: 12, fontFamily: 'Inter', fontStyle: 'bold', fill: '#3b82f6', x: 0, y: 0, letterSpacing: 3 },
          { type: 'rect', fill: '#3b82f6', x: 0, y: 20, width: 674, height: 2 },
          { type: 'text', text: 'B.Tech Computer Science — University Name', fontSize: 15, fontFamily: 'Inter', fontStyle: 'bold', fill: '#1e293b', x: 0, y: 34 },
          { type: 'text', text: '2020 – 2024  |  CGPA: 8.5', fontSize: 11, fontFamily: 'Inter', fontStyle: 'normal', fill: '#94a3b8', x: 0, y: 56 },
        ]
      },
      skills: {
        type: 'group',
        label: 'Skills',
        width: 674,
        height: 100,
        children: [
          { type: 'text', text: 'SKILLS', fontSize: 12, fontFamily: 'Inter', fontStyle: 'bold', fill: '#3b82f6', x: 0, y: 0, letterSpacing: 3 },
          { type: 'rect', fill: '#3b82f6', x: 0, y: 20, width: 674, height: 2 },
          { type: 'text', text: 'JavaScript  •  TypeScript  •  Vue.js  •  Nuxt  •  Go  •  Python  •  Docker  •  Git', fontSize: 12, fontFamily: 'Inter', fontStyle: 'normal', fill: '#334155', x: 0, y: 34, width: 674 },
        ]
      },
      projects: {
        type: 'group',
        label: 'Projects',
        width: 674,
        height: 140,
        children: [
          { type: 'text', text: 'PROJECTS', fontSize: 12, fontFamily: 'Inter', fontStyle: 'bold', fill: '#3b82f6', x: 0, y: 0, letterSpacing: 3 },
          { type: 'rect', fill: '#3b82f6', x: 0, y: 20, width: 674, height: 2 },
          { type: 'text', text: 'Project Name', fontSize: 15, fontFamily: 'Inter', fontStyle: 'bold', fill: '#1e293b', x: 0, y: 34 },
          { type: 'text', text: 'A brief description of the project and what it does. Built with Vue.js, Go, and PostgreSQL.', fontSize: 12, fontFamily: 'Inter', fontStyle: 'normal', fill: '#475569', x: 0, y: 56, width: 674 },
        ]
      },
    }
    const config = sectionConfigs[sectionType]
    if (!config) return null
    return addLayer(config)
  }

  function addShape(shapeType) {
    const configs = {
      rect: { type: 'rect', fill: '#e2e8f0', width: 200, height: 100, cornerRadius: 0, stroke: '', strokeWidth: 0 },
      roundedRect: { type: 'rect', fill: '#e2e8f0', width: 200, height: 100, cornerRadius: 12, stroke: '', strokeWidth: 0 },
      circle: { type: 'circle', fill: '#e2e8f0', radius: 50, width: 100, height: 100 },
      line: { type: 'rect', fill: '#cbd5e1', width: 400, height: 2 },
      thickLine: { type: 'rect', fill: '#1e293b', width: 400, height: 4 },
      divider: { type: 'rect', fill: '#3b82f6', width: 674, height: 2 },
    }
    const config = configs[shapeType]
    if (!config) return null
    return addLayer(config)
  }

  function addImageLayer(src) {
    return addLayer({
      type: 'image',
      src,
      width: 150,
      height: 150,
      cornerRadius: 0,
    })
  }

  function updateLayer(id, updates) {
    pushHistory()
    const layer = state.layers.find(l => l.id === id)
    if (layer) Object.assign(layer, updates)
  }

  function removeLayer(id) {
    pushHistory()
    const idx = state.layers.findIndex(l => l.id === id)
    if (idx !== -1) {
      state.layers.splice(idx, 1)
      if (state.selectedId === id) state.selectedId = null
    }
  }

  function duplicateLayer(id) {
    const src = state.layers.find(l => l.id === id)
    if (!src) return
    const clone = JSON.parse(JSON.stringify(toRaw(src)))
    clone.id = generateId()
    clone.x += 20
    clone.y += 20
    pushHistory()
    state.layers.push(clone)
    state.selectedId = clone.id
  }

  function selectLayer(id) {
    state.selectedId = id
  }

  function deselectAll() {
    state.selectedId = null
  }

  function moveLayerUp(id) {
    const idx = state.layers.findIndex(l => l.id === id)
    if (idx < state.layers.length - 1) {
      pushHistory()
      const temp = state.layers[idx]
      state.layers[idx] = state.layers[idx + 1]
      state.layers[idx + 1] = temp
    }
  }

  function moveLayerDown(id) {
    const idx = state.layers.findIndex(l => l.id === id)
    if (idx > 0) {
      pushHistory()
      const temp = state.layers[idx]
      state.layers[idx] = state.layers[idx - 1]
      state.layers[idx - 1] = temp
    }
  }

  function undo() {
    if (state.historyIndex > 0) {
      state.historyIndex--
      state.layers = JSON.parse(JSON.stringify(state.history[state.historyIndex]))
    }
  }

  function redo() {
    if (state.historyIndex < state.history.length - 1) {
      state.historyIndex++
      state.layers = JSON.parse(JSON.stringify(state.history[state.historyIndex]))
    }
  }

  function getStateJSON() {
    return JSON.parse(JSON.stringify({
      projectName: state.projectName,
      canvasConfig: state.canvasConfig,
      layers: toRaw(state.layers),
    }))
  }

  function loadStateJSON(data) {
    if (data.projectName) state.projectName = data.projectName
    if (data.canvasConfig) Object.assign(state.canvasConfig, data.canvasConfig)
    if (data.layers) {
      state.layers = data.layers
      state.history = [JSON.parse(JSON.stringify(data.layers))]
      state.historyIndex = 0
    }
    state.selectedId = null
  }

  function setZoom(z) {
    state.canvasConfig.zoom = Math.max(0.25, Math.min(3, z))
  }

  function toggleGrid() {
    state.canvasConfig.showGrid = !state.canvasConfig.showGrid
  }

  return {
    state,
    selectedLayer,
    addLayer,
    addTextLayer,
    addSectionBlock,
    addShape,
    addImageLayer,
    updateLayer,
    removeLayer,
    duplicateLayer,
    selectLayer,
    deselectAll,
    moveLayerUp,
    moveLayerDown,
    undo,
    redo,
    getStateJSON,
    loadStateJSON,
    setZoom,
    toggleGrid,
  }
}
