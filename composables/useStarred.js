export const useStarred = () => {
  const starred = useState('starred', () => {
    if (process.client) {
      const saved = localStorage.getItem('starred')
      return saved ? JSON.parse(saved) : []
    }
    return []
  })

  const toggleStar = (id) => {
    if (starred.value.includes(id)) {
      starred.value = starred.value.filter(i => i !== id)
    } else {
      starred.value.push(id)
    }
    if (process.client) {
      localStorage.setItem('starred', JSON.stringify(starred.value))
    }
  }

  const isStarred = (id) => starred.value.includes(id)

  return { starred, toggleStar, isStarred }
}
