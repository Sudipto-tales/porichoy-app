<template>
  <div class="space-y-4">
    <p class="text-[10px] text-white/30 uppercase tracking-widest font-bold">Pre-built Resume Blocks</p>

    <button 
      v-for="section in sections" 
      :key="section.id"
      @click="store.addSectionBlock(section.id)"
      class="w-full text-left p-3 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.06] hover:border-white/[0.12] transition-all group"
    >
      <div class="flex items-center gap-3">
        <div :class="['h-10 w-10 rounded-xl flex items-center justify-center flex-shrink-0', section.bgClass]">
          <i :class="[section.icon, section.iconColor, 'text-sm']"></i>
        </div>
        <div class="flex-1 min-w-0">
          <p class="text-[12px] font-semibold text-white/70 group-hover:text-white transition-colors">{{ section.label }}</p>
          <p class="text-[10px] text-white/30 truncate">{{ section.desc }}</p>
        </div>
        <i class="fas fa-plus text-[10px] text-white/20 group-hover:text-blue-400 transition-colors"></i>
      </div>
    </button>

    <div class="border-t border-white/[0.06] pt-4 mt-4">
      <div class="p-3 rounded-xl bg-gradient-to-br from-purple-500/[0.08] to-blue-500/[0.08] border border-purple-500/10">
        <p class="text-[10px] font-bold text-purple-300/80 uppercase tracking-widest mb-1">Pro Tip</p>
        <p class="text-[11px] text-white/40 leading-relaxed">Sections are draggable groups. Rearrange them to match your preferred resume layout.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useResumeStore } from '~/composables/useResumeStore'
const store = useResumeStore()

const sections = [
  { id: 'header', label: 'Header Block', desc: 'Name, title, and contact info', icon: 'fas fa-id-badge', bgClass: 'bg-blue-500/15', iconColor: 'text-blue-400' },
  { id: 'experience', label: 'Experience', desc: 'Job role with bullet points', icon: 'fas fa-briefcase', bgClass: 'bg-emerald-500/15', iconColor: 'text-emerald-400' },
  { id: 'education', label: 'Education', desc: 'Degree and university details', icon: 'fas fa-graduation-cap', bgClass: 'bg-amber-500/15', iconColor: 'text-amber-400' },
  { id: 'skills', label: 'Skills', desc: 'Technical skills list', icon: 'fas fa-code', bgClass: 'bg-purple-500/15', iconColor: 'text-purple-400' },
  { id: 'projects', label: 'Projects', desc: 'Project name and description', icon: 'fas fa-rocket', bgClass: 'bg-rose-500/15', iconColor: 'text-rose-400' },
]
</script>
