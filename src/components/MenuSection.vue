<script setup>
import { ref, computed } from 'vue'
import { 
  Search, 
  Sparkles, 
  Filter, 
  Utensils, 
  Flame, 
  PackageOpen, 
  Sandwich, 
  Salad, 
  CookingPot, 
  Zap, 
  Beef, 
  Hop, 
  Soup, 
  X,
  ArrowLeft,
  ChevronLeft,
  BookOpen
} from 'lucide-vue-next'
import { categories, menuItems } from '../data/menuData'
import { useNavigation } from '../composables/useNavigation'
import ProductCard from './ProductCard.vue'
import ProductModal from './ProductModal.vue'

const { goToFullMenu } = useNavigation()

// Icons dictionary for category tabs
const iconMap = {
  Utensils,
  Sparkles,
  PackageOpen,
  Flame,
  Sandwich,
  Salad,
  CookingPot,
  Zap,
  Beef,
  Hop,
  Soup
}

const activeCategory = ref('all')
const searchQuery = ref('')
const filterOnlyPopular = ref(false)

const selectedProductForModal = ref(null)
const isModalOpen = ref(false)

const openProductModal = (product) => {
  selectedProductForModal.value = product
  isModalOpen.value = true
}

const closeProductModal = () => {
  isModalOpen.value = false
}

// All matching items
const filteredItems = computed(() => {
  return menuItems.filter(item => {
    // Category match
    const matchesCategory = activeCategory.value === 'all' || item.category === activeCategory.value

    // Search query match
    const q = searchQuery.value.trim().toLowerCase()
    const matchesSearch = !q || 
      item.name.toLowerCase().includes(q) || 
      (item.nameEn && item.nameEn.toLowerCase().includes(q)) ||
      (item.description && item.description.toLowerCase().includes(q))

    // Popular filter
    const matchesPopular = !filterOnlyPopular.value || item.popular

    return matchesCategory && matchesSearch && matchesPopular
  })
})

// Top 10 featured items for the home landing page
const TOP_ITEMS_LIMIT = 10
const displayedItems = computed(() => {
  return filteredItems.value.slice(0, TOP_ITEMS_LIMIT)
})

const resetFilters = () => {
  activeCategory.value = 'all'
  searchQuery.value = ''
  filterOnlyPopular.value = false
}
</script>

<template>
  <section id="menu" class="py-8 sm:py-12 relative">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <!-- Section Header with View All CTA -->
      <div class="flex flex-col md:flex-row items-center md:items-end justify-between gap-4 mb-6 sm:mb-8">
        
        <!-- Right: Title & Subtitle -->
        <div class="text-right max-w-2xl">
          <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-100 dark:bg-brand-950/60 text-brand-700 dark:text-brand-300 text-xs font-black mb-3">
            <Sparkles class="w-3.5 h-3.5 text-brand-600" />
            <span>مختارات الشيف • أفضل 10 أطباق</span>
          </div>
          
          <h2 class="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
            أشهى أكلات <span class="text-brand-600">أبو سمرة</span>
          </h2>
          
          <p class="text-sm sm:text-base text-slate-500 dark:text-slate-400 mt-2 font-medium">
            نقدم لكم تشكيلة مختارة من أكثر أطباقنا طلباً وشعبية. يمكنك استكشاف القائمة الكاملة بضغطة زر.
          </p>
        </div>

        <!-- Left: Stylish "View All" Button in Header -->
        <button
          @click="goToFullMenu(activeCategory)"
          class="shrink-0 flex items-center gap-2.5 px-5 py-3 rounded-2xl bg-gradient-to-r from-brand-600 to-orange-500 hover:from-brand-700 hover:to-orange-600 text-white font-extrabold text-xs sm:text-sm shadow-md shadow-brand-500/25 active:scale-95 transition group"
        >
          <BookOpen class="w-4 h-4" />
          <span>تصفح المنيو الكامل ({{ menuItems.length }} صنف)</span>
          <ArrowLeft class="w-4 h-4 mr-0.5 group-hover:-translate-x-1 transition-transform" />
        </button>

      </div>

      <!-- Search & Quick Filters Bar -->
      <div class="mb-6 space-y-3">
        <div class="flex flex-col md:flex-row items-center gap-3">
          
          <!-- Search Input -->
          <div class="relative w-full md:flex-1">
            <Search class="w-4 h-4 text-slate-400 absolute right-4 top-1/2 -translate-y-1/2" />
            <input 
              v-model="searchQuery"
              type="text" 
              placeholder="ابحث عن وجبة أو سندوتش (مثال: شاورما دجاج، فتة، كفتة، كريسبي)..."
              class="w-full pr-11 pl-10 py-3.5 rounded-2xl bg-white dark:bg-dark-card border border-slate-200 dark:border-dark-border text-slate-800 dark:text-slate-100 placeholder:text-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 shadow-sm transition"
            />
            <button 
              v-if="searchQuery"
              @click="searchQuery = ''"
              class="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              <X class="w-4 h-4" />
            </button>
          </div>

          <!-- Quick Toggle Popular Filter -->
          <div class="flex items-center gap-2 w-full md:w-auto">
            <button
              @click="filterOnlyPopular = !filterOnlyPopular"
              :class="[
                'flex items-center justify-center gap-2 px-5 py-3.5 rounded-2xl text-xs sm:text-sm font-bold border transition w-full md:w-auto shrink-0 shadow-sm',
                filterOnlyPopular 
                  ? 'bg-amber-500 text-white border-amber-500 shadow-amber-500/25' 
                  : 'bg-white dark:bg-dark-card border-slate-200 dark:border-dark-border text-slate-700 dark:text-slate-200 hover:border-amber-400'
              ]"
            >
              <Sparkles class="w-4 h-4" />
              <span>الأكثر طلباً فقط</span>
            </button>
          </div>

        </div>

        <!-- Category Scrollable Pills -->
        <div class="overflow-x-auto pb-2 scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0">
          <div class="flex items-center gap-2 min-w-max">
            <button
              v-for="cat in categories"
              :key="cat.id"
              @click="activeCategory = cat.id"
              :class="[
                'flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition duration-200 shrink-0 border',
                activeCategory === cat.id 
                  ? 'bg-brand-600 border-brand-600 text-white shadow-md shadow-brand-500/25' 
                  : 'bg-white dark:bg-dark-card border-slate-200/80 dark:border-dark-border text-slate-700 dark:text-slate-300 hover:border-brand-400 dark:hover:border-brand-500'
              ]"
            >
              <component :is="iconMap[cat.icon] || Utensils" class="w-4 h-4" />
              <span>{{ cat.name }}</span>
              <span 
                v-if="cat.hot"
                class="w-2 h-2 rounded-full bg-red-400 animate-ping"
              ></span>
            </button>
          </div>
        </div>

      </div>

      <!-- Results Stats & Active Filter Info -->
      <div class="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-6 px-1">
        <span>عرض <strong>أفضل {{ displayedItems.length }}</strong> أصناف (من أصل {{ filteredItems.length }} متاح)</span>
        <button 
          @click="goToFullMenu(activeCategory)"
          class="text-brand-600 dark:text-brand-400 hover:underline font-bold flex items-center gap-1"
        >
          <span>عرض كافة الـ {{ menuItems.length }} صنف في صفحة منفصلة</span>
          <ChevronLeft class="w-3.5 h-3.5" />
        </button>
      </div>

      <!-- Product Grid (Strictly Top 10 Items) -->
      <div 
        v-if="displayedItems.length > 0"
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6"
      >
        <ProductCard
          v-for="product in displayedItems"
          :key="product.id"
          :product="product"
          @openModal="openProductModal"
        />
      </div>

      <!-- Empty State -->
      <div 
        v-else 
        class="text-center py-16 bg-white dark:bg-dark-card rounded-3xl border border-dashed border-slate-300 dark:border-dark-border p-8"
      >
        <div class="w-16 h-16 rounded-2xl bg-orange-100 dark:bg-brand-950/60 text-brand-600 flex items-center justify-center mx-auto mb-4">
          <Utensils class="w-8 h-8" />
        </div>
        <h3 class="text-lg font-black text-slate-800 dark:text-white mb-1">
          لم يتم العثور على أطباق مطابقة
        </h3>
        <p class="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto mb-5">
          جرب البحث بكلمات أخرى أو تصفح القائمة الشاملة.
        </p>
        <button
          @click="resetFilters"
          class="px-5 py-2.5 rounded-xl bg-brand-600 text-white font-bold text-xs hover:bg-brand-700 transition"
        >
          إعادة ضبط الفلاتر
        </button>
      </div>

      <!-- ================= Prominent "View All" Showcase Banner ================= -->
      <div class="mt-8 sm:mt-10 p-5 sm:p-8 rounded-3xl bg-gradient-to-r from-orange-500 via-brand-600 to-brand-700 text-white shadow-xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6 text-right">
        
        <!-- Decorative Glow -->
        <div class="absolute -right-12 -bottom-12 w-48 h-48 bg-white/10 rounded-full blur-xl pointer-events-none"></div>

        <div class="space-y-2 relative z-10">
          <span class="inline-block px-3 py-1 rounded-full bg-black/20 text-amber-200 text-xs font-black">
            قائمة الطعام الشاملة
          </span>
          <h3 class="text-2xl sm:text-3xl font-black">
            هل تريد استكشاف كافة الوجبات والسندوتشات؟
          </h3>
          <p class="text-xs sm:text-sm text-orange-100 font-medium max-w-xl">
            تضم قائمتنا الكاملة أكثر من {{ menuItems.length }} صنف من الشاورما السورية والمشويات والفتات والبوكسات الملكية وتريندات أبو سمرة.
          </p>
        </div>

        <!-- Prominent CTA Button -->
        <button
          @click="goToFullMenu(activeCategory)"
          class="relative z-10 shrink-0 flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-white hover:bg-orange-50 text-brand-700 font-black text-sm sm:text-base shadow-xl hover:shadow-2xl active:scale-95 transition-all duration-200 group"
        >
          <span>تصفح الجميع ({{ menuItems.length }} صنف)</span>
          <ArrowLeft class="w-5 h-5 group-hover:-translate-x-1.5 transition-transform" />
        </button>

      </div>

    </div>

    <!-- Product Customization Modal -->
    <ProductModal 
      :isOpen="isModalOpen"
      :product="selectedProductForModal"
      @close="closeProductModal"
    />
  </section>
</template>
