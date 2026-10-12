<script setup>
import { ref } from 'vue'
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  MessageCircle, 
  CheckCircle2, 
  Bike, 
  Store, 
  UtensilsCrossed,
  Tag,
  ArrowRight,
  Clock,
  Sparkles,
  PhoneCall
} from 'lucide-vue-next'
import { useCart } from '../composables/useCart'
import { restaurantInfo } from '../data/restaurantInfo'

const { 
  cartItems, 
  isCartOpen, 
  closeCart, 
  updateQuantity, 
  removeFromCart, 
  clearCart,
  orderType, 
  deliveryFee, 
  discountCode, 
  discountAmount, 
  discountSuccessMessage, 
  discountErrorMessage,
  customer,
  applyCoupon, 
  removeCoupon, 
  itemsCount, 
  subtotal, 
  currentDeliveryFee, 
  grandTotal, 
  triggerCelebration,
  generateWhatsAppOrderLink 
} = useCart()

// Order submission status
const orderSubmitted = ref(false)
const orderReferenceNumber = ref('')
const isSubmitting = ref(false)

const handleSimulatedCheckout = () => {
  if (cartItems.value.length === 0) return

  // Validate basic fields
  if (!customer.value.name) {
    alert('يرجى إدخال اسم العميل لتأكيد الطلب')
    return
  }
  if (!customer.value.phone) {
    alert('يرجى إدخال رقم الهاتف للتواصل')
    return
  }

  isSubmitting.value = true
  
  setTimeout(() => {
    isSubmitting.value = false
    orderReferenceNumber.value = 'AS-' + Math.floor(100000 + Math.random() * 900000)
    orderSubmitted.value = true
    triggerCelebration()
  }, 700)
}

const handleWhatsAppCheckout = () => {
  if (cartItems.value.length === 0) return
  const link = generateWhatsAppOrderLink()
  window.open(link, '_blank')
}

const resetOrderSuccess = () => {
  orderSubmitted.value = false
  clearCart()
  closeCart()
}
</script>

<template>
  <div>
    <!-- Backdrop Overlay -->
    <div 
      v-if="isCartOpen"
      @click="closeCart"
      class="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm transition-opacity"
    ></div>

    <!-- Drawer Panel -->
    <aside
      :class="[
        'fixed top-0 bottom-0 left-0 z-50 w-full max-w-md bg-white dark:bg-dark-card shadow-2xl flex flex-col transition-transform duration-300 ease-in-out border-r border-slate-200 dark:border-dark-border',
        isCartOpen ? 'translate-x-0' : '-translate-x-full'
      ]"
    >
      <!-- Drawer Header -->
      <div class="p-4 sm:p-5 border-b border-slate-200 dark:border-dark-border flex items-center justify-between bg-slate-50/80 dark:bg-dark-surface/60">
        <div class="flex items-center gap-2">
          <button 
            @click="closeCart"
            class="p-2 rounded-xl text-slate-500 hover:text-slate-800 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-dark-surface transition"
          >
            <X class="w-5 h-5" />
          </button>
          <div>
            <h2 class="text-base sm:text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
              <ShoppingBag class="w-5 h-5 text-brand-600" />
              <span>سلة الطلبات</span>
              <span 
                v-if="itemsCount > 0"
                class="text-xs px-2 py-0.5 rounded-full bg-brand-100 dark:bg-brand-950 text-brand-600 font-bold"
              >
                {{ itemsCount }}
              </span>
            </h2>
          </div>
        </div>

        <button 
          v-if="cartItems.length > 0 && !orderSubmitted"
          @click="clearCart"
          class="text-xs font-bold text-red-500 hover:text-red-700 flex items-center gap-1 transition"
        >
          <Trash2 class="w-3.5 h-3.5" />
          <span>تفريغ</span>
        </button>
      </div>

      <!-- Content Area -->
      <div class="flex-1 overflow-y-auto p-4 sm:p-5 space-y-6">
        
        <!-- ================= Case 1: Order Success View ================= -->
        <div v-if="orderSubmitted" class="py-8 text-center space-y-4">
          <div class="w-20 h-20 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 flex items-center justify-center mx-auto shadow-inner animate-bounce">
            <CheckCircle2 class="w-12 h-12" />
          </div>
          
          <h3 class="text-2xl font-black text-slate-900 dark:text-white">
            تم استلام طلبك بنجاح! 🎉
          </h3>
          <p class="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
            شكراً لطلبك من مطعم أبو سمرة. طلبك قيد التجهيز الآن بعناية فائقة.
          </p>

          <div class="p-4 rounded-2xl bg-orange-50 dark:bg-dark-surface border border-orange-200 dark:border-dark-border text-right space-y-2">
            <div class="flex justify-between text-xs">
              <span class="text-slate-500">رقم الطلب:</span>
              <span class="font-black text-brand-600">{{ orderReferenceNumber }}</span>
            </div>
            <div class="flex justify-between text-xs">
              <span class="text-slate-500">نوع الطلب:</span>
              <span class="font-bold text-slate-800 dark:text-slate-200">
                {{ orderType === 'delivery' ? 'توصيل للمنزل' : (orderType === 'pickup' ? 'استلام من المطعم' : 'صالة داخلية') }}
              </span>
            </div>
            <div class="flex justify-between text-xs">
              <span class="text-slate-500">الإجمالي:</span>
              <span class="font-black text-slate-900 dark:text-white">{{ grandTotal }} ج.م</span>
            </div>
            <div class="flex justify-between text-xs pt-1 border-t border-orange-100 dark:border-dark-border">
              <span class="text-slate-500">وقت التوصيل التقديري:</span>
              <span class="font-bold text-emerald-600 flex items-center gap-1">
                <Clock class="w-3.5 h-3.5" />
                25 - 35 دقيقة
              </span>
            </div>
          </div>

          <div class="space-y-2.5 pt-2">
            <button
              @click="handleWhatsAppCheckout"
              class="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md transition"
            >
              <MessageCircle class="w-4 h-4" />
              <span>متابعة الطلب على واتساب</span>
            </button>
            
            <a
              :href="`tel:${restaurantInfo.phones.orders}`"
              class="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-slate-200 dark:border-dark-border text-slate-700 dark:text-slate-300 font-bold text-xs hover:bg-slate-100 dark:hover:bg-dark-surface transition"
            >
              <PhoneCall class="w-4 h-4 text-brand-600" />
              <span>اتصل بالفرع: <bdi dir="ltr" class="font-outfit font-black mr-1">{{ restaurantInfo.phones.ordersDisplay }}</bdi></span>
            </a>

            <button
              @click="resetOrderSuccess"
              class="w-full py-2.5 text-xs text-brand-600 font-bold hover:underline"
            >
              العودة لقائمة الطعام
            </button>
          </div>
        </div>

        <!-- ================= Case 2: Empty Cart View ================= -->
        <div v-else-if="cartItems.length === 0" class="py-16 text-center space-y-4">
          <div class="w-20 h-20 rounded-2xl bg-orange-100 dark:bg-brand-950/60 text-brand-600 flex items-center justify-center mx-auto">
            <ShoppingBag class="w-10 h-10" />
          </div>
          <h3 class="text-lg font-black text-slate-800 dark:text-white">
            سلة طلباتك فارغة حالياً
          </h3>
          <p class="text-xs text-slate-500 dark:text-slate-400 max-w-xs mx-auto leading-relaxed">
            تصفح قائمتنا اللذيذة وأضف سندوتشات الشاورما والبوكسات والفتات لتستمتع بأشهى مذاق.
          </p>
          <button
            @click="closeCart"
            class="px-6 py-3 rounded-xl bg-brand-600 text-white font-bold text-xs shadow-md shadow-brand-500/20 hover:bg-brand-700 transition"
          >
            تصفح المنيو الآن
          </button>
        </div>

        <!-- ================= Case 3: Items in Cart ================= -->
        <div v-else class="space-y-6 text-right">
          
          <!-- Order Type Selector -->
          <div class="space-y-1.5">
            <label class="text-xs font-bold text-slate-700 dark:text-slate-300">اختر طريقة الاستلام:</label>
            <div class="grid grid-cols-3 gap-2">
              <button
                type="button"
                @click="orderType = 'delivery'"
                :class="[
                  'py-2 px-2 rounded-xl text-xs font-bold border flex flex-col items-center justify-center gap-1 transition',
                  orderType === 'delivery' 
                    ? 'border-brand-600 bg-brand-50 dark:bg-brand-950/40 text-brand-600 dark:text-brand-400' 
                    : 'border-slate-200 dark:border-dark-border text-slate-600 dark:text-slate-400'
                ]"
              >
                <Bike class="w-4 h-4" />
                <span>توصيل سريع</span>
              </button>

              <button
                type="button"
                @click="orderType = 'pickup'"
                :class="[
                  'py-2 px-2 rounded-xl text-xs font-bold border flex flex-col items-center justify-center gap-1 transition',
                  orderType === 'pickup' 
                    ? 'border-brand-600 bg-brand-50 dark:bg-brand-950/40 text-brand-600 dark:text-brand-400' 
                    : 'border-slate-200 dark:border-dark-border text-slate-600 dark:text-slate-400'
                ]"
              >
                <Store class="w-4 h-4" />
                <span>استلام بالفرع</span>
              </button>

              <button
                type="button"
                @click="orderType = 'dinein'"
                :class="[
                  'py-2 px-2 rounded-xl text-xs font-bold border flex flex-col items-center justify-center gap-1 transition',
                  orderType === 'dinein' 
                    ? 'border-brand-600 bg-brand-50 dark:bg-brand-950/40 text-brand-600 dark:text-brand-400' 
                    : 'border-slate-200 dark:border-dark-border text-slate-600 dark:text-slate-400'
                ]"
              >
                <UtensilsCrossed class="w-4 h-4" />
                <span>صالة داخلية</span>
              </button>
            </div>
          </div>

          <!-- Items List -->
          <div class="space-y-3">
            <div 
              v-for="item in cartItems"
              :key="item.key"
              class="p-3 rounded-2xl bg-slate-50 dark:bg-dark-surface border border-slate-200/80 dark:border-dark-border flex gap-3 items-center justify-between"
            >
              <!-- Thumbnail -->
              <img 
                :src="item.product.image" 
                :alt="item.product.name" 
                class="w-16 h-16 rounded-xl object-cover shrink-0"
              />

              <!-- Item Details -->
              <div class="flex-1 text-right min-w-0">
                <h4 class="text-xs sm:text-sm font-black text-slate-900 dark:text-white truncate">
                  {{ item.product.name }}
                </h4>
                
                <div class="flex flex-wrap gap-1 mt-0.5">
                  <span 
                    v-if="item.extraCheese"
                    class="text-[10px] bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 px-1.5 py-0.2 rounded font-bold"
                  >
                    +جبنة موتزاريلا (15ج)
                  </span>
                  <span 
                    v-if="item.spiceLevel === 'spicy'"
                    class="text-[10px] bg-red-100 dark:bg-red-950/60 text-red-600 dark:text-red-400 px-1.5 py-0.2 rounded font-bold"
                  >
                    حار 🌶️
                  </span>
                </div>

                <div class="text-xs font-black text-brand-600 dark:text-brand-400 mt-1">
                  {{ item.unitPrice * item.quantity }} ج.م
                  <span class="text-[10px] text-slate-400 font-normal">({{ item.unitPrice }} ج × {{ item.quantity }})</span>
                </div>
              </div>

              <!-- Qty Buttons -->
              <div class="flex flex-col items-center gap-1">
                <div class="flex items-center gap-1 bg-white dark:bg-dark-card border border-slate-200 dark:border-dark-border rounded-lg p-0.5">
                  <button 
                    @click="updateQuantity(item.key, -1)"
                    class="w-6 h-6 rounded flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-slate-100"
                  >
                    <Minus class="w-3 h-3" />
                  </button>
                  <span class="w-5 text-center text-xs font-black">{{ item.quantity }}</span>
                  <button 
                    @click="updateQuantity(item.key, 1)"
                    class="w-6 h-6 rounded flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-slate-100"
                  >
                    <Plus class="w-3 h-3" />
                  </button>
                </div>

                <button 
                  @click="removeFromCart(item.key)"
                  class="text-[10px] text-red-500 hover:underline flex items-center gap-0.5"
                >
                  <Trash2 class="w-3 h-3" />
                  حذف
                </button>
              </div>

            </div>
          </div>

          <!-- Coupon Code Input -->
          <div class="p-3.5 rounded-2xl bg-orange-50/60 dark:bg-dark-surface/60 border border-orange-200/50 dark:border-dark-border space-y-2">
            <div class="flex items-center gap-2">
              <input 
                v-model="discountCode"
                type="text"
                placeholder="كود الخصم (جرب: SAMRA10 أو WELCOME)"
                class="flex-1 px-3 py-2 rounded-xl border border-slate-200 dark:border-dark-border bg-white dark:bg-dark-card text-xs focus:ring-1 focus:ring-brand-500 uppercase text-center"
              />
              <button
                @click="applyCoupon"
                class="px-4 py-2 rounded-xl bg-slate-900 dark:bg-brand-600 text-white font-bold text-xs hover:bg-black transition"
              >
                تطبيق
              </button>
            </div>

            <p v-if="discountSuccessMessage" class="text-[11px] text-emerald-600 font-bold flex items-center gap-1">
              <CheckCircle2 class="w-3 h-3" />
              {{ discountSuccessMessage }}
            </p>
            <p v-if="discountErrorMessage" class="text-[11px] text-red-500 font-bold">
              {{ discountErrorMessage }}
            </p>
          </div>

          <!-- Customer Info Form -->
          <div class="space-y-3 pt-2">
            <h4 class="text-xs font-black text-slate-800 dark:text-slate-200">بيانات التوصيل والتواصل:</h4>
            
            <input 
              v-model="customer.name"
              type="text"
              placeholder="الاسم الكريم *"
              class="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-dark-border bg-slate-50 dark:bg-dark-surface text-xs focus:ring-2 focus:ring-brand-500"
            />
            
            <input 
              v-model="customer.phone"
              type="tel"
              placeholder="رقم الهاتف للتأكيد (مثال: 010xxxxxxxx) *"
              class="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-dark-border bg-slate-50 dark:bg-dark-surface text-xs focus:ring-2 focus:ring-brand-500"
            />

            <input 
              v-if="orderType === 'delivery'"
              v-model="customer.address"
              type="text"
              placeholder="العنوان التفصيلي (الشارع، رقم العمارة، الشقة) *"
              class="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-dark-border bg-slate-50 dark:bg-dark-surface text-xs focus:ring-2 focus:ring-brand-500"
            />

            <input 
              v-model="customer.notes"
              type="text"
              placeholder="ملاحظات إضافية على الطلب..."
              class="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-dark-border bg-slate-50 dark:bg-dark-surface text-xs focus:ring-2 focus:ring-brand-500"
            />
          </div>

          <!-- Order Summary Breakdown -->
          <div class="pt-4 border-t border-slate-200 dark:border-dark-border space-y-2 text-xs">
            <div class="flex justify-between text-slate-500 dark:text-slate-400">
              <span>المجموع الفرعي:</span>
              <span class="font-bold text-slate-800 dark:text-slate-200">{{ subtotal }} ج.م</span>
            </div>

            <div v-if="orderType === 'delivery'" class="flex justify-between text-slate-500 dark:text-slate-400">
              <span>خدمة التوصيل:</span>
              <span class="font-bold text-slate-800 dark:text-slate-200">{{ deliveryFee }} ج.م</span>
            </div>

            <div v-if="discountAmount > 0" class="flex justify-between text-emerald-600 font-bold">
              <span>قيمة الخصم:</span>
              <span>-{{ discountAmount }} ج.م</span>
            </div>

            <div class="flex justify-between text-sm sm:text-base font-black text-slate-900 dark:text-white pt-2 border-t border-slate-200 dark:border-dark-border">
              <span>الإجمالي الكلي:</span>
              <span class="text-brand-600 dark:text-brand-400 text-lg">{{ grandTotal }} ج.م</span>
            </div>
          </div>

        </div>
      </div>

      <!-- Drawer Footer Action Buttons -->
      <div 
        v-if="cartItems.length > 0 && !orderSubmitted"
        class="p-4 sm:p-5 border-t border-slate-200 dark:border-dark-border bg-white dark:bg-dark-card space-y-2.5"
      >
        <!-- WhatsApp Direct Checkout Button -->
        <button
          @click="handleWhatsAppCheckout"
          class="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 active:scale-98 text-white font-black text-sm shadow-lg shadow-emerald-600/25 transition"
        >
          <MessageCircle class="w-5 h-5" />
          <span>إرسال الطلب عبر واتساب ({{ grandTotal }} ج.م)</span>
        </button>

        <!-- Simulated Direct Order Placement -->
        <button
          @click="handleSimulatedCheckout"
          :disabled="isSubmitting"
          class="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-r from-brand-600 to-orange-500 hover:from-brand-700 hover:to-orange-600 active:scale-98 text-white font-bold text-xs shadow-md shadow-brand-500/20 transition"
        >
          <Sparkles class="w-4 h-4" />
          <span v-if="!isSubmitting">تأكيد الطلب الفوري أونلاين</span>
          <span v-else>جاري تسجيل الطلب...</span>
        </button>
      </div>

    </aside>
  </div>
</template>
