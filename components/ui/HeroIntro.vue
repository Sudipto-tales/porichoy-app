<template>
  <div>
    <div class="flex items-center gap-3 mb-4">
      <div class="h-[1px] w-8" :style="{ backgroundColor: 'var(--border-hover)' }"></div>
      <span class="text-[10px] font-black uppercase tracking-[0.3em]" :style="{ color: 'var(--text-muted)' }">{{ badge }}</span>
    </div>
    <h1 class="text-3xl md:text-4xl font-black tracking-tighter leading-[0.9] mb-4" :style="{ color: 'var(--text-primary)' }">
      <slot name="title"></slot>
    </h1>
    <p v-if="description" class="text-sm font-medium leading-relaxed max-w-lg" :style="{ color: 'var(--text-secondary)' }">{{ description }}</p>
  </div>
</template>

<script setup>
defineProps({
  badge: { type: String, default: '' },
  description: { type: String, default: '' },
})
</script>