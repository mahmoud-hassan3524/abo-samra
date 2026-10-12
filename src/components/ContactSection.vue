<script setup>
import { 
  Phone, 
  MessageCircle, 
  MapPin, 
  Clock, 
  ExternalLink, 
  QrCode,
  Share2,
  Navigation
} from 'lucide-vue-next'
import { restaurantInfo } from '../data/restaurantInfo'

const copyPhone = (phone) => {
  navigator.clipboard?.writeText(phone)
  alert(`تم نسخ الرقم: ${phone}`)
}
</script>

<template>
  <section id="contact" class="py-8 sm:py-12 relative">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <!-- Section Header -->
      <div class="text-center max-w-2xl mx-auto mb-6 sm:mb-8">
        <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-100 dark:bg-brand-950 text-brand-700 dark:text-brand-300 text-xs font-bold mb-3">
          <MapPin class="w-3.5 h-3.5 text-brand-600" />
          <span>تفضل بزيارتنا أو اطلب دليفري</span>
        </div>
        <h2 class="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">
          تواصل معنا & موقع الفرع
        </h2>
        <p class="text-sm text-slate-500 dark:text-slate-400 mt-2 font-medium">
          يسعدنا استقبالكم في صالتنا بالهرم أو تلبية طلبات التوصيل لمنزلك في أي وقت
        </p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        <!-- Contact Cards Column -->
        <div class="lg:col-span-6 space-y-4 text-right">
          
          <!-- Orders Hotlines -->
          <div class="p-6 rounded-3xl bg-white dark:bg-dark-card border border-slate-200 dark:border-dark-border shadow-sm space-y-4">
            <h3 class="text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
              <Phone class="w-5 h-5 text-brand-600" />
              <span>أرقام الطلبات والدليفري المباشرة</span>
            </h3>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <!-- Orders Call -->
              <div class="p-4 rounded-2xl bg-orange-50/70 dark:bg-dark-surface border border-orange-100 dark:border-dark-border flex flex-col justify-between">
                <div>
                  <span class="text-xs text-slate-500 dark:text-slate-400 font-bold block mb-1">
                    📞 اتصل هاتفياً للطلبات
                  </span>
                  <a 
                    :href="`tel:${restaurantInfo.phones.orders}`" 
                    class="text-lg font-black text-brand-600 hover:underline block font-outfit"
                  >
                    <bdi dir="ltr">{{ restaurantInfo.phones.ordersDisplay }}</bdi>
                  </a>
                </div>
                <div class="mt-3 flex gap-2">
                  <a 
                    :href="`tel:${restaurantInfo.phones.orders}`"
                    class="flex-1 py-1.5 text-center text-xs font-bold bg-brand-600 text-white rounded-lg hover:bg-brand-700 transition"
                  >
                    اتصال الآن
                  </a>
                  <button 
                    @click="copyPhone(restaurantInfo.phones.orders)"
                    class="px-2.5 py-1.5 text-xs text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-dark-border rounded-lg hover:bg-slate-100"
                    title="نسخ الرقم"
                  >
                    نسخ
                  </button>
                </div>
              </div>

              <!-- WhatsApp Hotline -->
              <div class="p-4 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900/40 flex flex-col justify-between">
                <div>
                  <span class="text-xs text-slate-500 dark:text-slate-400 font-bold block mb-1">
                    💬 واتساب مباشر
                  </span>
                  <a 
                    :href="restaurantInfo.phones.whatsappLink" 
                    target="_blank" 
                    class="text-lg font-black text-emerald-600 hover:underline block font-outfit"
                  >
                    <bdi dir="ltr">{{ restaurantInfo.phones.whatsappDisplay }}</bdi>
                  </a>
                </div>
                <div class="mt-3 flex gap-2">
                  <a 
                    :href="restaurantInfo.phones.whatsappLink"
                    target="_blank"
                    class="flex-1 py-1.5 text-center text-xs font-bold bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition"
                  >
                    محادثة واتساب
                  </a>
                  <button 
                    @click="copyPhone(restaurantInfo.phones.whatsapp)"
                    class="px-2.5 py-1.5 text-xs text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-dark-border rounded-lg hover:bg-slate-100"
                    title="نسخ الرقم"
                  >
                    نسخ
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Location & Working Hours -->
          <div class="p-6 rounded-3xl bg-white dark:bg-dark-card border border-slate-200 dark:border-dark-border shadow-sm space-y-4">
            <!-- Location Details -->
            <div class="flex items-start gap-3">
              <div class="w-10 h-10 rounded-xl bg-orange-100 dark:bg-brand-950/60 text-brand-600 flex items-center justify-center shrink-0">
                <MapPin class="w-5 h-5" />
              </div>
              <div class="flex-1">
                <h4 class="text-sm font-black text-slate-900 dark:text-white">عنوان المطعم:</h4>
                <p class="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1 leading-relaxed font-bold">
                  {{ restaurantInfo.location.ar }}
                </p>
                <a 
                  :href="restaurantInfo.location.mapsUrl" 
                  target="_blank"
                  class="inline-flex items-center gap-1 text-xs text-brand-600 dark:text-brand-400 hover:underline mt-2 font-bold"
                >
                  <Navigation class="w-3.5 h-3.5" />
                  <span>فتح الموقع في خرائط Google</span>
                </a>
              </div>
            </div>

            <hr class="border-slate-100 dark:border-dark-border" />

            <!-- Working Hours -->
            <div class="flex items-start gap-3">
              <div class="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-950/60 text-amber-600 flex items-center justify-center shrink-0">
                <Clock class="w-5 h-5" />
              </div>
              <div>
                <h4 class="text-sm font-black text-slate-900 dark:text-white">ساعات العمل:</h4>
                <p class="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1 font-bold">
                  {{ restaurantInfo.workingHours.ar }}
                </p>
                <span class="inline-block mt-1 text-[11px] text-emerald-600 font-bold bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded">
                  مفتوح طوال أيام الأسبوع
                </span>
              </div>
            </div>
          </div>

        </div>

        <!-- Visual Map & QR Code Column -->
        <div class="lg:col-span-6 flex flex-col justify-between">
          <div class="h-full rounded-3xl bg-white dark:bg-dark-card border border-slate-200 dark:border-dark-border p-6 shadow-sm flex flex-col justify-between text-right space-y-6">
            
            <div>
              <div class="flex items-center justify-between mb-4">
                <span class="px-3 py-1 rounded-full bg-brand-50 dark:bg-brand-950 text-brand-600 text-xs font-bold">
                  خريطة الفرع
                </span>
                <h3 class="text-base font-black text-slate-900 dark:text-white">
                  موقعنا بالهرم (شارع السيسي)
                </h3>
              </div>

              <!-- Interactive Simulated Map Card -->
              <div class="relative h-60 rounded-2xl overflow-hidden border border-slate-200 dark:border-dark-border group">
                <iframe 
                  title="موقع مطعم أبو سمرة على الخريطة"
                  width="100%" 
                  height="100%" 
                  style="border:0;" 
                  loading="lazy" 
                  allowfullscreen 
                  referrerpolicy="no-referrer-when-downgrade"
                  src="https://maps.google.com/maps?q=Al+Libini,+Haram,+Giza&t=&z=14&ie=UTF8&iwloc=&output=embed"
                  class="w-full h-full grayscale-[20%] contrast-125"
                ></iframe>
                <div class="absolute bottom-3 right-3 bg-white/95 dark:bg-dark-card/95 backdrop-blur-md p-3 rounded-xl border border-slate-200 dark:border-dark-border shadow-md">
                  <p class="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1">
                    <MapPin class="w-3.5 h-3.5 text-brand-600" />
                    أمام مركز شباب السيسي - اللبيني
                  </p>
                </div>
              </div>
            </div>

            <!-- Quick Action Links -->
            <div class="pt-2 flex flex-col sm:flex-row gap-3">
              <a 
                :href="restaurantInfo.location.mapsUrl" 
                target="_blank"
                class="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-slate-900 dark:bg-brand-600 text-white font-bold text-xs hover:bg-black transition"
              >
                <Navigation class="w-4 h-4" />
                <span>الاتجاهات عبر خرائط جوجل</span>
              </a>

              <a 
                :href="restaurantInfo.phones.whatsappLink"
                target="_blank"
                class="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition"
              >
                <MessageCircle class="w-4 h-4" />
                <span>إرسال الموقع على واتساب</span>
              </a>
            </div>

          </div>
        </div>

      </div>

    </div>
  </section>
</template>
