<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { 
  Phone, 
  ShoppingBag, 
  Menu as MenuIcon, 
  X, 
  Sun, 
  Moon, 
  MessageCircle, 
  Sparkles,
  MapPin,
  Clock,
  Utensils,
  PackageOpen,
  PartyPopper,
  Flame,
  ChevronLeft
} from 'lucide-vue-next'
import { restaurantInfo } from '../data/restaurantInfo'
import { useCart } from '../composables/useCart'
import { useTheme } from '../composables/useTheme'
import { useNavigation } from '../composables/useNavigation'

const { itemsCount, openCart, subtotal } = useCart()
const { isDark, toggleTheme } = useTheme()
const { currentView, goToFullMenu, goToHome } = useNavigation()

const isScrolled = ref(false)
const mobileDrawerOpen = ref(false)

const handleScroll = () => {
  isScrolled.value = window.scrollY > 15
}

// Lock body scrolling when mobile drawer is open
watch(mobileDrawerOpen, (isOpen) => {
  if (typeof document !== 'undefined') {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
  }
})

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  if (typeof document !== 'undefined') {
    document.body.style.overflow = ''
  }
})

const navLinks = [
  { name: 'الرئيسية', href: '#hero', icon: Sparkles },
  { name: 'العروض الخاصة', href: '#offers', icon: Flame, badge: 'خصومات' },
  { name: 'قائمة الطعام', href: '#menu', icon: Utensils },
  { name: 'البوكسات الملكية', href: '#boxes', icon: PackageOpen },
  { name: 'حفلات ومناسبات', href: '#catering', icon: PartyPopper },
  { name: 'الفروع والتواصل', href: '#contact', icon: MapPin },
]

const scrollToSection = (href) => {
  mobileDrawerOpen.value = false

  if (href === '#menu') {
    goToFullMenu()
    return
  }

  if (href === '#hero' && currentView.value === 'full-menu') {
    goToHome()
    return
  }

  if (currentView.value === 'full-menu') {
    goToHome()
    setTimeout(() => {
      const target = document.querySelector(href)
      if (target) {
        const headerOffset = 90
        const elementPosition = target.getBoundingClientRect().top
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        })
      }
    }, 150)
    return
  }

  const target = document.querySelector(href)
  if (target) {
    const headerOffset = 90
    const elementPosition = target.getBoundingClientRect().top
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    })
  }
}
</script>

<template>
  <header 
    :class="[
      'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
      isScrolled 
        ? 'bg-white/95 dark:bg-dark-bg/95 backdrop-blur-md shadow-lg shadow-black/5 dark:shadow-black/20 py-2 sm:py-2.5 border-b border-orange-100/80 dark:border-dark-border/80' 
        : 'bg-white/90 dark:bg-dark-bg/90 backdrop-blur-sm py-3 sm:py-4 border-b border-orange-100/40 dark:border-dark-border/40'
    ]"
  >
    <!-- Top Announcement Bar (Desktop only) -->
    <div class="hidden xl:block pb-2 mb-2 border-b border-orange-100/60 dark:border-dark-border/40 text-[11px] text-slate-600 dark:text-slate-400 font-medium">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <div class="flex items-center gap-4">
          <span class="inline-flex items-center gap-2 text-brand-700 dark:text-brand-400 font-bold bg-brand-50 dark:bg-brand-950/60 px-2.5 py-0.5 rounded-full border border-brand-200/50 dark:border-brand-800/40">
            <span class="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
            مفتوح الآن وجاهزون لاستقبال طلباتكم
          </span>
          <span class="text-slate-300 dark:text-slate-700">|</span>
          <span class="flex items-center gap-1">
            <MapPin class="w-3.5 h-3.5 text-brand-600" />
            <span>{{ restaurantInfo.location.shortAr }}</span>
          </span>
        </div>
        
        <div class="flex items-center gap-5">
          <span class="flex items-center gap-1.5">
            <Clock class="w-3.5 h-3.5 text-amber-500" />
            <span>{{ restaurantInfo.workingHours.ar }}</span>
          </span>
          <span class="text-slate-300 dark:text-slate-700">|</span>
          <a 
            :href="restaurantInfo.phones.whatsappLink" 
            target="_blank"
            class="flex items-center gap-1 hover:text-emerald-600 transition text-emerald-600 dark:text-emerald-400 font-bold"
          >
            <MessageCircle class="w-3.5 h-3.5" />
            <span>واتساب: </span>
            <bdi dir="ltr" class="font-outfit font-bold tracking-wide">{{ restaurantInfo.phones.whatsappDisplay }}</bdi>
          </a>
        </div>
      </div>
    </div>

    <!-- Main Navigation Bar -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between gap-4">
        
        <!-- Brand Identity Container (Properly Sized & Sharp) -->
        <a 
          href="#hero" 
          @click.prevent="scrollToSection('#hero')" 
          class="flex items-center gap-3 sm:gap-3.5 group shrink-0 focus:outline-none"
        >
          <!-- Sharp & Perfectly Proportioned Logo (Cropped to fill frame) -->
          <div 
            class="relative rounded-2xl overflow-hidden shadow-md shadow-brand-500/20 ring-2 ring-brand-500/30 group-hover:scale-105 transition-transform duration-300 shrink-0 bg-brand-600 flex items-center justify-center p-0.5"
            style="width: 54px; height: 54px; min-width: 54px; max-width: 54px; min-height: 54px; max-height: 54px;"
          >
            <img 
              src="/images/logo-cropped.png" 
              alt="شعار مطعم أبو سمرة الرسمي" 
              width="54"
              height="54"
              class="rounded-xl object-contain"
              style="width: 100%; height: 100%; max-width: 54px; max-height: 54px; display: block;"
            />
          </div>

          <!-- Brand Typography Lockup -->
          <div class="flex flex-col text-right justify-center">
            <span class="text-lg sm:text-2xl font-black tracking-tight text-slate-900 dark:text-white font-cairo leading-none">
              مطعم <span class="text-brand-600 dark:text-brand-500">أبو سمرة</span>
            </span>
            <span class="text-[10px] sm:text-xs text-slate-500 dark:text-slate-400 font-bold mt-1 tracking-tight">
              أصالة الشاورما والمشويات السورية
            </span>
          </div>
        </a>

        <!-- Desktop Navigation Links (Properly Spaced) -->
        <nav class="hidden lg:flex items-center gap-1 xl:gap-2">
          <button
            v-for="link in navLinks"
            :key="link.name"
            @click="scrollToSection(link.href)"
            class="px-3 xl:px-3.5 py-2 rounded-xl text-xs xl:text-sm font-bold text-slate-700 hover:text-brand-600 dark:text-slate-200 dark:hover:text-brand-400 hover:bg-orange-50/80 dark:hover:bg-dark-surface/70 transition-colors relative flex items-center gap-1.5"
          >
            <span>{{ link.name }}</span>
            <span 
              v-if="link.badge" 
              class="px-1.5 py-0.2 text-[9px] font-black rounded-full bg-red-500 text-white shadow-sm"
            >
              {{ link.badge }}
            </span>
          </button>
        </nav>

        <!-- Action CTAs & Controls -->
        <div class="flex items-center gap-2 sm:gap-3 shrink-0">
          
          <!-- Theme Mode Toggle -->
          <button
            @click="toggleTheme"
            class="p-2 sm:p-2.5 rounded-xl border border-slate-200/90 dark:border-dark-border text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-dark-surface transition active:scale-95"
            :title="isDark ? 'التحويل للوضع المضيء' : 'التحويل للوضع الليلي'"
            aria-label="تبديل الوضع"
          >
            <Sun v-if="isDark" class="w-4 h-4 text-amber-400 animate-spin-slow" />
            <Moon v-else class="w-4 h-4 text-slate-600" />
          </button>

          <!-- Direct Phone Call Button (With LTR Bidi Isolation) -->
          <a
            :href="`tel:${restaurantInfo.phones.orders}`"
            class="hidden md:inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-black text-brand-700 dark:text-brand-300 bg-brand-50 dark:bg-brand-950/60 border border-brand-200/80 dark:border-brand-800/50 hover:bg-brand-100 transition shadow-sm active:scale-95"
            title="اتصال مباشر للطلبات"
          >
            <Phone class="w-3.5 h-3.5 text-brand-600 animate-bounce shrink-0" />
            <bdi dir="ltr" class="font-outfit tracking-wider text-sm">{{ restaurantInfo.phones.ordersDisplay }}</bdi>
          </a>

          <!-- Cart Drawer Button -->
          <button
            @click="openCart"
            class="relative flex items-center gap-2 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 active:scale-95 text-white font-black text-xs sm:text-sm shadow-md shadow-brand-500/25 transition duration-150"
          >
            <ShoppingBag class="w-4 h-4 shrink-0" />
            <span class="hidden sm:inline">سلة الطلبات</span>
            <span 
              v-if="itemsCount > 0"
              class="inline-flex items-center justify-center min-w-[20px] h-5 px-1 text-[11px] font-black rounded-full bg-white text-brand-600 shadow-sm font-outfit"
            >
              {{ itemsCount }}
            </span>
          </button>

          <!-- Mobile Hamburger Menu Button -->
          <button
            @click="mobileDrawerOpen = true"
            class="lg:hidden p-2 sm:p-2.5 rounded-xl border border-slate-200 dark:border-dark-border text-slate-800 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-dark-surface transition active:scale-95"
            aria-label="فتح القائمة الرئيسية"
          >
            <MenuIcon class="w-5 h-5" />
          </button>

        </div>

      </div>
    </div>

    <!-- ================= Native-Feel Mobile Slide-Over Drawer ================= -->
    <teleport to="body">
      <!-- Backdrop Blur -->
      <transition
        enter-active-class="transition-opacity duration-300 ease-out"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition-opacity duration-200 ease-in"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div 
          v-if="mobileDrawerOpen"
          @click="mobileDrawerOpen = false"
          class="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
        ></div>
      </transition>

      <!-- Drawer Content Panel (RTL Slide from Right) -->
      <aside 
        :class="[
          'fixed top-0 bottom-0 right-0 z-50 w-full max-w-xs sm:max-w-sm bg-white dark:bg-dark-card border-l border-slate-200 dark:border-dark-border shadow-2xl flex flex-col transition-transform duration-300 ease-out text-right',
          mobileDrawerOpen ? 'translate-x-0' : 'translate-x-full'
        ]"
      >
        <!-- Drawer Header -->
        <div class="p-5 border-b border-slate-100 dark:border-dark-border flex items-center justify-between bg-orange-50/50 dark:bg-dark-surface/50">
          <div class="flex items-center gap-3.5">
            <div 
              class="rounded-2xl overflow-hidden p-0.5 bg-gradient-to-tr from-brand-600 to-amber-500 shadow-md shadow-brand-500/20 shrink-0 flex items-center justify-center"
              style="width: 44px; height: 44px; min-width: 44px; max-width: 44px; min-height: 44px; max-height: 44px;"
            >
              <img 
                src="/images/logo-cropped.png" 
                alt="لوجو مطعم أبو سمرة" 
                width="44"
                height="44"
                class="rounded-[12px] object-contain" 
                style="width: 100%; height: 100%; max-width: 44px; max-height: 44px; display: block;"
              />
            </div>
            <div>
              <span class="block text-lg font-black text-slate-900 dark:text-white font-cairo">مطعم أبو سمرة</span>
              <span class="text-xs text-brand-600 dark:text-brand-400 font-bold">الشاورما والمشويات السورية</span>
            </div>
          </div>

          <button 
            @click="mobileDrawerOpen = false"
            class="p-2 rounded-xl text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-dark-surface transition"
            aria-label="إغلاق القائمة"
          >
            <X class="w-5 h-5" />
          </button>
        </div>

        <!-- Drawer Links List -->
        <div class="flex-1 overflow-y-auto p-4 space-y-1.5">
          <button
            v-for="link in navLinks"
            :key="link.name"
            @click="scrollToSection(link.href)"
            class="w-full flex items-center justify-between p-3.5 rounded-2xl text-sm font-bold text-slate-800 dark:text-slate-100 hover:bg-orange-50 dark:hover:bg-dark-surface transition group text-right"
          >
            <div class="flex items-center gap-3">
              <div class="w-8 h-8 rounded-xl bg-orange-100/70 dark:bg-dark-surface text-brand-600 dark:text-brand-400 flex items-center justify-center group-hover:bg-brand-600 group-hover:text-white transition">
                <component :is="link.icon" class="w-4 h-4" />
              </div>
              <span>{{ link.name }}</span>
            </div>

            <div class="flex items-center gap-2">
              <span 
                v-if="link.badge"
                class="px-2 py-0.5 text-[10px] font-black rounded-full bg-red-500 text-white"
              >
                {{ link.badge }}
              </span>
              <ChevronLeft class="w-4 h-4 text-slate-400 group-hover:-translate-x-1 transition-transform" />
            </div>
          </button>
        </div>

        <!-- Drawer Footer Contact Actions -->
        <div class="p-5 border-t border-slate-100 dark:border-dark-border bg-slate-50/70 dark:bg-dark-surface/50 space-y-3">
          
          <!-- Direct Phone Call with Correct LTR Bidi -->
          <a
            :href="`tel:${restaurantInfo.phones.orders}`"
            class="flex items-center justify-between px-4 py-3 rounded-2xl bg-orange-100 dark:bg-brand-950/70 border border-orange-200 dark:border-brand-800/40 text-brand-700 dark:text-brand-300 font-bold text-xs shadow-sm"
          >
            <div class="flex items-center gap-2">
              <Phone class="w-4 h-4 text-brand-600" />
              <span>اتصل للطلب:</span>
            </div>
            <bdi dir="ltr" class="font-outfit text-sm font-black">{{ restaurantInfo.phones.ordersDisplay }}</bdi>
          </a>

          <!-- WhatsApp Chat Link -->
          <a
            :href="restaurantInfo.phones.whatsappLink"
            target="_blank"
            class="flex items-center justify-between px-4 py-3 rounded-2xl bg-emerald-600 text-white font-bold text-xs shadow-md shadow-emerald-600/20"
          >
            <div class="flex items-center gap-2">
              <MessageCircle class="w-4 h-4" />
              <span>واتساب المطعم:</span>
            </div>
            <bdi dir="ltr" class="font-outfit text-sm font-black">{{ restaurantInfo.phones.whatsappDisplay }}</bdi>
          </a>

          <!-- Working Hours & Location Hint -->
          <div class="pt-2 text-[11px] text-slate-500 dark:text-slate-400 space-y-1">
            <p class="flex items-center gap-1.5 font-medium">
              <Clock class="w-3 h-3 text-amber-500 shrink-0" />
              <span>{{ restaurantInfo.workingHours.ar }}</span>
            </p>
            <p class="flex items-center gap-1.5 font-medium">
              <MapPin class="w-3 h-3 text-brand-500 shrink-0" />
              <span>{{ restaurantInfo.location.shortAr }}</span>
            </p>
          </div>
        </div>

      </aside>
    </teleport>

  </header>
</template>
