<template>
  <section class="mt-0">

    <div class="flex justify-between items-center mb-6">
      <h3 class="text-xl font-black">{{ title }}</h3>
      <button class="text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-black transition">
        View More →
      </button>
    </div>

    <div class="flex gap-6 overflow-x-auto pb-4 no-scrollbar">
      <div
        v-for="i in 8"
        :key="i"
        class="min-w-[260px] bg-white border border-gray-100 rounded-2xl p-6 hover:shadow-xl transition"
      >
        <div class="h-32 bg-gray-100 rounded-xl mb-4"></div>
        <h4 class="font-bold text-sm mb-1">Template {{ i }}</h4>
        <p class="text-xs text-gray-400">Professional • Minimal</p>
      </div>
    </div>

  </section>
</template>

<script setup>
defineProps({
  title: String
})
</script>

<style>
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  scrollbar-width: none;
}
</style>