<script setup>
import { onMounted } from 'vue'
import Navbar from './components/Navbar.vue'
import Hero from './components/Hero.vue'
import OffersBanner from './components/OffersBanner.vue'
import BoxesSection from './components/BoxesSection.vue'
import MenuSection from './components/MenuSection.vue'
import AllMenuView from './components/AllMenuView.vue'
import FeaturesSection from './components/FeaturesSection.vue'
import BookingSection from './components/BookingSection.vue'
import ContactSection from './components/ContactSection.vue'
import Footer from './components/Footer.vue'
import CartDrawer from './components/CartDrawer.vue'
import FloatingActions from './components/FloatingActions.vue'
import { useTheme } from './composables/useTheme'
import { useNavigation } from './composables/useNavigation'

const { initTheme } = useTheme()
const { currentView } = useNavigation()

onMounted(() => {
  initTheme()
})
</script>

<template>
  <div class="min-h-screen bg-[#faf7f2] dark:bg-dark-bg text-slate-900 dark:text-slate-100 transition-colors duration-300">
    <!-- Main Sticky Navbar -->
    <Navbar />

    <!-- Main Content Area -->
    <main>
      <!-- View 1: Dedicated Full Menu Explorer (All 76 Items) -->
      <transition 
        mode="out-in"
        enter-active-class="transition duration-300 ease-out"
        enter-from-class="opacity-0 translate-y-2"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition duration-200 ease-in"
        leave-from-class="opacity-100 translate-y-0"
        leave-to-class="opacity-0 translate-y-2"
      >
        <div v-if="currentView === 'full-menu'" key="full-menu">
          <AllMenuView />
        </div>

        <!-- View 2: Landing Page View (Top 10 Featured Dishes + Sections) -->
        <div v-else key="home">
          <!-- Hero Section -->
          <Hero />

          <!-- Exclusive Offers Banner -->
          <OffersBanner />

          <!-- Signature Abu Samra Boxes Showcase -->
          <BoxesSection />

          <!-- Top 10 Featured Dishes with "View All" CTA -->
          <MenuSection />

          <!-- Why Choose Abu Samra Features -->
          <FeaturesSection />

          <!-- Party Catering & Birthday Booking Section -->
          <BookingSection />

          <!-- Location, Hotlines, & Working Hours -->
          <ContactSection />
        </div>
      </transition>
    </main>

    <!-- Footer -->
    <Footer />

    <!-- Slide-over Cart & Ordering Drawer -->
    <CartDrawer />

    <!-- Floating Quick Actions (WhatsApp, Phone, Floating Cart) -->
    <FloatingActions />
  </div>
</template>
