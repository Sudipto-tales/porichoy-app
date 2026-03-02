<template>
  <div class="h-screen w-full bg-[#f8f9fc] flex flex-col overflow-hidden font-sans selection:bg-indigo-100">
    <Nav 
      class="z-50 bg-white/80 backdrop-blur-md border-b border-gray-100"
      :profile="{ name: user.name, avatar: user.avatar }" 
    />

    <div class="flex flex-1 overflow-hidden relative">
      <sideBar class="z-40 border-r border-gray-100 bg-white" />

      <main class="flex-1 overflow-y-auto scroll-smooth custom-scrollbar bg-dots">
        <div class="max-w-5xl mx-auto px-6 py-10">
          
          <section class="relative mb-12">
            <div class="h-48 md:h-64 w-full rounded-t-3xl overflow-hidden relative group">
              <img :src="user.banner"
                class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div class="absolute inset-0 bg-gradient-to-b from-transparent to-black/20"></div>

              <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col items-center justify-center text-white">
                <label class="cursor-pointer flex flex-col items-center gap-2">
                  <i class="fas fa-camera text-xl"></i>
                  <span class="text-xs font-bold uppercase tracking-widest">Change Banner</span>
                  <span class="text-[10px] text-gray-300">Recommended: 1400 x 600 px</span>
                  <input type="file" accept="image/*" class="hidden" @change="handleBannerUpload" />
                </label>
              </div>
            </div>

            <div class="bg-white rounded-b-3xl border-x border-b border-gray-100 p-8 shadow-sm relative">
              <div class="flex flex-col md:flex-row items-end md:items-center gap-6 -mt-20 md:-mt-24">
                <div class="relative group">
                  <div class="h-32 w-32 md:h-40 md:w-40 rounded-3xl border-4 border-white overflow-hidden shadow-xl bg-white">
                    <img :src="user.avatar" class="w-full h-full object-cover" />
                    
                    <div class="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col items-center justify-center text-white rounded-3xl">
                      <label class="cursor-pointer flex flex-col items-center gap-1">
                        <i class="fas fa-pen text-lg"></i>
                        <span class="text-[10px] font-bold uppercase">Edit</span>
                        <input type="file" accept="image/*" class="hidden" @change="handleAvatarUpload" />
                      </label>
                    </div>
                  </div>
                  <div class="absolute bottom-2 right-2 h-4 w-4 bg-green-500 border-2 border-white rounded-full"></div>
                </div>

                <div class="flex-1 pt-4 md:pt-16">
                  <h1 class="text-3xl font-extrabold text-gray-900">{{ user.name }}</h1>
                  <p class="text-blue-600 font-medium">{{ user.headline }}</p>
                  <div class="flex items-center gap-4 mt-2 text-gray-500 text-sm">
                    <span><i class="fas fa-map-marker-alt mr-2 text-gray-400"></i>{{ user.location }}</span>
                    <span><i class="fas fa-link mr-2 text-gray-400"></i>{{ user.website }}</span>
                  </div>
                </div>

                <div class="md:pt-16 flex gap-3">
                   <button class="px-5 py-2.5 rounded-xl bg-gray-50 text-gray-700 font-bold text-xs hover:bg-gray-100 border border-gray-200 transition-all flex items-center gap-2">
                    <i class="fas fa-eye"></i> Live Preview
                  </button>
                  <button @click="saveAll" class="px-6 py-2.5 rounded-xl bg-indigo-600 text-white font-bold text-xs uppercase tracking-widest hover:bg-indigo-700 shadow-xl shadow-indigo-100 transition-all">
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </section>

          <section class="mb-10 bg-white p-6 rounded-[2.5rem] border border-gray-100 shadow-sm">
            <h2 class="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4 px-2">Data Categories</h2>
            <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
              <button 
                v-for="cat in categories" 
                :key="cat.id"
                @click="activeCategory = cat.id"
                :class="[
                  'flex flex-col items-center gap-2 p-4 rounded-3xl border-2 transition-all',
                  activeCategory === cat.id ? 'border-indigo-600 bg-indigo-50/30' : 'border-gray-50 bg-gray-50/50 hover:border-indigo-100'
                ]"
              >
                <i :class="['fas', cat.icon, activeCategory === cat.id ? 'text-indigo-600' : 'text-gray-400']"></i>
                <span class="text-[10px] font-black uppercase tracking-tight" :class="activeCategory === cat.id ? 'text-indigo-900' : 'text-gray-500'">{{ cat.title }}</span>
              </button>
            </div>
          </section>

          <div v-if="activeCategory" class="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-xl relative min-h-[400px]">
            <div class="flex items-center justify-between mb-8">
               <div class="flex items-center gap-4">
                  <div :class="['h-12 w-12 rounded-2xl flex items-center justify-center text-white', currentCategory.color]">
                    <i :class="['fas', currentCategory.icon]"></i>
                  </div>
                  <h3 class="text-xl font-black text-gray-800">{{ currentCategory.title }}</h3>
               </div>
               <button v-if="['experience', 'education'].includes(activeCategory)" @click="addItem(activeCategory)" class="text-xs font-black text-indigo-600 uppercase tracking-widest">+ Add New</button>
            </div>

            <div v-if="activeCategory === 'experience'" class="space-y-6">
              <div v-for="(exp, idx) in user.experience" :key="idx" class="p-6 rounded-3xl bg-gray-50 border border-gray-100 relative">
                <button @click="removeItem('experience', idx)" class="absolute top-4 right-4 text-gray-300 hover:text-red-500"><i class="fas fa-trash"></i></button>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input v-model="exp.role" placeholder="Role" class="edit-input" />
                  <input v-model="exp.company" placeholder="Company" class="edit-input" />
                  <textarea v-model="exp.desc" placeholder="Responsibilities..." class="edit-input md:col-span-2 h-24"></textarea>
                </div>
              </div>
            </div>

            <div v-if="activeCategory === 'education'" class="space-y-6">
              <div v-for="(edu, idx) in user.education" :key="idx" class="p-6 rounded-3xl bg-gray-50 border border-gray-100 relative">
                <button @click="removeItem('education', idx)" class="absolute top-4 right-4 text-gray-300 hover:text-red-500"><i class="fas fa-trash"></i></button>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input v-model="edu.degree" placeholder="Degree" class="edit-input" />
                  <input v-model="edu.period" placeholder="Period" class="edit-input" />
                  <input v-model="edu.school" placeholder="School/University" class="edit-input md:col-span-2" />
                </div>
              </div>
            </div>

            <div v-if="activeCategory === 'skills'" class="space-y-6">
               <div class="flex flex-wrap gap-2 mb-4">
                  <span v-for="(skill, i) in user.skills" :key="i" class="px-4 py-2 bg-indigo-50 text-indigo-600 rounded-xl font-bold text-xs flex items-center gap-2">
                    {{ skill }} <i @click="user.skills.splice(i, 1)" class="fas fa-times cursor-pointer"></i>
                  </span>
               </div>
               <div class="flex gap-2">
                 <input v-model="newSkill" @keyup.enter="addSkill" placeholder="Add skill..." class="edit-input" />
                 <button @click="addSkill" class="px-6 bg-gray-900 text-white rounded-2xl font-bold text-xs">ADD</button>
               </div>
            </div>

            <div v-if="['projects', 'lifestyle', 'domain'].includes(activeCategory)" class="py-20 text-center opacity-30">
               <i class="fas fa-hard-hat text-4xl mb-4"></i>
               <p class="font-black uppercase text-xs tracking-widest">More sections coming soon</p>
            </div>
          </div>

        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import Nav from '~/components/nav.vue'

const activeCategory = ref('experience')
const newSkill = ref('')

const user = reactive({
  name: 'Sudipta Ghosh',
  headline: 'Founder @ Ignis IT | Software Architect',
  location: 'West Bengal, India',
  website: 'ignis-it.com',
  avatar: '/porichoy.favicon.png',
  banner: 'https://images.unsplash.com/photo-1614850523296-d8c1af93d400?w=1400',
  education: [{ degree: 'B.Tech CS', school: 'University Name', period: '2021-2025' }],
  experience: [{ role: 'Founder & CEO', company: 'Ignis IT', desc: 'Leading technical vision.' }],
  skills: ['Vue.js', 'Go', 'Tailwind']
})

const categories = [
  { id: 'experience', title: 'Work', icon: 'fa-solid fa-briefcase', color: 'bg-blue-600' },
  { id: 'education', title: 'Education', icon: 'fa-graduation-cap', color: 'bg-purple-600' },
  { id: 'skills', title: 'Expertise', icon: 'fa-bolt', color: 'bg-amber-500' },
  { id: 'projects', title: 'Projects', icon: 'fa-project-diagram', color: 'bg-emerald-500' },
  { id: 'lifestyle', title: 'Lifestyle', icon: 'fa-heart', color: 'bg-rose-500' },
  { id: 'domain', title: 'Domain', icon: 'fa-globe', color: 'bg-slate-800' },
]

const currentCategory = computed(() => categories.find(c => c.id === activeCategory.value))

const handleBannerUpload = (e) => {
  const file = e.target.files[0]
  if (file) user.banner = URL.createObjectURL(file)
}

const handleAvatarUpload = (e) => {
  const file = e.target.files[0]
  if (file) user.avatar = URL.createObjectURL(file)
}

const addItem = (type) => {
  if (type === 'education') user.education.push({ degree: '', school: '', period: '' })
  if (type === 'experience') user.experience.push({ role: '', company: '', desc: '' })
}

const removeItem = (type, idx) => user[type].splice(idx, 1)

const addSkill = () => {
  if (newSkill.value) {
    user.skills.push(newSkill.value)
    newSkill.value = ''
  }
}

const saveAll = () => console.log('Data Saved:', user)

useSeoMeta({
  title: `Edit Page`,
  description:
    'The new standard for professional identities is launching soon.'
})
useHead({
    link: [
        {
            rel: 'icon',
            type: 'image/png',
            href: '/porichoy.favicon.png'
        }
      ]
})
</script>

<style scoped>
.edit-input {
  @apply w-full px-5 py-4 rounded-2xl border border-gray-100 bg-white outline-none font-bold text-gray-700 text-sm focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/5 transition-all;
}

.bg-dots {
  background-image: radial-gradient(#e5e7eb 1px, transparent 1px);
  background-size: 40px 40px;
}

.custom-scrollbar::-webkit-scrollbar { width: 5px; }
.custom-scrollbar::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
</style>