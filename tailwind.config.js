/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        sand: {
          50: '#fdfaf5',
          100: '#f9f1e3',
          200: '#f2e2c4',
          300: '#e8cfa0',
          400: '#d9b47a',
          500: '#c99a5a',
        },
        ocean: {
          50: '#f0f9ff',
          100: '#e0f4fe',
          200: '#b9e9fd',
          300: '#7cd8fb',
          400: '#38c1f6',
          500: '#0ea8e7',
          600: '#027abc',
          700: '#035d96',
          800: '#084e7b',
          900: '#0d4267',
        },
        palm: {
          50: '#f2fdf4',
          100: '#e0fae5',
          200: '#baf4cc',
          300: '#83eaa7',
          400: '#46d77b',
          500: '#1dbd5d',
          600: '#129a4a',
          700: '#11793e',
        },
        coral: {
          50: '#fff5f2',
          100: '#ffe8e1',
          200: '#ffd0c3',
          300: '#ffad96',
          400: '#ff7d58',
          500: '#f95a2f',
        },
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'serif'],
        body: ['"DM Sans"', 'sans-serif'],
        accent: ['"Playfair Display"', 'serif'],
      },
      animation: {
        'fade-up': 'fadeUp 0.7s ease forwards',
        'fade-in': 'fadeIn 0.6s ease forwards',
        'float': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
    },
  },
  plugins: [],
}

