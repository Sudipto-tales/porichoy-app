<template>
  <button
    :class="[
      'px-5 py-2 rounded-full text-xs font-bold uppercase tracking-widest border transition',
      active
        ? 'bg-black text-white border-black'
        : 'bg-white border-gray-200 text-gray-500 hover:border-black hover:text-black'
    ]"
  >
    {{ label }}
  </button>
</template>

<script setup>
defineProps({
  label: String,
  active: Boolean
})
</script>