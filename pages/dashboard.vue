<template>
  <div class="h-screen w-full bg-[#f8f9fc] flex flex-col overflow-hidden font-sans selection:bg-blue-100">

    <Nav class="z-50 bg-white/80 backdrop-blur-md border-b border-gray-100"
      :profile="{ name: 'Sudipta', avatar: '/porichoy.favicon.png' }" />

    <div class="flex flex-1 overflow-hidden relative">
      <sideBar class="z-40 border-r border-gray-100 bg-white" />

      <main class="flex-1 overflow-y-auto scroll-smooth custom-scrollbar">

        <div class="max-w-[1600px] mx-auto px-6 lg:px-12 py-8">

          <section class="mb-10 animate-in fade-in slide-in-from-top-4 duration-700">
            <Welcome />
          </section>

          <section class="sticky top-0 z-30 transparent py-4 space-y-6 px-2 -mx-2 transition-all duration-300">

            <div class="flex flex-col md:flex-row md:items-center gap-4">
              <div class="flex-1">
                <SearchBar />
              </div>
            </div>

          </section>


          <div class="relative">
            <filterIcons />
          </div>

          <div class="space-y-16 pb-20">
            <DashboardRow title="Creative Resumes" />
            <DashboardRow title="Professional Resumes" />
            <DashboardRow title="Modern Resumes" />
          </div>

        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import DashboardRow from '~/components/dash/rows.vue'
import Nav from '~/components/nav.vue'
import Welcome from '~/components/dash/welcome.vue'
import sideBar from '~/components/sideBar.vue';
import SearchBar from '~/components/ui/searchBar.vue';
import filterIcons from '~/components/dash/filterIcons.vue';
</script>

<style scoped>
/* Creative Scrollbar for a premium look */
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #e2e8f0;
  border-radius: 10px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #cbd5e1;
}

/* Ensure background stays clean */
main {
  background-image: radial-gradient(#e5e7eb 1px, transparent 1px);
  background-size: 40px 40px;
  background-attachment: local;
}
</style>