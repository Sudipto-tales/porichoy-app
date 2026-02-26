<template>
  <div class="px-6 lg:px-12">
    <div class="flex items-center justify-between mb-4">
      <h3 class="text-xl font-black tracking-tight text-gray-800">{{ title }}</h3>
      <button
        class="text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-black transition"
      >
        View More →
      </button>
    </div>
    <RowsItem :layout="layout" :items="items" />
  </div>
</template>

<script setup>
import RowsItem from '../items/RowsItem.vue'

defineProps({
  title: { type: String, required: true },
  layout: { type: String, default: 'a4' },
  items: { type: Array, default: () => [] }
})
</script>
