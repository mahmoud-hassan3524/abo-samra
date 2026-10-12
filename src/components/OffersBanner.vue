<script setup>
import { Sparkles, Flame, Plus, Check } from 'lucide-vue-next'
import { menuItems } from '../data/menuData'
import { useCart } from '../composables/useCart'

const { addToCart } = useCart()

const offers = menuItems.filter(item => item.category === 'offers')

const handleAddOffer = (offer) => {
  addToCart(offer, { quantity: 1, extraCheese: false })
}
</script>

<template>
  <section id="offers" class="py-6 sm:py-8 bg-gradient-to-b from-transparent to-orange-50/50 dark:to-dark-surface/30">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <!-- Section Header -->
      <div class="flex flex-col md:flex-row items-start md:items-end justify-between mb-5 sm:mb-6 gap-3">
        <div class="text-right">
          <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-red-100 dark:bg-red-950/60 text-red-600 dark:text-red-400 text-xs font-black mb-2">
            <Flame class="w-3.5 h-3.5 animate-pulse" />
            <span>عروض التوفير لفترة محدودة</span>
          </div>
          <h2 class="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
            عروض <span class="text-brand-600">أبو سمرة</span> الحصرية
          </h2>
          <p class="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            أقوى ميكسات الشاورما والمشويات بأوفر سعر في مصر
          </p>
        </div>
      </div>

      <!-- Offers Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div 
          v-for="offer in offers"
          :key="offer.id"
          class="group relative rounded-2xl bg-white dark:bg-dark-card border border-orange-200/60 dark:border-dark-border p-4 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden"
        >
          <!-- Special Badge -->
          <div class="absolute top-3 left-3 z-10">
            <span class="px-2.5 py-1 text-[11px] font-black rounded-lg bg-gradient-to-r from-red-600 to-brand-600 text-white shadow-md">
              {{ offer.badge }}
            </span>
          </div>

          <div>
            <!-- Offer Image -->
            <div class="relative h-44 rounded-xl overflow-hidden mb-3.5">
              <img 
                :src="offer.image" 
                :alt="offer.name" 
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              
              <!-- Savings Badge -->
              <div 
                v-if="offer.originalPrice"
                class="absolute bottom-2.5 right-2.5 bg-black/70 backdrop-blur-sm text-emerald-400 px-2 py-0.5 rounded-md text-[11px] font-bold"
              >
                وفر {{ offer.originalPrice - offer.price }} ج.م
              </div>
            </div>

            <!-- Content -->
            <h3 class="text-base font-black text-slate-900 dark:text-white group-hover:text-brand-600 transition">
              {{ offer.name }}
            </h3>
            <p class="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mt-1 leading-relaxed">
              {{ offer.description }}
            </p>
          </div>

          <!-- Price & Add Button -->
          <div class="pt-4 mt-3 border-t border-slate-100 dark:border-dark-border flex items-center justify-between">
            <div class="text-right">
              <div class="flex items-baseline gap-1.5">
                <span class="text-xl font-black text-brand-600 dark:text-brand-500">
                  {{ offer.price }}
                </span>
                <span class="text-xs font-bold text-slate-500">ج.م</span>
                
                <span 
                  v-if="offer.originalPrice" 
                  class="text-xs text-slate-400 line-through mr-1"
                >
                  {{ offer.originalPrice }}
                </span>
              </div>
            </div>

            <button
              @click="handleAddOffer(offer)"
              class="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-brand-600 hover:bg-brand-700 active:scale-95 text-white font-bold text-xs shadow-md shadow-brand-500/20 transition"
              title="أضف العرض إلى السلة"
            >
              <Plus class="w-3.5 h-3.5" />
              <span>أضف للسلة</span>
            </button>
          </div>

        </div>
      </div>

    </div>
  </section>
</template>
