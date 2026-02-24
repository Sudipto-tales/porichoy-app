<template>
  <div class="flex items-start py-5">

    <div
      class="relative bg-white border border-black/10 rounded-[40px] p-12 shadow-sm overflow-visible"
      style="width: 200vh; max-width: 200vh;"
    >

      <!-- Content -->
      <div class="relative z-10 max-w-xl">

        <h2 class="text-4xl font-black mb-4 tracking-tight">
          Welcome back, Arif 👋
        </h2>

        <p class="text-gray-500 text-lg leading-relaxed">
          Continue crafting your professional identity and explore
          new creative templates.
        </p>

      </div>

      <!-- Decorative Border Glow -->
      <div
        class="absolute inset-0 rounded-[40px] border border-black/5 pointer-events-none"
      ></div>

      <!-- Decorative Blob -->
      <svg
        class="absolute right-[26px] bottom-[-36px] w-72 opacity-10"
        viewBox="0 0 200 200"
        fill="black"
      >
        <path
          d="M44.8,-76.1C57.4,-69.3,66.9,-57.4,73.9,-43.9C80.9,-30.3,85.3,-15.1,84.5,-0.5C83.6,14.1,77.5,28.3,69.5,40.7C61.4,53.1,51.4,63.8,39.1,70.6C26.8,77.4,12.9,80.4,-1.8,83.3C-16.5,86.2,-33,89,-45.6,82.9C-58.2,76.8,-66.8,61.8,-73.4,46.2C-80.1,30.6,-84.9,15.3,-84.8,0.1C-84.7,-15.1,-79.8,-30.3,-72.1,-43.8C-64.4,-57.3,-53.9,-69.1,-40.8,-75.7C-27.7,-82.4,-13.9,-83.9,1.3,-86.1C16.4,-88.3,32.9,-91.3,44.8,-76.1Z"
          transform="translate(100 100)"
        />
      </svg>

      <!-- Person Image -->
      <img
        src="/image/gojo-no-bg.png"
        alt="Person"
        class="absolute right-[-40px] bottom-[-140px] w-[380px] z-20"
      />

    </div>

  </div>
</template>

<script setup>
</script>