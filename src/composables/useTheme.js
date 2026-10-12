import { ref, onMounted } from 'vue'

const isDark = ref(false)

export function useTheme() {
  const toggleTheme = () => {
    isDark.value = !isDark.value
    applyTheme()
  }

  const applyTheme = () => {
    if (isDark.value) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('abu_samra_theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('abu_samra_theme', 'light')
    }
  }

  const initTheme = () => {
    const saved = localStorage.getItem('abu_samra_theme')
    if (saved) {
      isDark.value = saved === 'dark'
    } else {
      // Default to dark or light depending on system preference
      isDark.value = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
    }
    applyTheme()
  }

  return {
    isDark,
    toggleTheme,
    initTheme
  }
}
