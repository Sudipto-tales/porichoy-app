import { toRaw } from 'vue'

export function useCanvasExport() {

  function exportToPNG(stageRef, filename = 'resume.png') {
    if (!stageRef?.value) return
    const stage = stageRef.value.getNode()
    const dataURL = stage.toDataURL({ pixelRatio: 2, mimeType: 'image/png' })
    downloadDataURL(dataURL, filename)
  }

  function exportToJSON(getStateJSON, filename = 'resume.json') {
    const data = getStateJSON()
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    downloadDataURL(url, filename)
    URL.revokeObjectURL(url)
  }

  function saveToLocalStorage(id, getStateJSON) {
    const data = getStateJSON()
    localStorage.setItem(`porichoy-resume-${id}`, JSON.stringify(data))
  }

  function loadFromLocalStorage(id) {
    const raw = localStorage.getItem(`porichoy-resume-${id}`)
    return raw ? JSON.parse(raw) : null
  }

  function downloadDataURL(url, filename) {
    const link = document.createElement('a')
    link.href = url
    link.download = filename
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return {
    exportToPNG,
    exportToJSON,
    saveToLocalStorage,
    loadFromLocalStorage,
  }
}
