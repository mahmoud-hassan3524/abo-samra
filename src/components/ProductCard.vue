<script setup>
import { ref, computed } from 'vue'
import { Plus, SlidersHorizontal, Star, Check } from 'lucide-vue-next'
import { useCart } from '../composables/useCart'
import { useRatings } from '../composables/useRatings'

const props = defineProps({
  product: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['openModal'])

const { addToCart } = useCart()
const { getProductRatingStats, rateProduct, getFeedbackMessage } = useRatings()

const hoveredStar = ref(0)
const isStarAnimating = ref(false)

// Dynamic rating stats from composable
const ratingStats = computed(() => {
  return getProductRatingStats(props.product.id)
})

const feedbackMessage = computed(() => {
  return getFeedbackMessage(props.product.id)
})

const handleStarClick = (star, e) => {
  e.stopPropagation()
  isStarAnimating.value = true
  rateProduct(props.product.id, star)
  setTimeout(() => {
    isStarAnimating.value = false
  }, 400)
}

const handleQuickAdd = (e) => {
  e.stopPropagation()
  addToCart(props.product, { quantity: 1, extraCheese: false, spiceLevel: 'normal' })
}
</script>

<template>
  <div 
    @click="emit('openModal', product)"
    class="group cursor-pointer rounded-2xl sm:rounded-3xl bg-white dark:bg-dark-card border border-slate-200/90 dark:border-dark-border hover:border-brand-500/60 dark:hover:border-brand-500/60 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden relative"
  >
    <div>
      <!-- Product Image with Badge -->
      <div class="relative h-44 sm:h-52 overflow-hidden bg-slate-100 dark:bg-dark-surface">
        <img 
          :src="product.image" 
          :alt="product.name" 
          loading="lazy"
          class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div class="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        <!-- Category/Feature Badge -->
        <div 
          v-if="product.badge"
          class="absolute top-2.5 right-2.5 z-10"
        >
          <span class="px-2.5 py-1 text-[11px] font-black rounded-xl bg-brand-600 text-white shadow-md shadow-brand-600/30">
            {{ product.badge }}
          </span>
        </div>

        <!-- Prep Time Indicator -->
        <div 
          v-if="product.prepTime"
          class="absolute bottom-2.5 right-2.5 bg-black/60 backdrop-blur-sm text-slate-200 text-[10px] px-2.5 py-0.5 rounded-lg font-medium"
        >
          {{ product.prepTime }}
        </div>
      </div>

      <!-- Card Text Content -->
      <div class="p-3.5 sm:p-4 text-right">
        
        <!-- Dish Title & English Name -->
        <div class="mb-1">
          <h3 class="text-base sm:text-lg font-black text-slate-900 dark:text-white group-hover:text-brand-600 transition duration-200">
            {{ product.name }}
          </h3>
          <p class="text-[11px] text-slate-400 dark:text-slate-500 font-medium line-clamp-1">
            {{ product.nameEn }}
          </p>
        </div>

        <!-- Dish Description -->
        <p class="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed mt-1">
          {{ product.description }}
        </p>

        <!-- ================= Streamlined Zero-Friction Inline Rating ================= -->
        <div 
          class="mt-3 pt-2.5 border-t border-slate-100 dark:border-dark-border/50 flex items-center justify-between gap-2"
          @click.stop
        >
          <!-- Stars Row -->
          <div 
            class="flex items-center gap-1"
            @mouseleave="hoveredStar = 0"
          >
            <button
              v-for="star in 5"
              :key="star"
              type="button"
              @mouseenter="hoveredStar = star"
              @click="handleStarClick(star, $event)"
              class="p-0.5 focus:outline-none transition-transform duration-150 hover:scale-125 active:scale-95"
              :title="`تقييم ${star} نجوم`"
            >
              <Star 
                :class="[
                  'w-4 h-4 transition-colors duration-150',
                  (hoveredStar ? star <= hoveredStar : star <= Math.round(ratingStats.score))
                    ? 'text-amber-400 fill-amber-400 filter drop-shadow-[0_1px_2px_rgba(245,158,11,0.3)]'
                    : 'text-slate-200 dark:text-slate-700'
                ]" 
              />
            </button>

            <!-- Score and Review Count Display -->
            <span class="text-xs font-black text-slate-700 dark:text-slate-300 mr-1.5 flex items-center gap-1">
              <span>{{ ratingStats.score }}</span>
              <span class="text-[10px] text-slate-400 font-normal">({{ ratingStats.count }})</span>
            </span>
          </div>

          <!-- Instant Feedback Message / Rated State -->
          <transition 
            enter-active-class="transition duration-200 ease-out"
            enter-from-class="opacity-0 translate-y-1 scale-95"
            enter-to-class="opacity-100 translate-y-0 scale-100"
            leave-active-class="transition duration-150 ease-in"
            leave-from-class="opacity-100 scale-100"
            leave-to-class="opacity-0 scale-95"
          >
            <span 
              v-if="feedbackMessage"
              class="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/70 border border-emerald-200 dark:border-emerald-800/40 px-2 py-0.5 rounded-full shadow-sm animate-pulse"
            >
              <Check class="w-2.5 h-2.5 stroke-[3]" />
              {{ feedbackMessage }}
            </span>
            <span 
              v-else-if="ratingStats.hasUserRated"
              class="text-[10px] font-bold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 px-1.5 py-0.5 rounded-md"
            >
              قيّمت بـ {{ ratingStats.userScore }}★
            </span>
          </transition>
        </div>

      </div>
    </div>

    <!-- Card Bottom: Price and Actions -->
    <div class="p-3.5 sm:p-4 pt-0 mt-1 flex items-center justify-between border-t border-slate-100 dark:border-dark-border/60">
      
      <!-- Price Display -->
      <div class="text-right pt-2.5">
        <div class="flex items-baseline gap-1">
          <span class="text-lg sm:text-xl font-black text-brand-600 dark:text-brand-500 font-outfit">
            {{ product.price }}
          </span>
          <span class="text-xs font-bold text-slate-500">ج.م</span>
        </div>
        <span 
          v-if="product.hasCheeseOption"
          class="text-[10px] text-amber-600 dark:text-amber-400 block font-bold"
        >
          متاح إضافة جبنة (+15ج)
        </span>
      </div>

      <!-- Action Buttons with touch-friendly sizes -->
      <div class="flex items-center gap-2 pt-2.5">
        <button
          @click="emit('openModal', product)"
          class="p-2.5 rounded-xl border border-slate-200 dark:border-dark-border text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-dark-surface hover:text-brand-600 transition duration-150 active:scale-95"
          title="تخصيص الوجبة (إضافة جبنة وملاحظات)"
        >
          <SlidersHorizontal class="w-4 h-4" />
        </button>

        <button
          @click="handleQuickAdd"
          class="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 active:scale-95 text-white font-black text-xs shadow-md shadow-brand-500/25 transition duration-150"
          title="إضافة سريعة للسلة"
        >
          <Plus class="w-4 h-4 stroke-[2.5]" />
          <span>أضف</span>
        </button>
      </div>

    </div>

  </div>
</template>
