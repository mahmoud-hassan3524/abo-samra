<script setup>
import { 
  Phone, 
  MessageCircle, 
  MapPin, 
  Clock, 
  Heart, 
  ArrowUp,
  Instagram,
  Facebook
} from 'lucide-vue-next'
import { restaurantInfo } from '../data/restaurantInfo'

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const currentYear = new Date().getFullYear()
</script>

<template>
  <footer class="bg-slate-900 text-slate-300 pt-10 sm:pt-12 pb-8 border-t border-slate-800">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 pb-8 border-b border-slate-800 text-right">
        
        <!-- Col 1: Brand Info (5 cols) -->
        <div class="lg:col-span-5 space-y-4">
          <div class="flex items-center gap-3">
            <div class="w-12 h-12 rounded-xl overflow-hidden ring-2 ring-brand-500/50 shadow-lg shrink-0">
              <img src="/images/logo-cropped.png" alt="لوجو مطعم أبو سمرة" class="w-full h-full object-contain" />
            </div>
            <div>
              <h3 class="text-xl font-black text-white">
                مطعم <span class="text-brand-500">أبو سمرة</span>
              </h3>
              <p class="text-xs text-slate-400 font-medium">
                أصالة الشاورما والمشويات السورية
              </p>
            </div>
          </div>

          <p class="text-xs sm:text-sm text-slate-400 leading-relaxed font-medium max-w-sm">
            نقدم لكم ألذ ساندوتشات الشاورما السورية بالعيش الصاج والفرنسي، فتات غنية بالمذاق، مشويات طازجة على الفحم، وبوكسات عائلية تشبع كل الحبايب بأعلى جودة وأنضف خامات.
          </p>

          <div class="pt-2 flex items-center gap-3">
            <a 
              :href="restaurantInfo.phones.whatsappLink"
              target="_blank"
              class="w-9 h-9 rounded-xl bg-emerald-600/20 text-emerald-400 flex items-center justify-center hover:bg-emerald-600 hover:text-white transition"
              title="واتساب"
            >
              <MessageCircle class="w-4 h-4" />
            </a>
            <a 
              :href="`tel:${restaurantInfo.phones.orders}`"
              class="w-9 h-9 rounded-xl bg-brand-600/20 text-brand-400 flex items-center justify-center hover:bg-brand-600 hover:text-white transition"
              title="اتصال مباشر"
            >
              <Phone class="w-4 h-4" />
            </a>
          </div>
        </div>

        <!-- Col 2: Fast Navigation (3 cols) -->
        <div class="lg:col-span-3 space-y-3">
          <h4 class="text-sm font-black text-white border-r-2 border-brand-500 pr-2">
            روابط سريعة
          </h4>
          <ul class="space-y-2 text-xs font-bold text-slate-400">
            <li>
              <a href="#hero" class="hover:text-brand-400 transition block py-1">الرئيسية</a>
            </li>
            <li>
              <a href="#offers" class="hover:text-brand-400 transition block py-1">عروض التوفير الخاصة</a>
            </li>
            <li>
              <a href="#menu" class="hover:text-brand-400 transition block py-1">قائمة الطعام الكاملة</a>
            </li>
            <li>
              <a href="#boxes" class="hover:text-brand-400 transition block py-1">بوكسات أبو سمرة</a>
            </li>
            <li>
              <a href="#catering" class="hover:text-brand-400 transition block py-1">حفلات ومناسبات</a>
            </li>
            <li>
              <a href="#contact" class="hover:text-brand-400 transition block py-1">موقع الفرع وأرقامنا</a>
            </li>
          </ul>
        </div>

        <!-- Col 3: Contact & Hours (4 cols) -->
        <div class="lg:col-span-4 space-y-3">
          <h4 class="text-sm font-black text-white border-r-2 border-brand-500 pr-2">
            معلومات التواصل
          </h4>
          
          <div class="space-y-2.5 text-xs text-slate-400 font-medium">
            <div class="flex items-start gap-2">
              <MapPin class="w-4 h-4 text-brand-500 shrink-0 mt-0.5" />
              <span>{{ restaurantInfo.location.ar }}</span>
            </div>

            <div class="flex items-center gap-2">
              <Phone class="w-4 h-4 text-brand-500 shrink-0" />
              <span>هاتف الطلبات: <strong class="text-white font-outfit"><bdi dir="ltr">{{ restaurantInfo.phones.ordersDisplay }}</bdi></strong></span>
            </div>

            <div class="flex items-center gap-2">
              <MessageCircle class="w-4 h-4 text-emerald-400 shrink-0" />
              <span>واتساب: <strong class="text-white font-outfit"><bdi dir="ltr">{{ restaurantInfo.phones.whatsappDisplay }}</bdi></strong></span>
            </div>

            <div class="flex items-center gap-2">
              <Clock class="w-4 h-4 text-amber-400 shrink-0" />
              <span>{{ restaurantInfo.workingHours.ar }}</span>
            </div>
          </div>
        </div>

      </div>

      <!-- Bottom Bar -->
      <div class="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
        <p class="flex items-center gap-1">
          جميع الحقوق محفوظة &copy; {{ currentYear }} لمطعم <span class="text-white font-bold">أبو سمرة</span>. صُنع بكل فخر وشغف بالطعام السوري.
        </p>

        <button 
          @click="scrollToTop"
          class="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold transition"
        >
          <span>للأعلى</span>
          <ArrowUp class="w-3.5 h-3.5" />
        </button>
      </div>

    </div>
  </footer>
</template>
