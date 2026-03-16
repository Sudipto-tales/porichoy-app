<template>
  <NuxtLink
    v-if="to"
    :to="to"
    class="group flex items-center gap-4 w-full px-4 py-3 rounded-xl transition-all duration-100"
    :style="{ color: 'var(--text-muted)' }"
    active-class="!bg-blue-500/10 !text-blue-400"
  >
    <i :class="icon" class="text-lg transition-transform duration-300 group-hover:scale-110"></i>
    <span v-if="expanded" class="text-xs font-bold uppercase tracking-widest whitespace-nowrap transition-opacity duration-1500">
      {{ label }}
    </span>
  </NuxtLink>

  <button
    v-else
    class="group flex items-center gap-4 w-full px-4 py-3 rounded-xl transition-all duration-100"
    :style="{ color: active ? '#60a5fa' : 'var(--text-muted)' }"
    :class="{ 'bg-blue-500/10': active }"
  >
    <i :class="icon" class="text-lg transition-transform duration-300 group-hover:scale-110"></i>
    <span v-if="expanded" class="text-xs font-bold uppercase tracking-widest whitespace-nowrap transition-opacity duration-1500">
      {{ label }}
    </span>
  </button>
</template>

<script setup>
defineProps({
  label: { type: String, required: true },
  icon: { type: String, required: true },
  expanded: { type: Boolean, default: true },
  active: { type: Boolean, default: false },
  to: { type: String, default: null },
})
</script>

<style scoped>
a:hover, button:hover {
  background-color: var(--bg-card-hover);
  color: var(--text-primary);
}
</style>
