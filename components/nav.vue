<template>
  <nav class="relative z-30 flex justify-between items-center px-6 py-6 lg:px-16 flex-shrink-0">

    <!-- Logo -->
    <div v-if="showLogo" class="flex items-center gap-2">
      <img
        src="/porichoy.favicon.png"
        alt="Porichoy Logo"
        class="w-10 h-10 object-contain"
      />

      <div class="flex items-center gap-1 group cursor-pointer">
        <span class="text-xl font-black uppercase tracking-tighter">
          Porich
        </span>

        <img
          src="/security.png"
          alt="Identity Icon"
          class="w-5 h-5 md:w-6 md:h-6 object-contain inline-block -mt-1 transform group-hover:rotate-12 transition-transform"
        />

        <span class="text-xl font-black uppercase tracking-tighter">
          y
        </span>
      </div>
    </div>

    <!-- Nav Items -->
    <div
      class="hidden md:flex gap-8 text-[10px] font-bold uppercase tracking-[0.3em] text-gray-500"
    >
      <span
        v-if="navItems.comingSoon"
        class="text-yellow-400"
      >
        01. Coming Soon
      </span>

      <NuxtLink
        v-if="navItems.betaAccess"
        to="/"
        class="hover:text-white cursor-help transition-colors cursor-pointer"
      >
        02. Beta Access
      </NuxtLink>
    </div>

    <!-- Beta Button -->
    <NuxtLink
      v-if="betaButton"
      to="/coming_soon"
      class="bg-black text-white px-6 py-2.5 rounded-full text-sm font-bold hover:bg-gray-800 transition-all"
    >
      Join Beta
    </NuxtLink>

    <!-- Profile Icon -->
    <div v-if="profile" class="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
      <img :src="profile.avatar" :alt="profile.name + ' Profile Icon'" class="w-6 h-6 object-contain" />
    </div>

  </nav>
</template>

<script setup>
defineProps({
  showLogo: {
    type: Boolean,
    default: true
  },
  betaButton: {
    type: Boolean,
    default: false
  },
  navItems: {
    type: Object,
    default: () => ({
      comingSoon: false,
      betaAccess: false
    })
  },
  profile: {
    type: Object,
    default: null
  }
})
</script>