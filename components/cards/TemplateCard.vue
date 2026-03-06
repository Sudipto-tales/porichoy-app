<template>
  <div class="group space-y-4">
    <div
      class="relative aspect-[3/4] bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden group-hover:shadow-2xl group-hover:-translate-y-2 transition-all duration-500">
      <img :src="item.src" :alt="item.label" class="w-full h-full object-cover" />

      <div v-if="item.isPro"
        class="absolute top-3 left-3 px-2 py-0.5 bg-yellow-400 text-[8px] font-black uppercase rounded shadow-sm">
        Pro
      </div>

      <button v-if="showStar" @click.prevent="$emit('toggle-star', item.id)"
        class="absolute top-3 right-3 h-8 w-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-all">
        <i :class="['fas fa-star text-sm', isStarred ? 'text-yellow-400' : 'text-gray-300']"></i>
      </button>

      <div
        class="absolute inset-0 bg-gray-900/10 opacity-0 group-hover:opacity-100 transition-all flex flex-col items-center justify-end p-6">
        <NuxtLink :to="actionLink"
          class="w-full py-3 bg-white text-gray-900 text-[10px] font-black uppercase tracking-widest text-center shadow-xl hover:bg-blue-600 hover:text-white transition-all">
          {{ actionText }}
        </NuxtLink>
      </div>
    </div>

    <div class="text-center md:text-left">
      <h4 class="text-sm font-black text-gray-900 uppercase tracking-tight">{{ item.label }}</h4>
      <div class="flex items-center justify-center md:justify-start gap-2 mt-1">
        <span class="text-[9px] font-bold text-gray-400 uppercase tracking-widest">{{ item.style || item.category }}</span>
        <span class="h-1 w-1 bg-gray-200 rounded-full"></span>
        <span class="text-[9px] font-black" :class="item.price === 0 ? 'text-green-500' : 'text-gray-900'">
          {{ item.price === 0 ? 'FREE' : `$${item.price}` }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  item: { type: Object, required: true },
  actionLink: { type: String, default: '#' },
  actionText: { type: String, default: 'Use Template' },
  showStar: { type: Boolean, default: false },
  isStarred: { type: Boolean, default: false }
})
defineEmits(['toggle-star'])
</script>
