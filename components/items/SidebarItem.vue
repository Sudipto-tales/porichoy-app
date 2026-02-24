<template>
  <button
    class="group flex items-center gap-4 w-full px-4 py-3 rounded-xl transition-all duration-300
           text-gray-500 hover:text-black hover:bg-yellow-50"
  >
    <!-- Icon -->
    <i :class="icon" class="text-lg transition-transform duration-300 group-hover:scale-110"></i>

    <!-- Label (Desktop only or when expanded) -->
    <span
      v-if="expanded"
      class="text-xs font-bold uppercase tracking-widest whitespace-nowrap transition-opacity duration-300"
    >
      {{ label }}
    </span>
  </button>
</template>

<script setup>
defineProps({
  label: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    required: true
  },
  expanded: {
    type: Boolean,
    default: true
  }
})
useHead({
  link: [
    {
      rel: 'stylesheet',
      href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css'
    }
  ]
})
</script>