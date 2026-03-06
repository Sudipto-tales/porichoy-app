<template>
    <div class="h-screen w-full bg-[#f8f9fc] flex flex-col overflow-hidden font-sans selection:bg-blue-100">
        <Nav class="z-50 bg-white/80 backdrop-blur-md border-b border-gray-100"
            :profile="{ name: user.name, avatar: user.avatar }" />

        <div class="flex flex-1 overflow-hidden relative">
            <sideBar class="z-40 border-r border-gray-100 bg-white" />

            <main class="flex-1 overflow-y-auto scroll-smooth custom-scrollbar bg-dots">
                <div class="max-w-[1400px] mx-auto px-6 py-8">

                    <section class="relative mb-8 animate-in fade-in slide-in-from-top-4 duration-700">
                        <div class="h-48 md:h-64 w-full rounded-t-3xl overflow-hidden relative group">
                            <img :src="user.banner"
                                class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                            <div class="absolute inset-0 bg-gradient-to-b from-transparent to-black/20"></div>

                            <!-- Edit Overlay -->
                            <div
                                class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col items-center justify-center text-white">

                                <label class="cursor-pointer flex flex-col items-center gap-2">
                                    <i class="fas fa-pen text-xl"></i>
                                    <span class="text-xs font-bold uppercase tracking-widest">
                                        Change Banner
                                    </span>
                                    <span class="text-[10px] text-gray-300">
                                        Recommended: 1400 x 600 px
                                    </span>
                                    <input type="file" accept="image/*" class="hidden" @change="handleBannerUpload" />
                                </label>
                            </div>
                        </div>

                        <div class="bg-white rounded-b-3xl border-x border-b border-gray-100 p-6 shadow-sm relative">
                            <div class="flex flex-col md:flex-row items-end md:items-center gap-6 -mt-20 md:-mt-24">
                                <div class="relative group">
                                    <div
                                        class="h-32 w-32 md:h-40 md:w-40 rounded-3xl border-4 border-white overflow-hidden shadow-xl bg-white">
                                        <img :src="user.avatar" class="w-full h-full object-cover" />

                                        <!-- Edit Overlay -->
                                        <div
                                            class="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col items-center justify-center text-white rounded-3xl">

                                            <label class="cursor-pointer flex flex-col items-center gap-1">
                                                <i class="fas fa-camera text-lg"></i>
                                                <span class="text-[10px] font-bold uppercase">
                                                    Edit
                                                </span>
                                                <span class="text-[9px] text-gray-300">
                                                    400 x 400 px
                                                </span>
                                                <input type="file" accept="image/*" class="hidden"
                                                    @change="handleAvatarUpload" />
                                            </label>
                                        </div>
                                    </div>
                                    <div
                                        class="absolute bottom-2 right-2 h-4 w-4 bg-green-500 border-2 border-white rounded-full">
                                    </div>
                                </div>

                                <div class="flex-1 pt-4 md:pt-16">
                                    <h1 class="text-3xl font-extrabold text-gray-900">{{ user.name }}</h1>
                                    <p class="text-blue-600 font-medium">{{ user.headline }}</p>
                                    <div class="flex items-center gap-4 mt-2 text-gray-500 text-sm">
                                        <span><i class="fas fa-map-marker-alt mr-2"></i>{{ user.location }}</span>
                                        <span><i class="fas fa-link mr-2"></i>{{ user.website }}</span>
                                    </div>
                                </div>

                                <div class="md:pt-16 flex gap-3">
                                    <button @click="isEditModalOpen = true"
                                        class="px-6 py-2.5 rounded-xl bg-gray-900 text-white font-bold text-sm hover:bg-gray-800 transition-all flex items-center gap-2 shadow-lg shadow-gray-200">
                                        <i class="fas fa-pen text-xs"></i>
                                    </button>
                                    <button @click="isEditModalOpen = true"
                                        class="px-6 py-2.5 rounded-xl bg-gray-900 text-white font-bold text-sm hover:bg-gray-800 transition-all flex items-center gap-2 shadow-lg shadow-gray-200">
                                        <i class="fas fa-download text-xs"></i>
                                        Download CV
                                    </button>
                                    <NuxtLink to="/profile/edit" class="px-6 py-2.5 rounded-xl bg-blue-600 text-white font-bold text-sm hover:bg-blue-700 transition-all flex items-center gap-2 shadow-lg shadow-blue-200">
                                        <i class="fas fa-cogs text-xs"></i>
                                        Customize
                                    </NuxtLink>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                        <div v-for="stat in statistics" :key="stat.label"
                            class="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                            <p class="text-xs font-bold text-gray-400 uppercase tracking-widest">{{ stat.label }}</p>
                            <div class="flex items-end gap-2 mt-1">
                                <h3 class="text-2xl font-black text-gray-800">{{ stat.value }}</h3>
                                <span class="text-xs font-bold text-green-500 mb-1">
                                    <i class="fas fa-caret-up mr-1"></i>{{ stat.growth }}
                                </span>
                            </div>
                        </div>
                    </section>

                    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 pb-32">

                        <div class="lg:col-span-8 space-y-10">

                            <section
                                class="bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-sm relative overflow-hidden group mb-8">
                                <div
                                    class="absolute top-0 right-0 p-6 opacity-5 group-hover:scale-110 transition-transform">
                                    <i class="fas fa-fingerprint text-5xl text-grey-400"></i>
                                </div>
                                <h3 class="text-xl font-black text-gray-800 mb-6 flex items-center gap-3">
                                    <span class="h-8 w-1.5 rounded-full bg-blue-600"></span> About Me
                                </h3>
                                <p class="text-gray-500 text-lg leading-relaxed max-w-3xl">{{ user.about }}</p>
                            </section>

                            <div class="grid grid-cols-2 md:grid-cols-2 gap-8">
                                <section class="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
                                    <h3 class="text-lg font-bold text-gray-800 mb-8 flex items-center gap-3">
                                        <div
                                            class="h-10 w-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
                                            <i class="fas fa-briefcase text-sm"></i>
                                        </div>
                                        Experience
                                    </h3>
                                    <div class="space-y-12">
                                        <div v-for="exp in experiences" :key="exp.company"
                                            class="relative pl-10 border-l-2 border-gray-100 pb-2">

                                            <!-- <div
                                                class="absolute -left-[9px] top-1.5 h-4 w-4 rounded-full bg-white border-4 border-blue-600 shadow-sm z-10">
                                            </div> -->

                                            <div class="transition-transform duration-300 hover:translate-x-1">
                                                <h4 class="font-bold text-gray-800 text-base leading-none">{{ exp.role
                                                    }}</h4>
                                                <p
                                                    class="text-blue-600 text-[10px] font-black uppercase tracking-[0.15em] mt-2">
                                                    {{ exp.company }} <span class="mx-1 text-gray-300">•</span> {{
                                                        exp.period }}
                                                </p>
                                                <p class="text-gray-400 text-xs mt-3 leading-relaxed">
                                                    {{ exp.desc }}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </section>

                                <section class="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
                                    <h3 class="text-lg font-bold text-gray-800 mb-8 flex items-center gap-3">
                                        <div
                                            class="h-10 w-10 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600">
                                            <i class="fas fa-graduation-cap text-sm"></i>
                                        </div>
                                        Education
                                    </h3>
                                    <div class="space-y-8">
                                        <div v-for="edu in education" :key="edu.school"
                                            class="relative pl-8 border-l-2 border-gray-100">
                                            <div
                                                class="absolute -left-[9px] top-0 h-4 w-4 rounded-full bg-white border-4 border-purple-600 shadow-sm">
                                            </div>
                                            <h4 class="font-bold text-gray-800">{{ edu.degree }}</h4>
                                            <p
                                                class="text-purple-600 text-[11px] font-black uppercase tracking-widest mt-1">
                                                {{ edu.school }}</p>
                                            <p class="text-gray-400 text-xs mt-1">{{ edu.period }}</p>
                                        </div>
                                    </div>
                                </section>
                            </div>

                            <section>
                                <div class="flex items-center justify-between mb-8 px-4">
                                    <h3 class="text-xl font-black text-gray-800 uppercase tracking-widest">Selected
                                        Works</h3>
                                    <button class="text-sm font-bold text-blue-600 hover:underline">View All</button>
                                </div>
                                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div v-for="project in projects" :key="project.name"
                                        class="group p-8 rounded-[2rem] bg-white border border-gray-100 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-500/5 transition-all cursor-pointer">
                                        <div class="flex justify-between items-start mb-6">
                                            <div
                                                class="h-12 w-12 rounded-2xl bg-gray-50 group-hover:bg-blue-600 group-hover:text-white flex items-center justify-center text-gray-400 transition-all duration-500">
                                                <i class="fas fa-project-diagram"></i>
                                            </div>
                                            <i
                                                class="fas fa-arrow-right -rotate-45 text-gray-300 group-hover:text-blue-600 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all"></i>
                                        </div>
                                        <h4 class="text-lg font-black text-gray-800 mb-1">{{ project.name }}</h4>
                                        <p class="text-[10px] font-black text-blue-500 uppercase tracking-[0.2em] mb-4">
                                            {{ project.tech }}</p>
                                        <p class="text-gray-400 text-sm leading-relaxed">{{ project.desc }}</p>
                                    </div>
                                </div>
                            </section>
                        </div>

                        <div class="lg:col-span-4 space-y-8">

                            <!-- <button
                                class="w-full group bg-blue-600 hover:bg-blue-700 p-5 rounded-2xl text-white font-black text-sm uppercase tracking-widest transition-all shadow-2xl shadow-blue-200 flex items-center justify-center gap-4 active:scale-95">
                                <i class="fas fa-cloud-download-alt text-lg group-hover:animate-bounce"></i>
                                Download Resume
                            </button> -->

                            <section
                                class="bg-[#111827] p-8 rounded-[2.5rem] border border-gray-800 relative overflow-hidden shadow-2xl">
                                <div class="absolute -top-20 -right-20 h-40 w-40 bg-blue-500/10 blur-[80px]"></div>
                                <div class="relative z-10">
                                    <h3
                                        class="text-white font-black text-sm uppercase tracking-[0.2em] mb-8 flex items-center gap-3">
                                        <span class="h-2 w-2 rounded-full bg-blue-500 animate-pulse"></span> Profile
                                        Reach
                                    </h3>
                                    <div class="space-y-8">
                                        <div v-for="reach in profileReach" :key="reach.platform">
                                            <div class="flex justify-between text-[10px] font-black uppercase mb-3">
                                                <span class="text-gray-400">{{ reach.platform }}</span>
                                                <span class="text-blue-400 tracking-tighter">{{ reach.percentage
                                                }}%</span>
                                            </div>
                                            <div class="h-1.5 w-full bg-gray-800 rounded-full overflow-hidden">
                                                <div class="h-full bg-gradient-to-r from-blue-600 to-cyan-400 rounded-full transition-all duration-1000 shadow-[0_0_15px_rgba(37,99,235,0.4)]"
                                                    :style="{ width: reach.percentage + '%' }"></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="mt-10 pt-6 border-t border-gray-800 flex justify-between items-center">
                                        <span
                                            class="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Global
                                            Analytics</span>
                                        <i class="fas fa-chart-pie text-gray-600"></i>
                                    </div>
                                </div>
                            </section>

                            <section class="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
                                <h3 class="text-xs font-black text-gray-400 uppercase tracking-widest mb-6">Expertise
                                </h3>
                                <div class="flex flex-wrap gap-2">
                                    <span v-for="skill in skills" :key="skill"
                                        class="px-4 py-2 rounded-xl bg-gray-50 text-gray-600 text-xs font-bold border border-gray-100 hover:border-blue-500 hover:text-blue-600 hover:bg-blue-50 transition-all cursor-default">
                                        {{ skill }}
                                    </span>
                                </div>
                            </section>

                            <section class="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
                                <h3 class="text-xs font-black text-gray-400 uppercase tracking-widest mb-6">Lifestyle
                                </h3>
                                <div class="grid grid-cols-2 gap-4">
                                    <div v-for="hobby in hobbies" :key="hobby.label"
                                        class="flex items-center gap-3 p-4 rounded-2xl bg-gray-50/50 group">
                                        <div
                                            class="h-8 w-8 rounded-lg bg-white flex items-center justify-center shadow-sm text-blue-500 group-hover:scale-110 transition-transform">
                                            <i :class="['fas', hobby.icon, 'text-xs']"></i>
                                        </div>
                                        <span class="text-[10px] font-black text-gray-500 uppercase tracking-tight">{{
                                            hobby.label }}</span>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            </main>
        </div>

        <Transition name="fade">
            <div v-if="isEditModalOpen" class="fixed inset-0 z-[100] flex items-center justify-center p-4">
                <div class="absolute inset-0 bg-gray-900/60 backdrop-blur-md" @click="isEditModalOpen = false"></div>
                <div
                    class="bg-white w-full max-w-2xl rounded-[2.5rem] shadow-2xl relative z-10 overflow-hidden animate-in zoom-in-95 duration-300">
                    <div class="px-8 py-6 border-b border-gray-50 flex justify-between items-center bg-gray-50/50">
                        <div>
                            <h2 class="text-xl font-black text-gray-900">Customize Profile</h2>
                            <p class="text-xs text-gray-500 font-medium">Changes will be reflected instantly across
                                {{ config.public.appName }}</p>
                        </div>
                        <button @click="isEditModalOpen = false"
                            class="h-10 w-10 rounded-full bg-white shadow-sm flex items-center justify-center text-gray-400 hover:text-red-500 transition-colors">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>

                    <form @submit.prevent="updateProfile" class="p-8 space-y-6">
                        <div class="grid grid-cols-2 gap-6">
                            <div class="space-y-2">
                                <label
                                    class="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">Display
                                    Name</label>
                                <input v-model="editForm.name" type="text"
                                    class="w-full px-5 py-3 rounded-2xl border border-gray-200 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all font-bold text-gray-800" />
                            </div>
                            <div class="space-y-2">
                                <label
                                    class="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">Headline</label>
                                <input v-model="editForm.headline" type="text"
                                    class="w-full px-5 py-3 rounded-2xl border border-gray-200 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all font-bold text-gray-800" />
                            </div>
                        </div>

                        <div class="space-y-2">
                            <label class="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">About
                                Story</label>
                            <textarea v-model="editForm.about" rows="4"
                                class="w-full px-5 py-3 rounded-2xl border border-gray-200 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all resize-none text-gray-600 leading-relaxed"></textarea>
                        </div>

                        <div class="pt-4 flex gap-4">
                            <button type="button" @click="isEditModalOpen = false"
                                class="flex-1 px-8 py-4 rounded-2xl bg-gray-100 text-gray-500 font-black text-xs uppercase tracking-widest hover:bg-gray-200 transition-all">Discard</button>
                            <button type="submit"
                                class="flex-1 px-8 py-4 rounded-2xl bg-blue-600 text-white font-black text-xs uppercase tracking-widest hover:bg-blue-700 shadow-xl shadow-blue-100 transition-all">Apply
                                Changes</button>
                        </div>
                    </form>
                </div>
            </div>
        </Transition>
    </div>
</template>

<script setup>
import { ref, reactive } from 'vue'

const isEditModalOpen = ref(false)
const config = useRuntimeConfig()

const user = reactive({
    name: 'Sudipta Ghosh',
    headline: 'Founder @ Ignis IT | Software Architect',
    location: 'West Bengal, India',
    website: 'ignis-it.com',
    avatar: '/porichoy.favicon.png',
    banner: 'https://images.unsplash.com/photo-1614850523296-d8c1af93d400?w=1400&h=600&fit=crop',
    about: 'Software developer and founder of Ignis IT with a deep passion for building scalable systems. Specializing in Nuxt.js, Go, and AI-driven platforms like Porichoy and Ignis Atlas. I believe in engineering products that are as beautiful as they are functional.'
})

const editForm = reactive({ ...user })

const statistics = [
    { label: 'Profile Reach', value: '42.8K', growth: '24%' },
    { label: 'Projects', value: '18', growth: '12%' },
    { label: 'Network', value: '1.2K', growth: '8%' },
    { label: 'Impact', value: '94%', growth: '5%' },
]

const experiences = [
    { company: 'Ignis IT', role: 'Founder & CEO', period: '2024 - Present', desc: 'Directing technical vision and developing enterprise-grade AI solutions and management systems.' },
    { company: 'Hotaru Project', role: 'Lead Go Developer', period: '2023 - 2024', desc: 'Engineered high-concurrency backend services for temporary messaging platforms.' }
]

const education = [
    { school: 'B.Tech CS', degree: 'Computer Science & Engineering', period: '2021 - 2025' }
]

const projects = [
    { name: 'Porichoy', tech: 'Nuxt.js • FastAPI', desc: 'The ultimate AI-powered CV and professional portfolio generator.' },
    { name: 'Ignis Atlas', tech: 'Flutter • Go • K8s', desc: 'Next-gen task management system built for high-performance teams.' },
    { name: 'Hotaru', tech: 'Golang • Redis', desc: 'Secure, high-speed temporary messaging service for private data sharing.' },
    { name: 'Air Transfer', tech: 'Python • PyTorch', desc: 'Experimental AI learning platform focused on neural weight optimization.' }
]

const skills = ['Nuxt.js', 'Golang', 'FastAPI', 'Flutter', 'Kubernetes', 'Docker', 'Redis', 'Tailwind CSS', 'Frappe Framework']

const hobbies = [
    { icon: 'fa-code-branch', label: 'Open Source' },
    { icon: 'fa-gamepad', label: 'Strategy Games' },
    { icon: 'fa-rocket', label: 'Space Tech' },
    { icon: 'fa-camera-retro', label: 'Photography' }
]

const profileReach = [
    { platform: 'LinkedIn Search', percentage: 92 },
    { platform: 'Direct Portfolios', percentage: 78 },
    { platform: 'Github Repos', percentage: 64 },
    { platform: 'AI Referrals', percentage: 45 }
]

const updateProfile = () => {
    Object.assign(user, editForm)
    isEditModalOpen.value = false
}

const handleBannerUpload = (event) => {
    const file = event.target.files[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (e) => {
        user.banner = e.target.result
    }
    reader.readAsDataURL(file)
}

const handleAvatarUpload = (event) => {
    const file = event.target.files[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (e) => {
        user.avatar = e.target.result
    }
    reader.readAsDataURL(file)
}
useSeoMeta({
    title: `${user.name} | ${config.public.appName} Profile`,
    description: `This page is used to show ${user.name} profile data.`,
    ogTitle: `${config.public.appName} - Coming Soon`,
    ogDescription:
        'The new standard for professional identities is launching soon.',
    ogImage: user.avtar
})
useHead({
    link: [
        {
            rel: 'icon',
            type: 'image/png',
            href: '/porichoy.favicon.png'
        }]
})
</script>

<style scoped>
.bg-dots {
    background-image: radial-gradient(#e5e7eb 1px, transparent 1px);
    background-size: 50px 50px;
}

.custom-scrollbar::-webkit-scrollbar {
    width: 5px;
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

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>