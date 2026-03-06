import { computed, unref } from 'vue'

export function useTemplateFilter(resumes, searchQuery, activeCategory) {
  const filtered = computed(() => {
    const data = unref(resumes) || []
    const query = (unref(searchQuery) || '').toLowerCase()
    const category = unref(activeCategory)

    return data.filter(r => {
      const matchesSearch =
        r.label?.toLowerCase().includes(query)

      const matchesCat =
        category === 'All Templates' ||
        r.style === category

      return matchesSearch && matchesCat
    })
  })

  return { filtered }
}