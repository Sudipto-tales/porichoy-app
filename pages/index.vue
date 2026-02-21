<template>
    <div
        class="relative h-screen flex flex-col bg-[#FDFDFD] text-[#1A1A1A] font-sans overflow-x-hidden overflow-y-auto lg:overflow-hidden">

        <nav class="relative z-30 flex justify-between items-center px-6 py-6 lg:px-16 flex-shrink-0">
            <div class="flex items-center gap-2">
                <img src="/porichoy.favicon.png" alt="Porichoy Logo" class="w-10 h-10 md:w-10 md:h-10 object-contain" />
                <div class="flex items-center gap-1 group cursor-pointer">
                    <span class="text-xl font-black uppercase tracking-tighter">Porich</span>

                    <img src="/security.png" alt="Identity Icon"
                        class="w-5 h-5 md:w-6 md:h-6 object-contain inline-block -mt-1 transform group-hover:rotate-12 transition-transform" />

                    <span class="text-xl font-black uppercase tracking-tighter">y</span>
                </div>
            </div>

            <button
                class="bg-black text-white px-6 py-2.5 rounded-full text-sm font-bold hover:bg-gray-800 transition-all">
                Join Beta
            </button>
        </nav>

        <main
            class="relative z-10 flex-grow flex flex-col lg:flex-row items-center justify-between px-6 lg:px-16 pb-10 lg:pb-0">

            <div class="w-full lg:w-1/2 space-y-6 text-center lg:text-left lg:pr-10">
                <div
                    class="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-black text-[10px] font-black text-white uppercase tracking-[0.2em]">
                    <span class="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></span>
                    Platform Alpha
                </div>

                <h1 class="text-5xl md:text-7xl lg:text-[5.5rem] font-black leading-[0.9] tracking-tighter">
                    Craft Your <br />
                    <span class="text-gray-400">Identity.</span>
                </h1>

                <p class="text-gray-500 text-lg max-w-sm mx-auto lg:mx-0 leading-relaxed font-medium">
                    The elite workspace to build your professional portfolio and CV.
                    <span
                        class="text-black underline decoration-yellow-400 decoration-2 underline-offset-4">Porichoy</span>
                    is identity, redefined.
                </p>

                <form @submit.prevent="handleSubmit" class="relative max-w-md mx-auto lg:mx-0 pt-4">
                    <div
                        class="flex flex-col sm:flex-row items-center p-1.5 bg-white border-2 border-gray-100 rounded-2xl sm:rounded-full shadow-xl focus-within:border-black transition-all">
                        <input v-model="email" type="email" placeholder="Enter your email address"
                            class="flex-1 bg-transparent px-6 py-4 outline-none text-sm font-medium w-full" required />
                        <button
                            class="w-full sm:w-auto bg-black text-white px-8 py-4 rounded-xl sm:rounded-full text-sm font-black hover:bg-yellow-400 hover:text-black transition-all">
                            Notify Me
                        </button>
                    </div>
                    <p class="mt-4 text-[11px] text-gray-400 italic font-bold ml-4">
                        <i class="fa-solid fa-shield-halved text-yellow-500 mr-1"></i> *Zero spam. Just progress.
                    </p>
                </form>
            </div>

            <div class="w-full lg:w-1/2 mt-12 lg:mt-0 relative flex justify-center items-center h-full">
                <div class="relative w-full max-w-[500px] lg:max-w-full h-full flex items-center justify-center">
                    <img src="https://images.unsplash.com/photo-1616469829581-73993eb86b02?q=80&w=2070&auto=format&fit=crop"
                        alt="Professional Identity Mockup"
                        class="rounded-[2rem] shadow-2xl lg:max-h-[70vh] object-cover border-[12px] border-white" />

                    <div
                        class="absolute -bottom-5 -right-5 lg:right-10 bg-white p-5 rounded-2xl shadow-2xl border border-gray-100 flex items-center gap-4 animate-bounce-slow hidden sm:flex">
                        <div class="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white">
                            <i class="fa-solid fa-check"></i>
                        </div>
                        <div>
                            <p class="text-xs font-black uppercase">Verified</p>
                            <p class="text-[10px] text-gray-400">Identity Active</p>
                        </div>
                    </div>
                </div>
            </div>
        </main>

        <footer
            class="relative z-30 p-8 lg:px-16 flex flex-col md:flex-row justify-between items-center text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] border-t border-gray-50 flex-shrink-0">
            <div class="flex gap-8">
                <a href="#" class="hover:text-black transition-colors">Facebook</a>
                <a href="#" class="hover:text-black transition-colors">X</a>
                <a href="#" class="hover:text-black transition-colors">Instagram</a>
            </div>
            <p class="text-black py-4 md:py-0">© 2026 Porichoy Studios</p>
            <div class="flex gap-8">
                <a href="#" class="hover:text-black transition-colors">Legal</a>
                <a href="#" class="hover:text-black transition-colors">Privacy</a>
            </div>
        </footer>

    </div>
</template>

<script setup>
import { ref } from 'vue'

useSeoMeta({
    title: 'Porichoy - Craft Your Professional Identity',
    description: 'Join the elite workspace to build your professional portfolio and CV. Porichoy is identity, redefined.',
    ogTitle: 'Porichoy - Craft Your Professional Identity',
    ogDescription: 'Join the elite workspace to build your professional portfolio and CV. Porichoy is identity, redefined.',
    ogImage: '/porichoy.og-image.png',
})
// SEO and Icons
useHead({
    link: [
        { rel: 'icon', type: 'image/x-icon', href: '/porichoy.favicon.png' },
        { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css' }
    ],
})

const email = ref('')
const handleSubmit = () => {
    alert('Welcome to the Porichoy inner circle!')
    email.value = ''
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;700;800;900&display=swap');

body {
    font-family: 'Plus Jakarta Sans', sans-serif;
    margin: 0;
    padding: 0;
}

@keyframes bounce-slow {

    0%,
    100% {
        transform: translateY(0);
    }

    50% {
        transform: translateY(-12px);
    }
}

.animate-bounce-slow {
    animation: bounce-slow 4s ease-in-out infinite;
}

/* Ensure no scroll on large screens */
@media (min-width: 1024px) {

    html,
    body {
        overflow: hidden;
    }
}
</style>