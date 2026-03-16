<template>
    <nav class="sticky top-0 z-40 flex justify-between items-center px-6 py-3 lg:px-16 flex-shrink-0 backdrop-blur-xl"
      :style="{ backgroundColor: 'var(--nav-bg)', borderBottom: '1px solid var(--border)' }">

        <!-- LEFT SIDE -->
        <div class="flex items-center gap-8">
            <NuxtLink v-if="showLogo" to="/dashboard" class="flex items-center gap-2 group cursor-pointer">
                <img src="/porichoy.favicon.png" alt="Porichoy Logo"
                    class="w-9 h-9 object-contain transition-transform duration-300 group-hover:scale-110" />
                <div class="flex items-center gap-1">
                    <span class="text-lg font-black uppercase tracking-tighter" :style="{ color: 'var(--text-primary)' }">Porich</span>
                    <img src="/security.png" alt="Identity Icon"
                        class="w-4 h-4 md:w-5 md:h-5 object-contain inline-block -mt-0.5 transform group-hover:rotate-12 transition-all duration-300" />
                    <span class="text-lg font-black uppercase tracking-tighter" :style="{ color: 'var(--text-primary)' }">y</span>
                </div>
            </NuxtLink>
        </div>

        <!-- RIGHT SIDE -->
        <div class="flex items-center gap-4">

            <!-- Beta Button -->
            <NuxtLink v-if="betaButton" to="/coming_soon"
                class="hidden md:inline-flex bg-blue-600 text-white px-5 py-2 rounded-full text-xs font-bold hover:bg-blue-500 transition-all duration-300 hover:scale-105 shadow-lg shadow-blue-600/20">
                Join Beta
            </NuxtLink>

            <!-- Notification Bell -->
            <div class="relative group">
                <div class="relative cursor-pointer h-9 w-9 rounded-xl flex items-center justify-center transition-all"
                  :style="{ backgroundColor: 'var(--icon-bg)' }">
                    <i class="fa-regular fa-bell text-base transition-colors" :style="{ color: 'var(--icon-text)' }"></i>
                    <span class="absolute -top-1 -right-1 bg-red-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full">3</span>
                </div>

                <!-- Dropdown -->
                <div class="absolute right-0 mt-3 w-80 rounded-2xl shadow-2xl opacity-0 invisible translate-y-2 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-300 z-50"
                  :style="{ backgroundColor: 'var(--dropdown-bg)', border: '1px solid var(--border)' }">
                    <div class="flex justify-between items-center px-4 py-3" :style="{ borderBottom: '1px solid var(--border)' }">
                        <h3 class="text-xs font-bold" :style="{ color: 'var(--text-secondary)' }">Notifications</h3>
                        <button class="text-[10px] text-blue-400 hover:underline">Mark all as read</button>
                    </div>
                    <div class="max-h-72 overflow-y-auto">
                        <div class="px-4 py-3 hover:bg-blue-500/[0.06] transition cursor-pointer">
                            <p class="text-[12px] font-medium" :style="{ color: 'var(--text-secondary)' }">🎉 Your portfolio is live!</p>
                            <p class="text-[10px] mt-1" :style="{ color: 'var(--text-muted)' }">username.porichoy.in is now published.</p>
                            <p class="text-[9px] mt-1" :style="{ color: 'var(--text-dimmed)' }">2 min ago</p>
                        </div>
                        <div class="px-4 py-3 hover:bg-blue-500/[0.06] transition cursor-pointer">
                            <p class="text-[12px] font-medium" :style="{ color: 'var(--text-secondary)' }">📄 Resume downloaded</p>
                            <p class="text-[10px] mt-1" :style="{ color: 'var(--text-muted)' }">Someone downloaded your resume.</p>
                            <p class="text-[9px] mt-1" :style="{ color: 'var(--text-dimmed)' }">1 hour ago</p>
                        </div>
                        <div class="px-4 py-3 hover:bg-blue-500/[0.06] transition cursor-pointer">
                            <p class="text-[12px] font-medium" :style="{ color: 'var(--text-secondary)' }">🚀 Upgrade to Pro</p>
                            <p class="text-[10px] mt-1" :style="{ color: 'var(--text-muted)' }">Unlock premium templates and analytics.</p>
                            <p class="text-[9px] mt-1" :style="{ color: 'var(--text-dimmed)' }">Yesterday</p>
                        </div>
                    </div>
                    <div class="px-4 py-3 text-center" :style="{ borderTop: '1px solid var(--border)' }">
                        <a href="/notifications" class="text-[11px] text-blue-400 font-medium hover:underline">View all notifications</a>
                    </div>
                </div>
            </div>

            <!-- Dark Mode Toggle -->
            <button @click="toggleTheme"
                class="h-9 w-9 rounded-xl flex items-center justify-center transition-all group/dm"
                :style="{ backgroundColor: 'var(--icon-bg)' }">
                <i :class="[isDark ? 'fas fa-moon text-blue-400' : 'fas fa-sun text-amber-400', 'text-base transition-all duration-300 group-hover/dm:rotate-12']"></i>
            </button>

            <!-- Profile Dropdown -->
            <div v-if="profile" class="relative group">
                <div class="w-9 h-9 rounded-xl overflow-hidden cursor-pointer ring-2 ring-transparent group-hover:ring-blue-500/50 transition-all flex items-center justify-center"
                  :style="{ backgroundColor: 'var(--icon-bg)' }">
                    <img :src="profile.avatar" :alt="profile.name + ' Profile Icon'" class="w-full h-full object-cover" />
                </div>
                <div class="absolute right-0 mt-3 w-48 rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50"
                  :style="{ backgroundColor: 'var(--dropdown-bg)', border: '1px solid var(--border)' }">
                    <NuxtLink to="/settings" class="block px-4 py-2.5 text-[12px] transition-colors rounded-t-xl hover:bg-blue-500/10"
                      :style="{ color: 'var(--text-secondary)' }">
                        <i class="fas fa-gear text-[10px] mr-2" :style="{ color: 'var(--text-muted)' }"></i> Settings
                    </NuxtLink>
                    <NuxtLink to="/coming-soon" class="block px-4 py-2.5 hover:bg-red-500/10 text-[12px] text-red-400/60 hover:text-red-400 transition-colors rounded-b-xl">
                        <i class="fas fa-sign-out-alt text-[10px] mr-2"></i> Logout
                    </NuxtLink>
                </div>
            </div>
        </div>
    </nav>
</template>

<script setup>
import { useTheme } from '~/composables/useTheme'

defineProps({
    showLogo: { type: Boolean, default: true },
    betaButton: { type: Boolean, default: false },
    navItems: { type: Object, default: () => ({ comingSoon: false, betaAccess: false }) },
    profile: { type: Object, default: null }
})

const { isDark, toggleTheme } = useTheme()
</script>