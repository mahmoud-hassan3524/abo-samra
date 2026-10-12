<script setup>
import { Flame, Clock, Award, ShieldCheck, HeartHandshake, Sparkles } from 'lucide-vue-next'

const features = [
  {
    icon: Flame,
    title: 'تتبيلة سورية شامية أصيلة',
    description: 'خلطة سرية متوارثة تمنح لحوم ودجاج الشاورما نكهة لا تُنسى على السيخ المشتعل.'
  },
  {
    icon: Clock,
    title: 'توصيل فائق السرعة والسخونة',
    description: 'أسطول دليفري سريع يغطي اللبيني، الهرم، فيصل، والمناطق المجاورة في أسرع وقت ممكن.'
  },
  {
    icon: ShieldCheck,
    title: 'أعلى معايير النظافة والجودة',
    description: 'نلتزم بأدق معايير السلامة الغذائية والنظافة الفائقة في كل مرحلة من مراحل التحضير.'
  },
  {
    icon: Award,
    title: 'مكونات طازجة 100% يومياً',
    description: 'دجاج مبرد طازج، خضروات منتقاة بعناية، وأجبان طبيعية فاخرة بدون أي مواد حافظة.'
  }
]
</script>

<template>
  <section class="py-8 sm:py-12 border-y border-slate-200/60 dark:border-dark-border/60 bg-white/50 dark:bg-dark-card/50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <div class="text-center max-w-xl mx-auto mb-6 sm:mb-8">
        <span class="text-xs font-black text-brand-600 dark:text-brand-400 uppercase tracking-wider block mb-2">
          لماذا تختار مطعم أبو سمرة؟
        </span>
        <h2 class="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
          سر حب أهالي الهرم والجيزة لأكلنا
        </h2>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div 
          v-for="(f, i) in features" 
          :key="i"
          class="p-6 rounded-2xl bg-white dark:bg-dark-surface border border-slate-200/80 dark:border-dark-border shadow-sm hover:shadow-md transition text-right space-y-3 group"
        >
          <div class="w-12 h-12 rounded-xl bg-orange-100 dark:bg-brand-950/70 text-brand-600 dark:text-brand-400 flex items-center justify-center group-hover:scale-110 group-hover:bg-brand-600 group-hover:text-white transition duration-300">
            <component :is="f.icon" class="w-6 h-6" />
          </div>

          <h3 class="text-base font-black text-slate-900 dark:text-white">
            {{ f.title }}
          </h3>

          <p class="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
            {{ f.description }}
          </p>
        </div>
      </div>

    </div>
  </section>
</template>
