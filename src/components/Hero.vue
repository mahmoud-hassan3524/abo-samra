<script setup>
import { 
  Flame, 
  Utensils, 
  Sparkles, 
  PhoneCall, 
  Clock, 
  Star, 
  ShieldCheck, 
  ArrowLeft,
  ChevronDown,
  Award
} from 'lucide-vue-next'
import { restaurantInfo } from '../data/restaurantInfo'

const scrollToSection = (id) => {
  const el = document.querySelector(id)
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}
</script>

<template>
  <section id="hero" class="relative pt-32 sm:pt-36 lg:pt-40 xl:pt-44 pb-8 sm:pb-12 overflow-hidden">
    <!-- Ambient Culinary Background Glows -->
    <div class="absolute top-1/4 -right-28 w-96 h-96 bg-brand-500/15 rounded-full blur-3xl pointer-events-none"></div>
    <div class="absolute bottom-10 -left-28 w-96 h-96 bg-amber-500/15 rounded-full blur-3xl pointer-events-none"></div>
    <div class="absolute inset-0 bg-[radial-gradient(#ea580c_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.03] dark:opacity-[0.05] pointer-events-none"></div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        
        <!-- Right Column: Hero Content & CTAs -->
        <div class="lg:col-span-7 text-right space-y-6">
          
          <!-- Brand Pill Badge -->
          <div class="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-gradient-to-l from-orange-100/90 to-brand-50/80 dark:from-brand-950/80 dark:to-dark-surface border border-brand-200/80 dark:border-brand-800/60 shadow-sm">
            <span class="flex h-2 w-2 relative">
              <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75"></span>
              <span class="relative inline-flex rounded-full h-2 w-2 bg-brand-600"></span>
            </span>
            <span class="text-xs font-black text-brand-700 dark:text-brand-300">
              نكهة الشام الأصيلة في قلب الهرم واللبيني
            </span>
            <Sparkles class="w-3.5 h-3.5 text-amber-500" />
          </div>

          <!-- ================= Redesigned Premium Headline ================= -->
          <div class="space-y-2 pt-1 pb-1 overflow-visible">
            <h1 class="text-2xl sm:text-3xl md:text-4xl lg:text-[40px] font-black text-slate-900 dark:text-white leading-[1.38] overflow-visible">
              <!-- Part 1: سر الشاورما السورية with artistic highlight -->
              <span class="block">
                سر 
                <span class="relative inline-block text-brand-600 dark:text-brand-500 px-1 font-black">
                  الشاورما السورية
                  <!-- Subtle organic underline stroke -->
                  <svg 
                    class="absolute -bottom-1.5 right-0 w-full h-3 text-brand-500/35 dark:text-brand-400/40" 
                    viewBox="0 0 140 12" 
                    fill="none" 
                    preserveAspectRatio="none"
                  >
                    <path d="M2 9C45 3 95 3 138 8" stroke="currentColor" stroke-width="4.5" stroke-linecap="round"/>
                  </svg>
                </span>
              </span>

              <!-- Part 2: والمشويات على الفحم with badge -->
              <span class="inline-flex items-center gap-2.5 mt-2 flex-wrap text-slate-800 dark:text-slate-100">
                <span>والمشويات على الفحم</span>
                <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-orange-100/90 dark:bg-brand-950/80 text-brand-700 dark:text-brand-300 border border-brand-200 dark:border-brand-800/60 text-xs font-black shadow-sm align-middle">
                  <Flame class="w-3.5 h-3.5 text-brand-600 fill-brand-600 animate-pulse" />
                  <span>طازج على السيخ</span>
                </span>
              </span>
            </h1>
          </div>

          <!-- Subtitle -->
          <p class="text-xs sm:text-sm md:text-base text-slate-600 dark:text-slate-300 leading-relaxed max-w-xl font-medium">
            تذوق أشهى شاورما سوري طازجة، بوكسات عائلية ملكية، وفتات شاورما غرقانة بالجبنة وصوص الثومية الخاص. نعتني بأدق تفاصيل الطعم والنظافة لتصلك ساخنة وطازجة في أسرع وقت.
          </p>

          <!-- Key Highlights Badges -->
          <div class="flex flex-wrap items-center gap-3 pt-1">
            <div class="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-dark-surface border border-slate-200 dark:border-dark-border text-xs font-bold text-slate-700 dark:text-slate-200 shadow-sm">
              <Flame class="w-4 h-4 text-brand-600" />
              <span>دجاج طازج يومياً</span>
            </div>
            <div class="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-dark-surface border border-slate-200 dark:border-dark-border text-xs font-bold text-slate-700 dark:text-slate-200 shadow-sm">
              <Clock class="w-4 h-4 text-amber-500" />
              <span>توصيل سريع وساخن</span>
            </div>
            <div class="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-dark-surface border border-slate-200 dark:border-dark-border text-xs font-bold text-slate-700 dark:text-slate-200 shadow-sm">
              <ShieldCheck class="w-4 h-4 text-emerald-500" />
              <span>أعلى معايير النظافة</span>
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-3">
            <button
              @click="scrollToSection('#menu')"
              class="flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-2xl bg-gradient-to-r from-brand-600 to-orange-500 hover:from-brand-700 hover:to-orange-600 text-white font-extrabold text-sm sm:text-base shadow-lg shadow-brand-500/30 hover:shadow-glow-lg transition duration-200 active:scale-95 group"
            >
              <Utensils class="w-4 h-4 group-hover:rotate-12 transition-transform" />
              <span>تصفح قائمة الطعام</span>
              <ArrowLeft class="w-4 h-4 mr-1 group-hover:-translate-x-1 transition-transform" />
            </button>

            <a
              :href="restaurantInfo.phones.whatsappLink"
              target="_blank"
              class="flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm sm:text-base shadow-md shadow-emerald-600/20 transition active:scale-95"
            >
              <span class="w-2.5 h-2.5 rounded-full bg-emerald-300 animate-pulse"></span>
              <span>طلب مباشر واتساب</span>
            </a>

            <a
              :href="`tel:${restaurantInfo.phones.orders}`"
              class="flex items-center justify-center gap-2 px-5 py-3.5 rounded-2xl bg-white dark:bg-dark-card border-2 border-brand-500/40 text-slate-800 dark:text-slate-100 font-bold text-sm sm:text-base hover:bg-brand-50 dark:hover:bg-dark-surface transition"
            >
              <PhoneCall class="w-4 h-4 text-brand-600" />
              <span>اتصل بنا</span>
            </a>
          </div>

          <!-- Live Trust Signals -->
          <div class="pt-5 border-t border-slate-200/80 dark:border-dark-border/60 flex items-center gap-6">
            <div class="flex items-center gap-3">
              <div class="flex -space-x-2 space-x-reverse">
                <img class="w-9 h-9 rounded-full border-2 border-white dark:border-dark-bg object-cover" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80" alt="زبون" />
                <img class="w-9 h-9 rounded-full border-2 border-white dark:border-dark-bg object-cover" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80" alt="زبون" />
                <img class="w-9 h-9 rounded-full border-2 border-white dark:border-dark-bg object-cover" src="https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80" alt="زبون" />
              </div>
              <div>
                <div class="flex items-center gap-1 text-amber-500">
                  <Star v-for="i in 5" :key="i" class="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span class="text-xs font-bold text-slate-800 dark:text-slate-200 mr-1 font-outfit">4.9 / 5</span>
                </div>
                <p class="text-xs text-slate-500 dark:text-slate-400 font-medium">أكثر من 15,000+ وجبة تم تقديمها بحب</p>
              </div>
            </div>
          </div>

        </div>

        <!-- Left Column: Visual Showcase Card -->
        <div class="lg:col-span-5 relative">
          
          <!-- Glow Behind Card -->
          <div class="absolute inset-0 bg-gradient-to-tr from-brand-600/30 to-amber-500/20 rounded-3xl filter blur-2xl transform -rotate-3 scale-95"></div>

          <!-- Showcase Frame -->
          <div class="relative rounded-3xl overflow-hidden bg-white dark:bg-dark-card border border-white/60 dark:border-dark-border shadow-2xl p-3 sm:p-4">
            
            <!-- Main Hero Image -->
            <div class="relative h-72 sm:h-96 rounded-2xl overflow-hidden group">
              <img 
                src="https://images.unsplash.com/photo-1561651823-34feb02250e4?w=900&auto=format&fit=crop&q=85" 
                alt="شاورما سوري فاخرة مطعم أبو سمرة" 
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

              <!-- Top Left Badge: Brand Signature -->
              <div class="absolute top-3 left-3 flex items-center gap-2 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/20 text-white text-xs font-bold">
                <img src="/images/logo-cropped.png" alt="لوجو" class="w-5 h-5 rounded-md object-contain" />
                <span>أبو سمرة سبيشيال</span>
              </div>

              <!-- Top Right Badge: Discount Offer -->
              <div class="absolute top-3 right-3 bg-brand-600 text-white font-extrabold text-xs px-3 py-1.5 rounded-xl shadow-lg shadow-brand-600/40 animate-pulse">
                خصم حتى 25% على العروض
              </div>

              <!-- Bottom Content Overlay -->
              <div class="absolute bottom-4 right-4 left-4 text-right text-white">
                <span class="text-xs text-amber-400 font-bold uppercase tracking-wider block mb-1">
                  طبق اليوم المميز
                </span>
                <h3 class="text-xl sm:text-2xl font-black">
                  صينية شاورما عربي عائلي بالجبنة
                </h3>
                <p class="text-xs text-slate-200 mt-1 line-clamp-2">
                  شاورما دجاج مقطعة عربي مع بطاطس فارم فريتس، تومية كريمية، وجبنة موتزاريلا سايحة.
                </p>
              </div>
            </div>

            <!-- Floating Micro Cards -->
            <div class="grid grid-cols-2 gap-3 mt-3">
              <div class="p-3 rounded-xl bg-orange-50/70 dark:bg-dark-surface border border-orange-200/50 dark:border-dark-border flex items-center gap-3">
                <div class="w-10 h-10 rounded-lg bg-brand-500 text-white flex items-center justify-center font-black text-sm shrink-0 shadow-md font-outfit">
                  70<span class="text-[9px] mr-0.5">ج.م</span>
                </div>
                <div class="text-right">
                  <span class="block text-xs font-bold text-slate-800 dark:text-slate-100">سندوتش شاورما</span>
                  <span class="text-[11px] text-slate-500 dark:text-slate-400">يبدأ من 70 جنيه</span>
                </div>
              </div>

              <div class="p-3 rounded-xl bg-amber-50/70 dark:bg-dark-surface border border-amber-200/50 dark:border-dark-border flex items-center gap-3">
                <div class="w-10 h-10 rounded-lg bg-amber-500 text-white flex items-center justify-center font-black text-sm shrink-0 shadow-md font-outfit">
                  15<span class="text-[9px] mr-0.5">ج</span>
                </div>
                <div class="text-right">
                  <span class="block text-xs font-bold text-slate-800 dark:text-slate-100">إضافة الجبنة</span>
                  <span class="text-[11px] text-slate-500 dark:text-slate-400">موتزاريلا بـ 15ج فقط</span>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  </section>
</template>
