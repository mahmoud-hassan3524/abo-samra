<script setup>
import { PackageOpen, Sparkles, Plus, Flame, Check } from 'lucide-vue-next'
import { menuItems } from '../data/menuData'
import { useCart } from '../composables/useCart'

const { addToCart } = useCart()

const boxes = menuItems.filter(item => item.category === 'boxes')

const handleAddBox = (box) => {
  addToCart(box, { quantity: 1, extraCheese: false })
}
</script>

<template>
  <section id="boxes" class="py-8 sm:py-12 relative">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <!-- Section Header -->
      <div class="text-center max-w-2xl mx-auto mb-6 sm:mb-8">
        <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 text-xs font-black mb-3">
          <PackageOpen class="w-3.5 h-3.5" />
          <span>بوكسات التوفير والقوة</span>
        </div>
        <h2 class="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
          بوكسات <span class="text-brand-600">أبو سمرة</span> الأسطورية
        </h2>
        <p class="text-sm text-slate-500 dark:text-slate-400 mt-2 font-medium">
          ميكسات تجمع الشاورما السورية بالكرسبي والمشويات في بوكس واحد يشبع كل الحبايب
        </p>
      </div>

      <!-- Boxes Showcase Grid -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
        <div 
          v-for="(box, idx) in boxes" 
          :key="box.id"
          class="relative rounded-3xl bg-white dark:bg-dark-card border border-slate-200/80 dark:border-dark-border p-6 shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col justify-between overflow-hidden group hover:-translate-y-1"
        >
          <!-- Accent Corner Gradient -->
          <div class="absolute -top-12 -left-12 w-28 h-28 bg-gradient-to-br from-brand-500/20 to-amber-500/10 rounded-full blur-xl pointer-events-none"></div>

          <div>
            <!-- Box Image -->
            <div class="relative h-52 rounded-2xl overflow-hidden mb-5">
              <img 
                :src="box.image" 
                :alt="box.name" 
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
              
              <!-- Badge -->
              <div class="absolute top-3 right-3 z-10">
                <span class="px-3 py-1 rounded-xl bg-brand-600 text-white font-extrabold text-xs shadow-md">
                  {{ box.badge }}
                </span>
              </div>

              <div class="absolute bottom-3 right-3 text-right text-white">
                <span class="text-[11px] text-amber-300 font-bold block">جاهز للطلب</span>
                <span class="text-xs text-slate-200">{{ box.prepTime }}</span>
              </div>
            </div>

            <!-- Title & Description -->
            <div class="text-right space-y-2">
              <h3 class="text-xl font-black text-slate-900 dark:text-white group-hover:text-brand-600 transition">
                {{ box.name }}
              </h3>
              <p class="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                {{ box.description }}
              </p>
            </div>
          </div>

          <!-- Bottom Action -->
          <div class="pt-6 mt-4 border-t border-slate-100 dark:border-dark-border flex items-center justify-between">
            <div class="text-right">
              <span class="text-xs text-slate-400 block font-medium">السعر شامل الضريبة</span>
              <div class="flex items-baseline gap-1">
                <span class="text-2xl font-black text-brand-600 dark:text-brand-400">{{ box.price }}</span>
                <span class="text-xs font-bold text-slate-500">ج.م</span>
              </div>
            </div>

            <button
              @click="handleAddBox(box)"
              class="flex items-center gap-2 px-5 py-3 rounded-xl bg-brand-600 hover:bg-brand-700 active:scale-95 text-white font-bold text-xs shadow-md shadow-brand-500/20 transition"
            >
              <Plus class="w-4 h-4" />
              <span>أضف البوكس</span>
            </button>
          </div>

        </div>
      </div>

    </div>
  </section>
</template>
