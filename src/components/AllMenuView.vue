<script setup>
import { ref, computed, onMounted } from 'vue'
import { 
  ArrowRight, 
  Search, 
  X, 
  Sparkles, 
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
  ArrowUpDown,
  PhoneCall,
  MessageCircle,
  Home
} from 'lucide-vue-next'
import { categories, menuItems } from '../data/menuData'
import { restaurantInfo } from '../data/restaurantInfo'
import { useNavigation } from '../composables/useNavigation'
import ProductCard from './ProductCard.vue'
import ProductModal from './ProductModal.vue'

const { goToHome, selectedMenuCategory } = useNavigation()

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

const activeCategory = ref(selectedMenuCategory.value || 'all')
const searchQuery = ref('')
const filterOnlyPopular = ref(false)
const sortBy = ref('default') // 'default' | 'price-asc' | 'price-desc'

const selectedProductForModal = ref(null)
const isModalOpen = ref(false)

const openProductModal = (product) => {
  selectedProductForModal.value = product
  isModalOpen.value = true
}

const closeProductModal = () => {
  isModalOpen.value = false
}

// Filtered and sorted catalog items
const displayedItems = computed(() => {
  let list = menuItems.filter(item => {
    // Category match
    const matchesCategory = activeCategory.value === 'all' || item.category === activeCategory.value

    // Search query match
    const q = searchQuery.value.trim().toLowerCase()
    const matchesSearch = !q || 
      item.name.toLowerCase().includes(q) || 
      (item.nameEn && item.nameEn.toLowerCase().includes(q)) ||
      (item.description && item.description.toLowerCase().includes(q))

    // Popular match
    const matchesPopular = !filterOnlyPopular.value || item.popular

    return matchesCategory && matchesSearch && matchesPopular
  })

  // Sorting
  if (sortBy.value === 'price-asc') {
    list = [...list].sort((a, b) => a.price - b.price)
  } else if (sortBy.value === 'price-desc') {
    list = [...list].sort((a, b) => b.price - a.price)
  } else if (sortBy.value === 'popular') {
    list = [...list].sort((a, b) => (b.popular ? 1 : 0) - (a.popular ? 1 : 0))
  }

  return list
})

const resetFilters = () => {
  activeCategory.value = 'all'
  searchQuery.value = ''
  filterOnlyPopular.value = false
  sortBy.value = 'default'
}

onMounted(() => {
  window.scrollTo({ top: 0, behavior: 'instant' })
})
</script>

<template>
  <div class="pt-32 sm:pt-36 lg:pt-40 xl:pt-44 pb-14 min-h-screen">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <!-- Top Navigation & Breadcrumbs -->
      <div class="flex flex-wrap items-center justify-between gap-4 mb-5 pb-4 border-b border-slate-200/80 dark:border-dark-border">
        <!-- Back Button -->
        <button
          @click="goToHome"
          class="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white dark:bg-dark-card border border-slate-200 dark:border-dark-border text-slate-800 dark:text-slate-100 font-bold text-xs sm:text-sm hover:bg-orange-50 dark:hover:bg-dark-surface hover:text-brand-600 transition shadow-sm active:scale-95 group"
        >
          <ArrowRight class="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          <span>العودة للصفحة الرئيسية</span>
        </button>

        <!-- Breadcrumbs & Total Count -->
        <div class="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 font-bold">
          <span @click="goToHome" class="hover:text-brand-600 cursor-pointer flex items-center gap-1">
            <Home class="w-3.5 h-3.5" />
            الرئيسية
          </span>
          <span>/</span>
          <span class="text-brand-600 dark:text-brand-400">قائمة الطعام الكاملة</span>
          <span class="px-2 py-0.5 rounded-full bg-brand-100 dark:bg-brand-950/80 text-brand-700 dark:text-brand-300 font-black text-[11px]">
            {{ menuItems.length }} صنف
          </span>
        </div>
      </div>

      <!-- Page Header -->
      <div class="text-right mb-10 space-y-3">
        <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-100 dark:bg-brand-950/60 text-brand-700 dark:text-brand-300 text-xs font-black">
          <Utensils class="w-3.5 h-3.5 text-brand-600" />
          <span>القائمة الكاملة والشاملة</span>
        </div>
        
        <h1 class="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white">
          قائمة طعام <span class="text-brand-600">مطعم أبو سمرة</span>
        </h1>
        
        <p class="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-2xl font-medium leading-relaxed">
          تصفح كافة أصناف المنيو الأصلية: الشاورما السورية، المشويات على الفحم، الفتات، البوكسات، السندوتشات والمقبلات مع التقييم المباشر والإضافة للسلة.
        </p>
      </div>

      <!-- Search, Sort & Filters Bar -->
      <div class="mb-8 space-y-4">
        
        <!-- Search & Sort Row -->
        <div class="grid grid-cols-1 md:grid-cols-12 gap-3">
          
          <!-- Search Input (7 cols) -->
          <div class="md:col-span-7 relative">
            <Search class="w-4 h-4 text-slate-400 absolute right-4 top-1/2 -translate-y-1/2" />
            <input 
              v-model="searchQuery"
              type="text" 
              placeholder="ابحث بالاسم أو المكونات (مثال: شاورما، شيش، زنجر، فتة، بطاطس)..."
              class="w-full pr-11 pl-10 py-3.5 rounded-2xl bg-white dark:bg-dark-card border border-slate-200 dark:border-dark-border text-slate-800 dark:text-slate-100 placeholder:text-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 shadow-sm"
            />
            <button 
              v-if="searchQuery"
              @click="searchQuery = ''"
              class="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              <X class="w-4 h-4" />
            </button>
          </div>

          <!-- Sort Select (3 cols) -->
          <div class="md:col-span-3 relative">
            <select
              v-model="sortBy"
              class="w-full px-4 py-3.5 rounded-2xl bg-white dark:bg-dark-card border border-slate-200 dark:border-dark-border text-slate-800 dark:text-slate-100 text-xs sm:text-sm font-bold focus:outline-none focus:ring-2 focus:ring-brand-500 appearance-none shadow-sm cursor-pointer"
            >
              <option value="default">الترتيب الافتراضي</option>
              <option value="popular">الأكثر طلباً والشعبية</option>
              <option value="price-asc">السعر: من الأقل للأعلى</option>
              <option value="price-desc">السعر: من الأعلى للأقل</option>
            </select>
            <ArrowUpDown class="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          <!-- Popular Filter Toggle (2 cols) -->
          <div class="md:col-span-2">
            <button
              @click="filterOnlyPopular = !filterOnlyPopular"
              :class="[
                'w-full flex items-center justify-center gap-2 py-3.5 px-3 rounded-2xl text-xs sm:text-sm font-bold border transition shadow-sm',
                filterOnlyPopular 
                  ? 'bg-amber-500 text-white border-amber-500 shadow-amber-500/20' 
                  : 'bg-white dark:bg-dark-card border-slate-200 dark:border-dark-border text-slate-700 dark:text-slate-300 hover:border-amber-400'
              ]"
            >
              <Sparkles class="w-4 h-4" />
              <span>الأكثر طلباً</span>
            </button>
          </div>

        </div>

        <!-- Scrollable Category Tabs with Icons -->
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
                  : 'bg-white dark:bg-dark-card border-slate-200/90 dark:border-dark-border text-slate-700 dark:text-slate-300 hover:border-brand-400'
              ]"
            >
              <component :is="iconMap[cat.icon] || Utensils" class="w-4 h-4" />
              <span>{{ cat.name }}</span>
            </button>
          </div>
        </div>

      </div>

      <!-- Live Count Stats -->
      <div class="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-6 px-1">
        <span>يتم عرض <strong>{{ displayedItems.length }}</strong> صنف من أصل {{ menuItems.length }}</span>
        <button 
          v-if="activeCategory !== 'all' || searchQuery || filterOnlyPopular || sortBy !== 'default'"
          @click="resetFilters"
          class="text-brand-600 dark:text-brand-400 hover:underline font-bold"
        >
          إعادة ضبط الفلاتر
        </button>
      </div>

      <!-- Products Grid (All Available Dishes) -->
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
        class="text-center py-20 bg-white dark:bg-dark-card rounded-3xl border border-dashed border-slate-300 dark:border-dark-border p-8"
      >
        <div class="w-16 h-16 rounded-2xl bg-orange-100 dark:bg-brand-950/60 text-brand-600 flex items-center justify-center mx-auto mb-4">
          <Utensils class="w-8 h-8" />
        </div>
        <h3 class="text-lg font-black text-slate-800 dark:text-white mb-1">
          لم يتم العثور على أطباق مطابقة
        </h3>
        <p class="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto mb-5">
          جرب البحث بكلمات أخرى أو اختر فئة مختلفة من القائمة.
        </p>
        <button
          @click="resetFilters"
          class="px-5 py-2.5 rounded-xl bg-brand-600 text-white font-bold text-xs hover:bg-brand-700 transition"
        >
          عرض جميع الأطباق ({{ menuItems.length }} صنف)
        </button>
      </div>

      <!-- Bottom Return to Home CTA -->
      <div class="mt-16 text-center pt-8 border-t border-slate-200 dark:border-dark-border">
        <button
          @click="goToHome"
          class="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl bg-brand-600 hover:bg-brand-700 active:scale-95 text-white font-extrabold text-sm shadow-lg shadow-brand-500/25 transition"
        >
          <ArrowRight class="w-4 h-4" />
          <span>العودة إلى الصفحة الرئيسية</span>
        </button>
      </div>

    </div>

    <!-- Product Customization Modal -->
    <ProductModal 
      :isOpen="isModalOpen"
      :product="selectedProductForModal"
      @close="closeProductModal"
    />
  </div>
</template>
