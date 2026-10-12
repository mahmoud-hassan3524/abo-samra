<script setup>
import { ref } from 'vue'
import { 
  PartyPopper, 
  Calendar, 
  Users, 
  CheckCircle, 
  MessageCircle, 
  Sparkles, 
  PhoneCall,
  Clock
} from 'lucide-vue-next'
import confetti from 'canvas-confetti'
import { restaurantInfo } from '../data/restaurantInfo'

const eventType = ref('حفلة عيد ميلاد')
const guestCount = ref('20 - 40 فرد')
const eventDate = ref('')
const customerName = ref('')
const customerPhone = ref('')
const details = ref('')

const isSuccess = ref(false)
const bookingCode = ref('')

const eventOptions = [
  'حفلة عيد ميلاد',
  'عزومة ومناسبة عائلية',
  'وجبات شركات وغداء عمل',
  'بوفيه شاورما ومفتوح',
  'طلبات كبرى وبوكسات'
]

const guestOptions = [
  '10 - 20 فرد',
  '20 - 40 فرد',
  '40 - 70 فرد',
  '70 - 100 فرد',
  'أكثر من 100 فرد (بوفيه ضخم)'
]

const handleBooking = () => {
  if (!customerName.value || !customerPhone.value) {
    alert('يرجى كتابة الاسم ورقم الهاتف للتواصل وتأكيد الحجز')
    return
  }

  bookingCode.value = 'EVENT-' + Math.floor(1000 + Math.random() * 9000)
  isSuccess.value = true

  try {
    confetti({
      particleCount: 100,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#ea580c', '#f59e0b', '#22c55e']
    })
  } catch (e) {}
}

const sendWhatsAppBooking = () => {
  const msg = `*حجز وتجهيز مناسبة خاصة - مطعم أبو سمرة*\n` +
    `━━━━━━━━━━━━━━━━━━━━━\n` +
    `*نوع المناسبة:* ${eventType.value}\n` +
    `*عدد الأفراد:* ${guestCount.value}\n` +
    `*التاريخ المرغوب:* ${eventDate.value || 'يحدد لاحقاً'}\n` +
    `*الاسم:* ${customerName.value}\n` +
    `*رقم الهاتف:* ${customerPhone.value}\n` +
    `*ملاحظات إضافية:* ${details.value || 'لا يوجد'}\n` +
    `━━━━━━━━━━━━━━━━━━━━━\n` +
    `كود الطلب: ${bookingCode.value || 'جديد'}`

  window.open(`https://wa.me/201157707019?text=${encodeURIComponent(msg)}`, '_blank')
}
</script>

<template>
  <section id="catering" class="py-8 sm:py-12 bg-gradient-to-b from-orange-50/50 to-amber-50/30 dark:from-dark-surface/40 dark:to-dark-bg relative overflow-hidden">
    <!-- Glow elements -->
    <div class="absolute -top-20 -left-20 w-80 h-80 bg-brand-500/10 rounded-full blur-3xl pointer-events-none"></div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      
      <!-- Banner Card Container -->
      <div class="rounded-3xl bg-gradient-to-r from-brand-700 via-brand-600 to-orange-600 p-6 sm:p-8 text-white shadow-2xl relative overflow-hidden mb-6 sm:mb-8">
        <div class="absolute -right-10 -bottom-10 w-64 h-64 bg-white/10 rounded-full blur-xl pointer-events-none"></div>
        <div class="absolute top-4 left-4 opacity-15">
          <PartyPopper class="w-32 h-32" />
        </div>

        <div class="relative z-10 max-w-3xl text-right space-y-4">
          <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-amber-200 text-xs font-black">
            <Sparkles class="w-4 h-4" />
            <span>خدمة الضيافة وتجهيز الحفلات</span>
          </div>

          <h2 class="text-3xl sm:text-4xl font-black leading-tight">
            استعداد تام لتلبية كافة المناسبات والحفلات وأعياد الميلاد
          </h2>

          <p class="text-sm sm:text-base text-orange-100 font-medium leading-relaxed">
            نقدم أفضل أسعار العزومات والبوكسات العائلية والسيرفيس المتكامل للأفراح وأعياد الميلاد وتجمعات الشركات، مع ضمان أعلى درجات الجودة والسخونة والنظافة السورية المتقنة.
          </p>

          <div class="pt-2 flex flex-wrap gap-4 text-xs font-bold text-white/90">
            <span class="flex items-center gap-1.5 bg-black/20 px-3 py-1.5 rounded-lg">
              <CheckCircle class="w-4 h-4 text-amber-300" />
              خصومات مميزة للكميات الكبيرة
            </span>
            <span class="flex items-center gap-1.5 bg-black/20 px-3 py-1.5 rounded-lg">
              <CheckCircle class="w-4 h-4 text-amber-300" />
              تغليف حراري خاص يحافظ على السخونة
            </span>
            <span class="flex items-center gap-1.5 bg-black/20 px-3 py-1.5 rounded-lg">
              <CheckCircle class="w-4 h-4 text-amber-300" />
              توصيل مجدول في الموعد المحدد بدقة
            </span>
          </div>
        </div>
      </div>

      <!-- Booking Form & Info Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        <!-- Info Column -->
        <div class="lg:col-span-5 text-right space-y-6">
          <div class="p-6 rounded-3xl bg-white dark:bg-dark-card border border-slate-200 dark:border-dark-border shadow-sm space-y-4">
            <h3 class="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
              <PartyPopper class="w-5 h-5 text-brand-600" />
              <span>كيف تتم خدمة تجهيز الحفلات؟</span>
            </h3>

            <div class="space-y-3.5 text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-medium leading-relaxed">
              <div class="flex items-start gap-3">
                <span class="w-6 h-6 rounded-full bg-brand-100 dark:bg-brand-950 text-brand-600 font-black flex items-center justify-center shrink-0">1</span>
                <p>تحديد نوع المناسبة وعدد الضيوف وموعد التقديم المناسب لك.</p>
              </div>

              <div class="flex items-start gap-3">
                <span class="w-6 h-6 rounded-full bg-brand-100 dark:bg-brand-950 text-brand-600 font-black flex items-center justify-center shrink-0">2</span>
                <p>تنسيق قائمة الطعام المختارة (شاورما عربي، مكس بوكسات، فتات، صواني مشويات).</p>
              </div>

              <div class="flex items-start gap-3">
                <span class="w-6 h-6 rounded-full bg-brand-100 dark:bg-brand-950 text-brand-600 font-black flex items-center justify-center shrink-0">3</span>
                <p>تجهيز الطلب طازجاً في الصباح ووصوله ساخناً وجاهزاً للضيافة الفورية.</p>
              </div>
            </div>

            <div class="pt-4 border-t border-slate-100 dark:border-dark-border flex flex-col gap-2.5">
              <a 
                :href="restaurantInfo.phones.whatsappLink"
                target="_blank"
                class="flex items-center justify-center gap-2 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition"
              >
                <MessageCircle class="w-4 h-4" />
                <span>تحدث مباشرة مع مسؤول الحفلات</span>
              </a>
              <a 
                :href="`tel:${restaurantInfo.phones.orders}`"
                class="flex items-center justify-center gap-2 py-2.5 rounded-xl border border-slate-200 dark:border-dark-border text-slate-700 dark:text-slate-300 font-bold text-xs hover:bg-slate-50 dark:hover:bg-dark-surface transition"
              >
                <PhoneCall class="w-3.5 h-3.5 text-brand-600" />
                <span>اتصال مباشر: {{ restaurantInfo.phones.ordersDisplay }}</span>
              </a>
            </div>

          </div>
        </div>

        <!-- Form Column -->
        <div class="lg:col-span-7">
          <div class="p-6 sm:p-8 rounded-3xl bg-white dark:bg-dark-card border border-slate-200 dark:border-dark-border shadow-lg text-right">
            
            <!-- Success State -->
            <div v-if="isSuccess" class="py-10 text-center space-y-4">
              <div class="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle class="w-10 h-10" />
              </div>
              <h3 class="text-2xl font-black text-slate-900 dark:text-white">
                تم تسجيل طلب الحجز بنجاح!
              </h3>
              <p class="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-md mx-auto">
                شكراً لاختيارك مطعم أبو سمرة. كود طلبك: <span class="font-black text-brand-600">{{ bookingCode }}</span>. سيتواصل معك فريق الإدارة لتنسيق تفاصيل المنيو وتقديم أفضل عرض سعر.
              </p>

              <div class="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  @click="sendWhatsAppBooking"
                  class="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 text-white font-bold text-xs shadow-md"
                >
                  <MessageCircle class="w-4 h-4" />
                  <span>تأكيد الحجز عبر واتساب فوراً</span>
                </button>
                <button
                  @click="isSuccess = false"
                  class="text-xs text-brand-600 font-bold hover:underline"
                >
                  تسجيل حجز آخر
                </button>
              </div>
            </div>

            <!-- Form Inputs -->
            <form v-else @submit.prevent="handleBooking" class="space-y-4">
              <h3 class="text-lg font-black text-slate-900 dark:text-white mb-2">
                احجز بوفيه مناسبتك أو اطلب تسعيرة خاصة
              </h3>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label class="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    نوع المناسبة *
                  </label>
                  <select 
                    v-model="eventType"
                    class="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-dark-border bg-slate-50 dark:bg-dark-surface text-xs focus:ring-2 focus:ring-brand-500 font-bold"
                  >
                    <option v-for="opt in eventOptions" :key="opt" :value="opt">{{ opt }}</option>
                  </select>
                </div>

                <div>
                  <label class="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    عدد الأفراد المتوقع *
                  </label>
                  <select 
                    v-model="guestCount"
                    class="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-dark-border bg-slate-50 dark:bg-dark-surface text-xs focus:ring-2 focus:ring-brand-500 font-bold"
                  >
                    <option v-for="g in guestOptions" :key="g" :value="g">{{ g }}</option>
                  </select>
                </div>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label class="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    الاسم الكريم *
                  </label>
                  <input 
                    v-model="customerName"
                    type="text" 
                    required
                    placeholder="مثال: أحمد محمود"
                    class="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-dark-border bg-slate-50 dark:bg-dark-surface text-xs focus:ring-2 focus:ring-brand-500"
                  />
                </div>

                <div>
                  <label class="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    رقم الهاتف للتواصل *
                  </label>
                  <input 
                    v-model="customerPhone"
                    type="tel" 
                    required
                    placeholder="010xxxxxxxx"
                    class="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-dark-border bg-slate-50 dark:bg-dark-surface text-xs focus:ring-2 focus:ring-brand-500"
                  />
                </div>
              </div>

              <div>
                <label class="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  تاريخ المناسبة التقريبي
                </label>
                <input 
                  v-model="eventDate"
                  type="date"
                  class="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-dark-border bg-slate-50 dark:bg-dark-surface text-xs focus:ring-2 focus:ring-brand-500"
                />
              </div>

              <div>
                <label class="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  الوجبات المقترحة أو أي متطلبات إضافية
                </label>
                <textarea 
                  v-model="details"
                  rows="3"
                  placeholder="مثال: نريد بوكسات شاورما دجاج مع فتات كرسبي وتومية إضافية..."
                  class="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-dark-border bg-slate-50 dark:bg-dark-surface text-xs focus:ring-2 focus:ring-brand-500"
                ></textarea>
              </div>

              <button
                type="submit"
                class="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-2xl bg-brand-600 hover:bg-brand-700 active:scale-98 text-white font-black text-sm shadow-lg shadow-brand-500/25 transition duration-200"
              >
                <Sparkles class="w-4 h-4" />
                <span>إرسال طلب الحجز والتسعيرة</span>
              </button>
            </form>

          </div>
        </div>

      </div>

    </div>
  </section>
</template>
