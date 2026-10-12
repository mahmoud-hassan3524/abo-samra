import { ref } from 'vue'

// Global view state: 'home' | 'full-menu'
const currentView = ref('home')
const selectedMenuCategory = ref('all')

export function useNavigation() {
  const goToFullMenu = (category = 'all') => {
    selectedMenuCategory.value = category
    currentView.value = 'full-menu'
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const goToHome = () => {
    currentView.value = 'home'
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return {
    currentView,
    selectedMenuCategory,
    goToFullMenu,
    goToHome
  }
}
