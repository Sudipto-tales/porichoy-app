<template>

    <!-- Badge -->
    <div
      v-if="badge"
      class="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-blue-600 text-white mb-4 shadow-lg shadow-blue-100"
    >
      <span class="text-[9px] font-black uppercase tracking-[0.3em]">
        {{ badge }}
      </span>
    </div>

    <!-- Title -->
    <h1
      class="text-3xl md:text-4xl font-black text-gray-900 tracking-tighter leading-[0.85] mb-4"
    >
      <slot name="title" />
    </h1>

    <!-- Description -->
    <p
      v-if="description"
      class="text-gray-400 text-base md:text-lg font-medium max-w-md leading-relaxed"
    >
      {{ description }}
    </p>
</template>

<script setup>
defineProps({
  badge: String,
  description: String
})
</script>