<script setup>
definePageMeta({
  layout: 'dashboard-layout'
})

const passwordForm = reactive({
  current: '',
  new: '',
  confirm: ''
})

const updatePassword = () => {
  console.log('Credentials updated.')
}
</script>

<template>
  <main class="flex-1 overflow-y-auto bg-[#FDFDFD] custom-scrollbar">
    <div class="absolute inset-0 z-0 opacity-[0.03] pointer-events-none blueprint-fine"></div>

    <div class="max-w-6xl mx-auto px-6 py-16 relative z-10">
      
      <header class="mb-16 border-b border-gray-100 pb-12">
        <h1 class="text-3xl md:text-4xl font-black text-gray-900 tracking-tighter leading-none mb-4">
          SYSTEM <br />
          <span class="text-indigo-600 italic">PREFERENCES.</span>
        </h1>
        <p class="text-sm font-medium text-gray-400 uppercase tracking-[0.3em]">
          Configuration Mode: 03-MAR-2026
        </p>
      </header>

      <div class="space-y-20">
        
        <section class="grid grid-cols-1 md:grid-cols-3">
          <div class="space-y-2">
            <h3 class="text-xs font-black uppercase tracking-widest text-gray-900">Access Control</h3>
            <p class="text-[11px] text-gray-400 leading-relaxed font-medium">
              Update your authentication tokens to ensure the structural integrity of your account.
            </p>
          </div>

          <div class="md:col-span-2">
            <form @submit.prevent="updatePassword" class="space-y-8 bg-white p-8 md:p-12 rounded-3xl border border-gray-100 shadow-sm">
              <div class="space-y-6">
                <div class="relative group">
                  <label class="absolute -top-2 left-4 px-2 bg-white text-[9px] font-black text-indigo-600 uppercase tracking-widest z-10">Current Password</label>
                  <input v-model="passwordForm.current" type="password" class="w-full px-5 py-4 border border-gray-100 rounded-xl outline-none focus:border-indigo-600 transition-all text-sm font-bold" />
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div class="relative group">
                    <label class="absolute -top-2 left-4 px-2 bg-white text-[9px] font-black text-gray-400 uppercase tracking-widest z-10">New Password</label>
                    <input v-model="passwordForm.new" type="password" class="w-full px-5 py-4 border border-gray-100 rounded-xl outline-none focus:border-indigo-600 transition-all text-sm font-bold" />
                  </div>
                  <div class="relative group">
                    <label class="absolute -top-2 left-4 px-2 bg-white text-[9px] font-black text-gray-400 uppercase tracking-widest z-10">Confirm New</label>
                    <input v-model="passwordForm.confirm" type="password" class="w-full px-5 py-4 border border-gray-100 rounded-xl outline-none focus:border-indigo-600 transition-all text-sm font-bold" />
                  </div>
                </div>
              </div>

              <div class="pt-4 flex items-center justify-between">
                <span class="text-[10px] text-gray-300 font-bold italic underline">Lost password?</span>
                <button type="submit" class="px-10 py-4 bg-gray-900 text-white font-black text-[10px] uppercase tracking-[0.3em] rounded-xl hover:bg-indigo-600 transition-all">
                  Update_Credentials
                </button>
              </div>
            </form>
          </div>
        </section>

        <section class="grid grid-cols-1 md:grid-cols-3 p-6">
          <div class="space-y-2">
            <h3 class="text-xs font-black uppercase tracking-widest text-gray-900">Environment</h3>
            <p class="text-[11px] text-gray-400 leading-relaxed font-medium">
              Customize how the Porichoy engine renders your workspace data.
            </p>
          </div>

          <div class="md:col-span-2 space-y-4">
            <div class="flex items-center justify-between p-6 bg-white border border-gray-100 rounded-2xl">
              <div class="flex items-center gap-4">
                <div class="h-10 w-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400"><i class="fas fa-shield-alt"></i></div>
                <div>
                  <p class="text-xs font-black text-gray-800 uppercase">Two-Factor Authentication</p>
                  <p class="text-[10px] text-gray-400 font-medium italic mt-0.5">Recommended for high-security nodes.</p>
                </div>
              </div>
              <div class="w-12 h-6 bg-gray-100 rounded-full relative cursor-pointer flex items-center px-1">
                <div class="h-4 w-4 bg-white rounded-full shadow-sm"></div>
              </div>
            </div>

            <div class="flex items-center justify-between p-6 bg-white border border-gray-100 rounded-2xl">
              <div class="flex items-center gap-4">
                <div class="h-10 w-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400"><i class="fas fa-envelope-open-text"></i></div>
                <div>
                  <p class="text-xs font-black text-gray-800 uppercase">Deployment Alerts</p>
                  <p class="text-[10px] text-gray-400 font-medium italic mt-0.5">Receive logs when a portfolio is published.</p>
                </div>
              </div>
              <div class="w-12 h-6 bg-indigo-600 rounded-full relative cursor-pointer flex items-center justify-end px-1">
                <div class="h-4 w-4 bg-white rounded-full shadow-sm"></div>
              </div>
            </div>
          </div>
        </section>

        <section class="pt-12 border-t border-gray-100">
          <div class="p-8 rounded-3xl bg-red-50/30 border border-red-100 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h3 class="text-xs font-black text-red-600 uppercase tracking-widest mb-1">Erase Architectural Data</h3>
              <p class="text-[11px] text-gray-400 font-medium">This action will permanently decommission all assets and identity nodes.</p>
            </div>
            <button class="px-6 py-3 border border-red-200 text-red-600 text-[10px] font-black uppercase tracking-widest hover:bg-red-600 hover:text-white transition-all rounded-xl">
              Decommission_Account
            </button>
          </div>
        </section>

      </div>
    </div>
  </main>
</template>

<style scoped>
.blueprint-fine {
  background-image:
    linear-gradient(to right, rgba(0,0,0,0.08) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(0,0,0,0.08) 1px, transparent 1px);
  background-size: 80px 80px;
}

.custom-scrollbar::-webkit-scrollbar { width: 4px; }
.custom-scrollbar::-webkit-scrollbar-thumb { background: #E5E7EB; border-radius: 10px; }

h1 { word-spacing: -0.1em; }

input:focus + label {
  color: #4F46E5;
}
</style>