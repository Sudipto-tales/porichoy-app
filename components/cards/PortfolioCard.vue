<template>
  <div class="group flex flex-col gap-5">
    <div
      class="relative aspect-[16/10] rounded-[2.5rem] overflow-hidden border-4 border-white shadow-sm hover:shadow-2xl hover:border-indigo-50 transition-all duration-500 bg-gray-100">
      <img :src="item.src" :alt="item.label"
        class="w-full h-full object-cover grayscale-[40%] group-hover:grayscale-0 transition-all duration-700" />

      <div class="absolute top-6 right-6 flex gap-2">
        <div v-if="item.isPro"
          class="h-8 w-8 rounded-xl bg-gray-900 flex items-center justify-center text-yellow-400 shadow-xl">
          <i class="fas fa-crown text-xs"></i>
        </div>
        <button v-if="showStar" @click.prevent="$emit('toggle-star', item.id)"
          class="h-8 w-8 rounded-xl bg-white/90 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-all">
          <i :class="['fas fa-star text-xs', isStarred ? 'text-yellow-400' : 'text-gray-300']"></i>
        </button>
      </div>

      <div
        class="absolute inset-0 bg-indigo-900/80 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col items-center justify-center p-8 text-center">
        <p class="text-indigo-200 text-[10px] font-black uppercase tracking-[0.3em] mb-4">{{ item.tech }}</p>
        <h3 class="text-white text-2xl font-black mb-8 leading-tight">{{ item.label }}</h3>

        <div class="flex items-center gap-3">
          <NuxtLink :to="previewLink"
            class="px-6 py-3 bg-white text-gray-900 rounded-xl text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-transform">
            Live Preview
          </NuxtLink>
          <NuxtLink :to="editorLink"
            class="px-6 py-3 bg-indigo-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-transform">
            Customize
          </NuxtLink>
        </div>
      </div>
    </div>

    <div class="px-4 flex items-start justify-between">
      <div>
        <h4 class="font-black text-gray-900 text-lg uppercase tracking-tight">{{ item.label }}</h4>
        <div class="flex items-center gap-3 mt-1">
          <span class="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{{ item.category }}</span>
          <span class="h-1 w-1 rounded-full bg-gray-200"></span>
          <span class="text-[10px] font-bold text-indigo-500 uppercase tracking-widest">{{ item.tech }}</span>
        </div>
      </div>
      <div class="text-right">
        <span class="text-sm font-black text-gray-900">{{ item.price === 0 ? 'FREE' : `$${item.price}` }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  item: { type: Object, required: true },
  previewLink: { type: String, default: '#' },
  editorLink: { type: String, default: '#' },
  showStar: { type: Boolean, default: false },
  isStarred: { type: Boolean, default: false }
})
defineEmits(['toggle-star'])
</script>
