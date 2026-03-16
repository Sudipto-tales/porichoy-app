// Theme composable — manages light/dark mode globally
import { ref, watch } from 'vue'

const isDark = ref(true) // Default to dark

export function useTheme() {
  // Initialize from localStorage on first load
  if (import.meta.client) {
    const saved = localStorage.getItem('porichoy-theme')
    if (saved !== null) {
      isDark.value = saved === 'dark'
    }
    applyTheme()
  }

  function applyTheme() {
    if (import.meta.client) {
      const html = document.documentElement
      if (isDark.value) {
        html.classList.add('dark')
        html.setAttribute('data-theme', 'dark')
      } else {
        html.classList.remove('dark')
        html.setAttribute('data-theme', 'light')
      }
    }
  }

  function toggleTheme() {
    isDark.value = !isDark.value
    if (import.meta.client) {
      localStorage.setItem('porichoy-theme', isDark.value ? 'dark' : 'light')
    }
    applyTheme()
  }

  // Watch for changes
  watch(isDark, () => {
    applyTheme()
  })

  return {
    isDark,
    toggleTheme,
    applyTheme,
  }
}
