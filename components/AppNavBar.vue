<template>
    <nav class="sticky top-0 z-40 flex justify-between items-center 
           px-6 py-4 lg:px-16 flex-shrink-0
           bg-white/70 backdrop-blur-xl 
           border-b border-slate-200/60">

        <!-- LEFT SIDE -->
        <div class="flex items-center gap-8">

            <!-- Logo -->
            <div v-if="showLogo" class="flex items-center gap-2 group cursor-pointer">
                <img src="/porichoy.favicon.png" alt="Porichoy Logo"
                    class="w-10 h-10 object-contain transition-transform duration-300 group-hover:scale-110" />

                <div class="flex items-center gap-1">
                    <span class="text-xl font-black uppercase tracking-tighter">
                        Porich
                    </span>

                    <img src="/security.png" alt="Identity Icon"
                        class="w-5 h-5 md:w-6 md:h-6 object-contain inline-block -mt-1 transform group-hover:rotate-12 transition-all duration-300" />

                    <span class="text-xl font-black uppercase tracking-tighter">
                        y
                    </span>
                </div>
            </div>

            <!-- Desktop Links -->
            <div class="hidden md:flex gap-8 text-xs font-semibold uppercase tracking-widest text-slate-500">
                <NuxtLink to="/templates" class="hover:text-black transition-colors">
                    Templates
                </NuxtLink>

                <NuxtLink to="/pricing" class="hover:text-black transition-colors">
                    Pricing
                </NuxtLink>

                <NuxtLink to="/explore" class="hover:text-black transition-colors">
                    Explore
                </NuxtLink>
            </div>

        </div>

        <!-- RIGHT SIDE -->
        <div class="flex items-center gap-4">

            <!-- Beta Button -->
            <NuxtLink v-if="betaButton" to="/coming_soon"
                class="hidden md:inline-flex bg-black text-white px-6 py-2 rounded-full text-sm font-semibold hover:bg-gray-800 transition-all duration-300 hover:scale-105">
                Join Beta
            </NuxtLink>

            <!-- Publish Button (Dashboard Mode) -->
            <!-- <NuxtLink
        v-if="profile"
        to="/publish"
        class="hidden md:inline-flex bg-indigo-600 text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-indigo-700 transition-all duration-300 hover:scale-105 shadow-lg"
      >
        🚀 Publish
      </NuxtLink> -->
            <div class="relative group">

                <!-- Bell Icon -->
                <div class="relative cursor-pointer">
                    <i class="fa-regular fa-bell text-xl text-slate-600 group-hover:text-black transition-colors"></i>

                    <!-- Unread Badge -->
                    <span
                        class="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                        3
                    </span>
                </div>

                <!-- Dropdown -->
                <div class="absolute right-0 mt-4 w-80 bg-white rounded-2xl shadow-2xl border border-slate-200
           opacity-0 invisible translate-y-2
           group-hover:opacity-100 group-hover:visible group-hover:translate-y-0
           transition-all duration-300">

                    <!-- Header -->
                    <div class="flex justify-between items-center px-4 py-3 border-b border-slate-100">
                        <h3 class="text-sm font-semibold text-slate-800">Notifications</h3>
                        <button class="text-xs text-indigo-500 hover:underline">
                            Mark all as read
                        </button>
                    </div>

                    <!-- Notification List -->
                    <div class="max-h-72 overflow-y-auto">

                        <!-- Unread Notification -->
                        <div class="px-4 py-3 hover:bg-slate-50 transition cursor-pointer bg-indigo-50/40">
                            <p class="text-sm font-medium text-slate-800">
                                🎉 Your portfolio is live!
                            </p>
                            <p class="text-xs text-slate-500 mt-1">
                                username.porichoy.in is now published.
                            </p>
                            <p class="text-[10px] text-slate-400 mt-1">2 min ago</p>
                        </div>

                        <!-- Normal Notification -->
                        <div class="px-4 py-3 hover:bg-slate-50 transition cursor-pointer">
                            <p class="text-sm font-medium text-slate-800">
                                📄 Resume downloaded
                            </p>
                            <p class="text-xs text-slate-500 mt-1">
                                Someone downloaded your resume.
                            </p>
                            <p class="text-[10px] text-slate-400 mt-1">1 hour ago</p>
                        </div>

                        <div class="px-4 py-3 hover:bg-slate-50 transition cursor-pointer">
                            <p class="text-sm font-medium text-slate-800">
                                🚀 Upgrade to Pro
                            </p>
                            <p class="text-xs text-slate-500 mt-1">
                                Unlock premium templates and analytics.
                            </p>
                            <p class="text-[10px] text-slate-400 mt-1">Yesterday</p>
                        </div>

                    </div>

                    <!-- Footer -->
                    <div class="px-4 py-3 border-t border-slate-100 text-center">
                        <a href="/notifications" class="text-sm text-indigo-600 font-medium hover:underline">
                            View all notifications
                        </a>
                    </div>

                </div>

            </div>
            <!-- Profile Dropdown -->
            <div v-if="profile" class="relative group">
                <div
                    class="w-10 h-10 rounded-full bg-gray-200 overflow-hidden cursor-pointer ring-2 ring-transparent group-hover:ring-indigo-500 transition-all">
                    <img :src="profile.avatar" :alt="profile.name + ' Profile Icon'"
                        class="w-full h-full object-cover" />
                </div>

                <!-- Dropdown -->
                <div
                    class="absolute right-0 mt-3 w-48 bg-white rounded-xl shadow-xl border border-slate-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                    <NuxtLink to="/dashboard" class="block px-4 py-2 hover:bg-slate-50 text-sm">
                        Dashboard
                    </NuxtLink>
                    <NuxtLink to="/settings" class="block px-4 py-2 hover:bg-slate-50 text-sm">
                        Settings
                    </NuxtLink>
                    <NuxtLink to="/logout" class="block px-4 py-2 hover:bg-red-50 text-sm text-red-500">
                        Logout
                    </NuxtLink>
                </div>
            </div>

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