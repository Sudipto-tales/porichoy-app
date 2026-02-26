<template>
  <NuxtLink
    v-if="to"
    :to="to"
    class="group flex items-center gap-4 w-full px-4 py-3 rounded-xl transition-all duration-100 text-gray-500 hover:text-black hover:bg-yellow-50"
    active-class="bg-yellow-50 !text-black"
  >
    <i :class="icon" class="text-lg transition-transform duration-300 group-hover:scale-110"></i>
    <span v-if="expanded" class="text-xs font-bold uppercase tracking-widest whitespace-nowrap transition-opacity duration-1500">
      {{ label }}
    </span>
  </NuxtLink>

  <button
    v-else
    class="group flex items-center gap-4 w-full px-4 py-3 rounded-xl transition-all duration-100 text-gray-500 hover:text-black hover:bg-yellow-50"
    :class="{ 'bg-yellow-50 text-black': active }"
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
