/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: '#080C15',
          navy: '#0F172A',
          surface: '#141E33',
          card: '#16223B',
          sky: {
            light: '#7dd3fc',
            DEFAULT: '#38bdf8',
            dark: '#0284c7',
          },
          cyan: {
            light: '#67e8f9',
            DEFAULT: '#22d3ee',
            dark: '#0891b2',
          },
          mint: {
            light: '#5eead4',
            DEFAULT: '#2dd4bf',
            dark: '#0d9488',
          },
          emerald: {
            light: '#6ee7b7',
            DEFAULT: '#34d399',
            dark: '#059669',
          }
        }
      },
      backgroundImage: {
        'brand-gradient': 'linear-gradient(135deg, #38bdf8 0%, #22d3ee 35%, #2dd4bf 70%, #34d399 100%)',
        'brand-gradient-hover': 'linear-gradient(135deg, #0284c7 0%, #06b6d4 35%, #0d9488 70%, #059669 100%)',
        'brand-gradient-subtle': 'linear-gradient(135deg, rgba(56,189,248,0.12) 0%, rgba(45,212,191,0.12) 100%)',
        'glow-radial': 'radial-gradient(circle at 50% 0%, rgba(56, 189, 248, 0.25) 0%, rgba(45, 212, 191, 0.15) 30%, transparent 70%)',
      },
      boxShadow: {
        'brand-glow': '0 0 35px -5px rgba(45, 212, 191, 0.35)',
        'brand-glow-lg': '0 0 60px -10px rgba(56, 189, 248, 0.4)',
        'card-dark': '0 10px 30px -10px rgba(0, 0, 0, 0.5), inset 0 1px 0 0 rgba(255, 255, 255, 0.08)',
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        serif: ['Playfair Display', 'Georgia', 'serif'],
      }
    },
  },
  plugins: [],
}
