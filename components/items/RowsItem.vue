<template>
  <div class="flex gap-6 overflow-x-auto pb-6 no-scrollbar scroll-smooth">
    <NuxtLink
      v-for="(item, index) in items"
      :key="index"
      :to="item.id ? `/template/${item.id}` : '#'"
      class="relative flex-shrink-0 rounded-2xl overflow-hidden group cursor-pointer transition-all duration-300 hover:shadow-2xl"
      :class="getCardSize(index)"
      :style="{ border: '1px solid var(--border)' }"
    >
      <div class="h-full overflow-hidden" :style="{ backgroundColor: 'var(--bg-card)' }">
        <img :src="item.src" :alt="item.label || 'Template'" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
      </div>

      <div class="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition duration-300"></div>

      <div class="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition duration-300">
        <button class="w-9 h-9 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-md shadow-md hover:bg-white/20 transition">
          <i class="fas fa-heart text-white/70 hover:text-red-400 transition text-xs"></i>
        </button>
        <button class="w-9 h-9 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-md shadow-md hover:bg-white/20 transition">
          <i class="fas fa-ellipsis-v text-white/70 text-xs"></i>
        </button>
      </div>

      <div v-if="item.label" class="absolute bottom-0 left-0 right-0 px-4 py-3 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition duration-300">
        <p class="text-white text-sm font-bold">{{ item.label }}</p>
        <p v-if="item.subtitle" class="text-white/60 text-[11px]">{{ item.subtitle }}</p>
      </div>
    </NuxtLink>
  </div>
</template>

<script setup>
const props = defineProps({
  items: { type: Array, default: () => [] },
  layout: { type: String, default: 'a4' }
})

const getCardSize = (index) => {
  switch (props.layout) {
    case 'a4': return 'w-[230px] h-[320px]'
    case 'portfolio': return index % 2 === 0 ? 'w-[230px] h-[320px]' : 'w-[430px] h-[320px]'
    case 'presentation': return 'w-[380px] h-[220px]'
    case 'social': return 'w-[280px] h-[280px]'
    default: return 'w-[230px] h-[320px]'
  }
}
</script>

<style scoped>
.no-scrollbar::-webkit-scrollbar { display: none; }
.no-scrollbar { scrollbar-width: none; }
</style>
