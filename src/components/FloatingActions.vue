<script setup>
import { Phone, MessageCircle, ShoppingBag } from 'lucide-vue-next'
import { restaurantInfo } from '../data/restaurantInfo'
import { useCart } from '../composables/useCart'

const { itemsCount, openCart, grandTotal } = useCart()
</script>

<template>
  <!-- Floating Actions (Mobile & Tablet Priority, Discreet on Desktop) -->
  <div class="fixed bottom-4 sm:bottom-6 left-4 sm:left-6 z-40 flex flex-col items-start gap-2 pointer-events-none">
    
    <!-- Floating Cart Trigger (Only when items in cart) -->
    <button
      v-if="itemsCount > 0"
      @click="openCart"
      class="pointer-events-auto flex items-center gap-2 px-3.5 py-2.5 sm:px-4 sm:py-3 rounded-2xl bg-brand-600 hover:bg-brand-700 active:scale-95 text-white font-black text-xs sm:text-sm shadow-2xl shadow-brand-600/50 transition-all duration-300 animate-bounce"
    >
      <div class="relative">
        <ShoppingBag class="w-4 h-4 sm:w-5 sm:h-5" />
        <span class="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-white text-brand-600 text-[10px] font-black flex items-center justify-center font-outfit">
          {{ itemsCount }}
        </span>
      </div>
      <span>السلة ({{ grandTotal }} ج.م)</span>
    </button>

    <!-- Quick Floating Action Pills (Visible on Mobile / Tablet where header actions are tucked into hamburger) -->
    <div class="pointer-events-auto lg:hidden flex items-center gap-2 bg-white/95 dark:bg-dark-card/95 backdrop-blur-md p-1.5 rounded-2xl border border-slate-200/90 dark:border-dark-border shadow-2xl">
      <!-- WhatsApp Direct Chat Button -->
      <a
        :href="restaurantInfo.phones.whatsappLink"
        target="_blank"
        class="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md shadow-emerald-600/30 active:scale-95 transition"
        title="طلب فوري عبر واتساب"
      >
        <MessageCircle class="w-4 h-4 shrink-0" />
        <span>واتساب</span>
      </a>

      <!-- Direct Phone Call Button -->
      <a
        :href="`tel:${restaurantInfo.phones.orders}`"
        class="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs shadow-md shadow-brand-600/30 active:scale-95 transition"
        title="اتصال هاتفي مباشر للطلب"
      >
        <Phone class="w-4 h-4 shrink-0" />
        <span>اتصال</span>
      </a>
    </div>

  </div>
</template>
