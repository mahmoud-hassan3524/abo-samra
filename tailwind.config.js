/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#fff7ed',
          100: '#ffedd5',
          200: '#fed7aa',
          300: '#fdba74',
          400: '#fb923c',
          500: '#f97316',
          600: '#ea580c', // Matches Abu Samra signature logo orange
          700: '#c2410c',
          800: '#9a3412',
          900: '#7c2d12',
          950: '#431407',
          accent: '#ff5400',
          gold: '#f59e0b',
          cream: '#fffaf5',
        },
        dark: {
          bg: '#0f1013',
          card: '#16181d',
          surface: '#1e2128',
          border: '#2a2e37',
          muted: '#94a3b8',
        }
      },
      fontFamily: {
        cairo: ['Cairo', 'sans-serif'],
        outfit: ['Outfit', 'sans-serif'],
      },
      boxShadow: {
        'glow': '0 0 25px -5px rgba(234, 88, 12, 0.3)',
        'glow-lg': '0 0 35px -5px rgba(234, 88, 12, 0.45)',
        'card': '0 10px 30px -10px rgba(0, 0, 0, 0.08)',
        'card-dark': '0 10px 30px -10px rgba(0, 0, 0, 0.5)',
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'pulse-subtle': 'pulseSubtle 2.5s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.85' },
        }
      }
    },
  },
  plugins: [],
}
