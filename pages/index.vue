<template>
    <div class="relative min-h-screen bg-[#FDFDFD] overflow-hidden font-sans text-[#1A1A1A] flex flex-col">

        <!-- Background Blurs -->
        <div
            class="absolute -top-40 -right-20 w-[500px] h-[500px] bg-yellow-100/50 rounded-full blur-[120px] pointer-events-none">
        </div>
        <div
            class="absolute top-1/2 -right-40 w-[400px] h-[400px] bg-yellow-200/30 rounded-full blur-[100px] pointer-events-none">
        </div>

        <!-- Navigation -->
        <nav class="relative z-20 flex justify-between items-center px-6 py-6 md:px-16">
            <div class="flex items-center gap-2">
                <div class="w-8 h-8 bg-black rounded-l-full"></div>
                <span class="text-xl font-bold tracking-tight">Porichoy</span>
            </div>
            <button
                class="bg-black text-white px-6 py-2 rounded-full text-sm font-semibold hover:bg-gray-800 transition">
                Join Beta
            </button>
        </nav>

        <!-- Main Content -->
        <main class="relative z-10 flex-grow flex flex-col lg:flex-row items-center px-6 md:px-16 py-12 lg:py-20">

            <!-- Left Content -->
            <div class="w-full lg:w-1/2 space-y-6 text-center lg:text-left mt-12 lg:mt-0">
                <div
                    class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-100 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                    <span class="w-1.5 h-1.5 bg-yellow-400 rounded-full animate-pulse"></span>
                    Coming Soon
                </div>

                <h1 class="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
                    Get Notified <br />
                    <span class="text-gray-400 font-medium">When we Launch</span>
                </h1>

                <p class="text-gray-500 text-base md:text-lg max-w-md mx-auto lg:mx-0">
                    The fastest way to craft your professional identity. Build your CV and portfolio with Porichoy.
                </p>

                <!-- Email Form -->
                <form @submit.prevent="handleSubmit" class="relative max-w-md mx-auto lg:mx-0">
                    <div
                        class="flex items-center p-1.5 bg-white border border-gray-200 rounded-full shadow-sm focus-within:border-black transition-all">
                        <input v-model="email" type="email" placeholder="Enter your email address"
                            class="flex-1 bg-transparent px-6 py-3 outline-none text-sm" required />
                        <button
                            class="bg-black text-white px-6 py-3 rounded-full text-sm font-bold hover:scale-105 active:scale-95 transition-all">
                            Notify Me
                        </button>
                    </div>
                    <p class="mt-3 text-[11px] text-gray-400 ml-4 italic font-medium">
                        *Don't worry, we will not spam you :)
                    </p>
                </form>
            </div>

            <!-- Right Content -->
            <div class="w-full lg:w-1/2 mt-16 lg:mt-0 relative flex justify-center items-center">
                <div class="absolute w-72 h-72 bg-yellow-400/10 rounded-full blur-3xl"></div>

                <div
                    class="relative z-10 w-60 aspect-[9/18] bg-white rounded-[40px] shadow-2xl border-[6px] border-gray-900 overflow-hidden transform rotate-2">
                    <div class="p-6 pt-12 space-y-4">
                        <div class="w-10 h-10 bg-gray-100 rounded-xl"></div>
                        <div class="h-3 w-2/3 bg-gray-100 rounded"></div>
                        <div class="h-2 w-full bg-gray-50 rounded"></div>
                        <div class="pt-4 flex gap-2">
                            <div class="h-20 flex-1 bg-gray-50 rounded-xl"></div>
                            <div class="h-20 flex-1 bg-gray-50 rounded-xl border border-yellow-100"></div>
                        </div>
                        <div class="h-24 w-full bg-gray-50 rounded-xl"></div>
                    </div>
                </div>

                <div
                    class="absolute bottom-10 -right-4 md:right-10 z-20 backdrop-blur-md bg-white/70 border border-white/50 p-4 rounded-2xl shadow-xl w-48 -rotate-3">
                    <div class="flex items-center gap-3">
                        <div class="w-8 h-8 bg-green-400 rounded-full"></div>
                        <div>
                            <p class="text-[10px] font-bold">Live Status</p>
                            <p class="text-[8px] text-gray-500">Portfolio is online</p>
                        </div>
                    </div>
                </div>
            </div>

        </main>

        <!-- Footer -->
        <footer
            class="p-8 md:px-16 flex flex-col md:flex-row justify-between items-center text-[11px] font-bold text-gray-400 uppercase tracking-widest gap-4 md:gap-0">
            <div class="flex gap-6">
                <NuxtLink to="#"><i class="fa-brands fa-square-facebook"></i></NuxtLink>
                <NuxtLink to="#"><i class="fa-brands fa-square-twitter"></i></NuxtLink>
                <NuxtLink to="#"><i class="fa-brands fa-square-instagram"></i></NuxtLink>
                <NuxtLink to="#"><i class="fa-brands fa-square-youtube"></i></NuxtLink>
            </div>
            <div class="flex gap-6">
                <a href="#">FAQ</a>
                <a href="#">Privacy</a>
            </div>
        </footer>

    </div>
</template>

<script setup>
useSeoMeta({
    title: 'Porichoy - Craft Your Professional Identity',
    description: 'The fastest way to craft your professional identity. Build your CV and portfolio with Porichoy.',
    ogTitle: 'Porichoy - Craft Your Professional Identity',
    ogDescription: 'The fastest way to craft your professional identity. Build your CV and portfolio with Porichoy.',
    ogImage: '/og-image.png',
    twitterCard: 'summary_large_image',
    twitterTitle: 'Porichoy - Craft Your Professional Identity',
    twitterDescription: 'The fastest way to craft your professional identity. Build your CV and portfolio with Porichoy.',
    twitterImage: '/og-image.png',
})

useHead({
    link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }
        ,
        { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css' }
    ],
})

const email = ref('')
const handleSubmit = () => {
    alert('Email registered for Porichoy!')
    email.value = ''
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;700;800&display=swap');

body {
    font-family: 'Plus Jakarta Sans', sans-serif;
}
</style>