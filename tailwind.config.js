/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        odyssey: {
          void: '#030712',
          abyss: '#050B16',
          midnight: '#081426',
          depth: '#0B1930',
          trench: '#0E213D',
          navy: '#122D52',
          surface: '#153664',
        },
        forge: {
          navy: '#123C73',
          ocean: '#175A9C',
          azure: '#1E6FB5',
          cyan: '#4AA3DF',
          sky: '#70C7F5',
          light: '#BAE6FD',
        },
        bronze: {
          dark: '#8B6E3B',
          DEFAULT: '#C5A46D',
          light: '#D6B878',
          glow: '#F2D398',
        },
        paper: {
          50: '#F8FAFC',
          100: '#F2F5F8',
          200: '#E2E8F0',
          300: '#CBD5E1',
          400: '#94A3B8',
          500: '#718096',
          600: '#475569',
        }
      },
      fontFamily: {
        cinzel: ['Cinzel', 'serif'],
        cormorant: ['"Cormorant Garamond"', 'serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        screenplay: ['"Courier Prime"', 'Courier', 'monospace'],
      },
      boxShadow: {
        'glow-cyan': '0 0 25px -5px rgba(74, 163, 223, 0.35)',
        'glow-gold': '0 0 25px -5px rgba(197, 164, 109, 0.4)',
        'glow-navy': '0 0 35px -5px rgba(18, 60, 115, 0.5)',
        'glass-card': '0 8px 32px 0 rgba(3, 7, 18, 0.5)',
        'inner-glow': 'inset 0 1px 1px 0 rgba(112, 199, 245, 0.2)',
      },
      backgroundImage: {
        'radial-gradient-ocean': 'radial-gradient(circle at 50% 0%, rgba(30, 111, 181, 0.18), transparent 70%)',
        'radial-gradient-gold': 'radial-gradient(circle at 50% 50%, rgba(197, 164, 109, 0.12), transparent 70%)',
        'subtle-grid': 'linear-gradient(to right, rgba(74, 163, 223, 0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(74, 163, 223, 0.04) 1px, transparent 1px)',
      },
      animation: {
        'pulse-subtle': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float-slow': 'float 6s ease-in-out infinite',
        'compass-spin': 'spin 40s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        }
      }
    },
  },
  plugins: [],
}
