<script setup>
definePageMeta({ layout: 'dashboard-layout' })

const passwordForm = reactive({ current: '', new: '', confirm: '' })
const updatePassword = () => { console.log('Credentials updated.') }
</script>

<template>
  <main class="flex-1 overflow-y-auto custom-scrollbar">
    <div class="absolute inset-0 z-0 opacity-[0.02] pointer-events-none blueprint-fine"></div>
    <div class="max-w-6xl mx-auto px-6 py-16 relative z-10">
      
      <header class="mb-16 pb-12" :style="{ borderBottom: '1px solid var(--border)' }">
        <h1 class="text-3xl md:text-4xl font-black tracking-tighter leading-none mb-4" :style="{ color: 'var(--text-primary)' }">
          SYSTEM <br /><span class="text-blue-400 italic">PREFERENCES.</span>
        </h1>
        <p class="text-sm font-medium uppercase tracking-[0.3em]" :style="{ color: 'var(--text-muted)' }">Configuration Mode: 12-MAR-2026</p>
      </header>

      <div class="space-y-20">
        <section class="grid grid-cols-1 md:grid-cols-3">
          <div class="space-y-2">
            <h3 class="text-xs font-black uppercase tracking-widest" :style="{ color: 'var(--text-primary)' }">Access Control</h3>
            <p class="text-[11px] leading-relaxed font-medium" :style="{ color: 'var(--text-muted)' }">Update your authentication tokens.</p>
          </div>
          <div class="md:col-span-2">
            <form @submit.prevent="updatePassword" class="space-y-8 p-8 md:p-12 rounded-3xl"
              :style="{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border)' }">
              <div class="space-y-6">
                <div class="relative">
                  <label class="absolute -top-2 left-4 px-2 text-[9px] font-black text-blue-400 uppercase tracking-widest z-10" :style="{ backgroundColor: 'var(--bg-page)' }">Current Password</label>
                  <input v-model="passwordForm.current" type="password" class="w-full px-5 py-4 rounded-xl outline-none text-sm font-bold bg-transparent"
                    :style="{ border: '1px solid var(--border-input)', color: 'var(--text-primary)' }" />
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div class="relative">
                    <label class="absolute -top-2 left-4 px-2 text-[9px] font-black uppercase tracking-widest z-10" :style="{ backgroundColor: 'var(--bg-page)', color: 'var(--text-muted)' }">New Password</label>
                    <input v-model="passwordForm.new" type="password" class="w-full px-5 py-4 rounded-xl outline-none text-sm font-bold bg-transparent"
                      :style="{ border: '1px solid var(--border-input)', color: 'var(--text-primary)' }" />
                  </div>
                  <div class="relative">
                    <label class="absolute -top-2 left-4 px-2 text-[9px] font-black uppercase tracking-widest z-10" :style="{ backgroundColor: 'var(--bg-page)', color: 'var(--text-muted)' }">Confirm New</label>
                    <input v-model="passwordForm.confirm" type="password" class="w-full px-5 py-4 rounded-xl outline-none text-sm font-bold bg-transparent"
                      :style="{ border: '1px solid var(--border-input)', color: 'var(--text-primary)' }" />
                  </div>
                </div>
              </div>
              <div class="pt-4 flex items-center justify-between">
                <span class="text-[10px] font-bold italic underline cursor-pointer" :style="{ color: 'var(--text-muted)' }">Lost password?</span>
                <button type="submit" class="px-10 py-4 bg-blue-600 hover:bg-blue-500 text-white font-black text-[10px] uppercase tracking-[0.3em] rounded-xl transition-all">
                  Update_Credentials
                </button>
              </div>
            </form>
          </div>
        </section>

        <section class="grid grid-cols-1 md:grid-cols-3 p-6">
          <div class="space-y-2">
            <h3 class="text-xs font-black uppercase tracking-widest" :style="{ color: 'var(--text-primary)' }">Environment</h3>
            <p class="text-[11px] leading-relaxed font-medium" :style="{ color: 'var(--text-muted)' }">Customize your workspace rendering.</p>
          </div>
          <div class="md:col-span-2 space-y-4">
            <div class="flex items-center justify-between p-6 rounded-2xl" :style="{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border)' }">
              <div class="flex items-center gap-4">
                <div class="h-10 w-10 rounded-xl flex items-center justify-center" :style="{ backgroundColor: 'var(--icon-bg)', color: 'var(--icon-text)' }"><i class="fas fa-shield-alt"></i></div>
                <div>
                  <p class="text-xs font-black uppercase" :style="{ color: 'var(--text-primary)' }">Two-Factor Auth</p>
                  <p class="text-[10px] font-medium italic mt-0.5" :style="{ color: 'var(--text-muted)' }">Recommended for security.</p>
                </div>
              </div>
              <div class="w-12 h-6 rounded-full relative cursor-pointer flex items-center px-1" :style="{ backgroundColor: 'var(--toggle-bg)' }">
                <div class="h-4 w-4 rounded-full shadow-sm" :style="{ backgroundColor: 'var(--toggle-knob)' }"></div>
              </div>
            </div>
            <div class="flex items-center justify-between p-6 rounded-2xl" :style="{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border)' }">
              <div class="flex items-center gap-4">
                <div class="h-10 w-10 rounded-xl flex items-center justify-center" :style="{ backgroundColor: 'var(--icon-bg)', color: 'var(--icon-text)' }"><i class="fas fa-envelope-open-text"></i></div>
                <div>
                  <p class="text-xs font-black uppercase" :style="{ color: 'var(--text-primary)' }">Deployment Alerts</p>
                  <p class="text-[10px] font-medium italic mt-0.5" :style="{ color: 'var(--text-muted)' }">Logs when portfolio is published.</p>
                </div>
              </div>
              <div class="w-12 h-6 bg-blue-600 rounded-full relative cursor-pointer flex items-center justify-end px-1">
                <div class="h-4 w-4 bg-white rounded-full shadow-sm"></div>
              </div>
            </div>
          </div>
        </section>

        <section class="pt-12" :style="{ borderTop: '1px solid var(--border)' }">
          <div class="p-8 rounded-3xl flex flex-col md:flex-row md:items-center justify-between gap-6"
            :style="{ backgroundColor: 'var(--danger-bg)', border: '1px solid var(--danger-border)' }">
            <div>
              <h3 class="text-xs font-black uppercase tracking-widest mb-1" :style="{ color: 'var(--danger-text)' }">Erase Architectural Data</h3>
              <p class="text-[11px] font-medium" :style="{ color: 'var(--text-muted)' }">This will permanently decommission all assets.</p>
            </div>
            <button class="px-6 py-3 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all hover:bg-red-600 hover:text-white"
              :style="{ border: '1px solid var(--danger-border)', color: 'var(--danger-text)' }">
              Decommission_Account
            </button>
          </div>
        </section>
      </div>
    </div>
  </main>
</template>

<style scoped>
.blueprint-fine { background-image: linear-gradient(to right, var(--grid-pattern) 1px, transparent 1px), linear-gradient(to bottom, var(--grid-pattern) 1px, transparent 1px); background-size: 80px 80px; }
.custom-scrollbar::-webkit-scrollbar { width: 4px; }
.custom-scrollbar::-webkit-scrollbar-thumb { background: var(--scrollbar-thumb); border-radius: 10px; }
input:focus { border-color: rgba(59, 130, 246, 0.4) !important; }
</style>