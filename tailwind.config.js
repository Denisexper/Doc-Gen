/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        brand: {
          50:  '#f0f4ff',
          100: '#dce6ff',
          200: '#baceff',
          300: '#8aadff',
          400: '#5582ff',
          500: '#2d5be3',
          600: '#1e42c8',
          700: '#1833a2',
          800: '#1a2d84',
          900: '#1b2a69',
        },
      },
    },
  },
  plugins: [],
}
