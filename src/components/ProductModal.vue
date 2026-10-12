<script setup>
import { ref, computed, watch } from 'vue'
import { X, Plus, Minus, ShoppingBag, Sparkles, Flame, Check } from 'lucide-vue-next'
import { useCart } from '../composables/useCart'

const props = defineProps({
  product: {
    type: Object,
    default: null
  },
  isOpen: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['close'])

const { addToCart } = useCart()

const quantity = ref(1)
const extraCheese = ref(false)
const spiceLevel = ref('normal') // 'normal' | 'spicy'
const notes = ref('')

// Reset state whenever product changes
watch(() => props.product, () => {
  quantity.value = 1
  extraCheese.value = false
  spiceLevel.value = 'normal'
  notes.value = ''
})

const cheesePrice = 15 // EGP (as stated on the menu)

const unitPrice = computed(() => {
  if (!props.product) return 0
  return (props.product.price || 0) + (extraCheese.value ? cheesePrice : 0)
})

const totalPrice = computed(() => {
  return unitPrice.value * quantity.value
})

const incrementQty = () => {
  quantity.value++
}

const decrementQty = () => {
  if (quantity.value > 1) {
    quantity.value--
  }
}

const handleAddToCart = () => {
  if (!props.product) return
  addToCart(props.product, {
    quantity: quantity.value,
    extraCheese: extraCheese.value,
    spiceLevel: spiceLevel.value,
    notes: notes.value
  })
  emit('close')
}
</script>

<template>
  <div 
    v-if="isOpen && product"
    class="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
    @click.self="emit('close')"
  >
    <div 
      class="relative w-full max-w-lg bg-white dark:bg-dark-card rounded-3xl overflow-hidden shadow-2xl border border-slate-200 dark:border-dark-border transform transition-all duration-300"
    >
      <!-- Close Button -->
      <button 
        @click="emit('close')"
        class="absolute top-4 left-4 z-20 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition"
      >
        <X class="w-5 h-5" />
      </button>

      <!-- Product Image Banner -->
      <div class="relative h-56 sm:h-64 overflow-hidden">
        <img 
          :src="product.image" 
          :alt="product.name" 
          class="w-full h-full object-cover"
        />
        <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
        
        <div class="absolute bottom-4 right-4 left-4 text-right text-white">
          <span 
            v-if="product.badge"
            class="inline-block px-2.5 py-1 text-xs font-bold rounded-lg bg-brand-600 text-white mb-2 shadow"
          >
            {{ product.badge }}
          </span>
          <h3 class="text-2xl font-black">{{ product.name }}</h3>
          <p class="text-xs text-slate-300">{{ product.nameEn }}</p>
        </div>
      </div>

      <!-- Modal Body -->
      <div class="p-6 space-y-6 text-right max-h-[60vh] overflow-y-auto">
        
        <!-- Description -->
        <p class="text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
          {{ product.description }}
        </p>

        <!-- Base Price -->
        <div class="flex items-center justify-between p-3.5 rounded-2xl bg-orange-50 dark:bg-dark-surface border border-orange-100 dark:border-dark-border">
          <span class="text-xs text-slate-500 dark:text-slate-400 font-bold">السعر الأساسي</span>
          <span class="text-xl font-black text-brand-600 dark:text-brand-400">
            {{ product.price }} <span class="text-xs font-bold">ج.م</span>
          </span>
        </div>

        <!-- Customization Options -->
        <div class="space-y-4">
          <h4 class="text-sm font-black text-slate-900 dark:text-white flex items-center gap-1.5">
            <Sparkles class="w-4 h-4 text-brand-600" />
            <span>تخصيص الوجبة والإضافات</span>
          </h4>

          <!-- Cheese Add-on -->
          <label 
            class="flex items-center justify-between p-3.5 rounded-2xl border transition cursor-pointer"
            :class="[
              extraCheese 
                ? 'border-brand-500 bg-brand-50/70 dark:bg-brand-950/40 ring-1 ring-brand-500' 
                : 'border-slate-200 dark:border-dark-border bg-slate-50/50 dark:bg-dark-surface/40 hover:bg-slate-100'
            ]"
          >
            <div class="flex items-center gap-3">
              <input 
                type="checkbox" 
                v-model="extraCheese"
                class="w-5 h-5 rounded text-brand-600 focus:ring-brand-500 accent-brand-600"
              />
              <div>
                <span class="block text-sm font-bold text-slate-800 dark:text-slate-200">إضافة جبنة موتزاريلا سايحة 🧀</span>
                <span class="text-xs text-slate-500 dark:text-slate-400">موتزاريلا طبيعية تذوب على الجريل</span>
              </div>
            </div>
            <span class="text-sm font-black text-brand-600 dark:text-brand-400">+15 ج.م</span>
          </label>

          <!-- Spice Level -->
          <div>
            <label class="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
              درجة الشطة / التتبيلة
            </label>
            <div class="grid grid-cols-2 gap-3">
              <button
                type="button"
                @click="spiceLevel = 'normal'"
                :class="[
                  'py-2.5 px-4 rounded-xl text-xs font-bold border transition flex items-center justify-center gap-1.5',
                  spiceLevel === 'normal' 
                    ? 'border-brand-600 bg-brand-600 text-white shadow-sm' 
                    : 'border-slate-200 dark:border-dark-border bg-slate-50 dark:bg-dark-surface text-slate-700 dark:text-slate-300'
                ]"
              >
                <span>بارد / عادي</span>
              </button>
              
              <button
                type="button"
                @click="spiceLevel = 'spicy'"
                :class="[
                  'py-2.5 px-4 rounded-xl text-xs font-bold border transition flex items-center justify-center gap-1.5',
                  spiceLevel === 'spicy' 
                    ? 'border-red-600 bg-red-600 text-white shadow-sm' 
                    : 'border-slate-200 dark:border-dark-border bg-slate-50 dark:bg-dark-surface text-slate-700 dark:text-slate-300'
                ]"
              >
                <Flame class="w-3.5 h-3.5 text-white" v-if="spiceLevel === 'spicy'" />
                <span>حار / سبايسي 🌶️</span>
              </button>
            </div>
          </div>

          <!-- Special Notes -->
          <div>
            <label class="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
              ملاحظاتك للشيف (اختياري)
            </label>
            <input 
              v-model="notes"
              type="text"
              placeholder="مثال: زيادة تومية، بدون مخلل، خبز محمص..."
              class="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-dark-border bg-slate-50 dark:bg-dark-surface text-slate-800 dark:text-slate-200 text-xs focus:ring-2 focus:ring-brand-500 focus:outline-none text-right"
            />
          </div>

        </div>

      </div>

      <!-- Modal Footer (Quantity + Add Button) -->
      <div class="p-4 sm:p-6 bg-slate-50 dark:bg-dark-surface/60 border-t border-slate-200 dark:border-dark-border flex items-center justify-between gap-4">
        
        <!-- Quantity Selector -->
        <div class="flex items-center gap-2 border border-slate-200 dark:border-dark-border rounded-xl p-1 bg-white dark:bg-dark-card shadow-sm">
          <button 
            @click="decrementQty"
            class="w-8 h-8 rounded-lg flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-dark-surface transition"
            :disabled="quantity <= 1"
          >
            <Minus class="w-3.5 h-3.5" />
          </button>
          <span class="w-8 text-center text-sm font-black text-slate-800 dark:text-slate-100">
            {{ quantity }}
          </span>
          <button 
            @click="incrementQty"
            class="w-8 h-8 rounded-lg flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-dark-surface transition"
          >
            <Plus class="w-3.5 h-3.5" />
          </button>
        </div>

        <!-- Add Button -->
        <button
          @click="handleAddToCart"
          class="flex-1 flex items-center justify-center gap-2 py-3 px-5 rounded-xl bg-brand-600 hover:bg-brand-700 active:scale-95 text-white font-extrabold text-sm shadow-md shadow-brand-500/30 transition duration-200"
        >
          <ShoppingBag class="w-4 h-4" />
          <span>إضافة للسلة ({{ totalPrice }} ج.م)</span>
        </button>

      </div>

    </div>
  </div>
</template>
