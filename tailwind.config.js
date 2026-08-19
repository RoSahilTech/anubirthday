/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        midnight: {
          900: '#070913',
          800: '#0D1127',
          700: '#141A38',
          600: '#1E2752',
        },
        rose: {
          400: '#F472B6',
          500: '#EC4899',
          600: '#E11D48',
        },
        lavender: {
          300: '#E9D5FF',
          400: '#C084FC',
          500: '#A855F7',
        },
        gold: {
          300: '#FDE68A',
          400: '#FBBF24',
          500: '#F59E0B',
        },
        // Version 2 Pastel Palette
        pastel: {
          bg: '#FFF7F8',
          card: '#FFFFFF',
          pink1: '#F8DDE3',
          pink2: '#F4C7D2',
          rose1: '#E9A8BA',
          rose2: '#D987A1',
          rose3: '#B96D87',
          text: '#3D3035',
          subtext: '#6E5860',
          accent: '#F9E5EA',
        }
      },
      fontFamily: {
        sans: ['Outfit', 'Inter', 'sans-serif'],
        serif: ['Cinzel', 'Playfair Display', 'serif'],
        handwriting: ['Caveat', 'Patrick Hand', 'cursive'],
        cute: ['Quicksand', 'Poppins', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'float-gentle': 'floatGentle 4s ease-in-out infinite',
        'glow': 'glow 3s ease-in-out infinite alternate',
        'twinkle': 'twinkle 3s ease-in-out infinite alternate',
        'spin-slow': 'spin 12s linear infinite',
        'bounce-soft': 'bounceSoft 2s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-12px) rotate(1deg)' },
        },
        floatGentle: {
          '0%, 100%': { transform: 'translateY(0px) rotate(-1deg)' },
          '50%': { transform: 'translateY(-8px) rotate(1deg)' },
        },
        bounceSoft: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        glow: {
          '0%': { filter: 'drop-shadow(0 0 12px rgba(244, 114, 182, 0.4))' },
          '100%': { filter: 'drop-shadow(0 0 24px rgba(192, 132, 252, 0.8))' },
        },
        twinkle: {
          '0%': { opacity: '0.3', transform: 'scale(0.8)' },
          '100%': { opacity: '1', transform: 'scale(1.2)' },
        }
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
        'rose-glow': '0 0 25px -5px rgba(244, 114, 182, 0.5)',
        'gold-glow': '0 0 25px -5px rgba(251, 191, 36, 0.5)',
        'v2-soft': '0 10px 30px -5px rgba(217, 135, 161, 0.25)',
        'v2-card': '0 14px 35px rgba(233, 168, 186, 0.3)',
      }
    },
  },
  plugins: [],
}
