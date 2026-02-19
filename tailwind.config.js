/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Manrope', 'ui-sans-serif', 'system-ui', 'sans-serif']
      },
      boxShadow: {
        soft: '0 10px 30px -15px rgba(15, 23, 42, 0.15)'
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: 0, transform: 'translateY(6px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' }
        }
      },
      animation: {
        fadeUp: 'fadeUp 420ms ease-out both'
      }
    }
  },
  plugins: []
};
