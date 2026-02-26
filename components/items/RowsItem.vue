<template>
  <div class="flex gap-6 overflow-x-auto pb-6 no-scrollbar scroll-smooth">

    <NuxtLink
      v-for="(item, index) in items"
      :key="index"
      :to="item.id ? `/template/${item.id}` : '#'"
      class="relative flex-shrink-0 rounded-2xl overflow-hidden group cursor-pointer transition-all duration-300 hover:shadow-2xl"
      :class="getCardSize(index)"
    >

      <!-- Image -->
      <div class="h-full bg-gray-100 overflow-hidden">
        <img
          :src="item.src"
          :alt="item.label || 'Template'"
          class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      <!-- Overlay -->
      <div
        class="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition duration-300"
      ></div>

      <!-- Top Right Buttons -->
      <div
        class="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition duration-300"
      >
        <!-- Love Button -->
        <button
          class="w-9 h-9 flex items-center justify-center rounded-full bg-white/90 backdrop-blur-md shadow-md hover:bg-white transition"
        >
          <i class="fa fa-heart text-gray-700 hover:text-red-500 transition"></i>
        </button>

        <!-- Three Dot Button -->
        <button
          class="w-9 h-9 flex items-center justify-center rounded-full bg-white/90 backdrop-blur-md shadow-md hover:bg-white transition"
        >
          <i class="fa fa-ellipsis-v text-gray-700"></i>
        </button>
      </div>

      <!-- Bottom Label on Hover -->
      <div
        v-if="item.label"
        class="absolute bottom-0 left-0 right-0 px-4 py-3 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition duration-300"
      >
        <p class="text-white text-sm font-bold">{{ item.label }}</p>
        <p v-if="item.subtitle" class="text-white/70 text-[11px]">{{ item.subtitle }}</p>
      </div>

    </NuxtLink>

  </div>
</template>

<script setup>
const props = defineProps({
  items: { type: Array, default: () => [] },
  layout: { type: String, default: 'a4' }
})

useHead({
  link: [
    {
      rel: "stylesheet",
      href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
    }
  ]
})

const getCardSize = (index) => {
  switch (props.layout) {
    case 'a4':
      return 'w-[230px] h-[320px]'
    case 'portfolio':
      return index % 2 === 0 ? 'w-[230px] h-[320px]' : 'w-[430px] h-[320px]'
    case 'presentation':
      return 'w-[380px] h-[220px]'
    case 'social':
      return 'w-[280px] h-[280px]'
    default:
      return 'w-[230px] h-[320px]'
  }
}
</script>

<style scoped>
.no-scrollbar::-webkit-scrollbar { display: none; }
.no-scrollbar { scrollbar-width: none; }
</style>
