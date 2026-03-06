<template>
  <NuxtLayout>
    <div v-if="error.statusCode === 404">
      <NuxtPage />
    </div>
    <div v-else-if="error.statusCode === 500">
      <div class="min-h-screen flex items-center justify-center bg-gray-50 px-6">
        <div class="text-center max-w-2xl">
          <div class="mb-8">
            <i class="fas fa-server text-6xl text-red-500 mb-4"></i>
          </div>
          <h1 class="text-4xl font-black uppercase tracking-tight mb-4">
            SERVER <span class="text-red-500">ERROR</span>
          </h1>
          <p class="text-gray-600 mb-8">Something went wrong on our end. Please try again later.</p>
          <div class="flex gap-4 justify-center">
            <NuxtLink to="/"
              class="px-6 py-3 bg-gray-900 text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-gray-800 transition-all">
              Go Home
            </NuxtLink>
            <button @click="handleError"
              class="px-6 py-3 bg-gray-100 text-gray-900 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-gray-200 transition-all">
              Try Again
            </button>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <div class="min-h-screen flex items-center justify-center bg-gray-50 px-6">
        <div class="text-center max-w-2xl">
          <h1 class="text-4xl font-black uppercase tracking-tight mb-4">
            ERROR <span class="text-gray-400">{{ error.statusCode }}</span>
          </h1>
          <p class="text-gray-600 mb-8">{{ error.message }}</p>
          <NuxtLink to="/"
            class="px-6 py-3 bg-gray-900 text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-gray-800 transition-all">
            Go Home
          </NuxtLink>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup>
const props = defineProps({
  error: Object
})

const handleError = () => clearError({ redirect: '/' })
</script>
