<template>
  <div class="relative">
    <i class="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-sm" :style="{ color: 'var(--text-muted)' }"></i>
    <input 
      type="text" 
      placeholder="Search templates, categories..." 
      class="w-full pl-11 pr-4 py-3 rounded-2xl text-sm outline-none transition-all focus:ring-2 focus:ring-blue-500/20"
      :style="{ backgroundColor: 'var(--bg-input)', border: '1px solid var(--border)', color: 'var(--text-secondary)', '--tw-placeholder-opacity': 1 }"
    />
  </div>
</template>

<style scoped>
input::placeholder { color: var(--text-muted); }
input:focus { border-color: rgba(59, 130, 246, 0.3); background-color: var(--bg-card-hover); }
</style>