/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'blueGray': {
          50: 'rgba(248, 250, 252, 1)',
          100: 'rgba(241, 245, 249, 1)',
          200: 'rgba(226, 232, 240, 1)',
          600: 'rgba(71, 85, 105, 1)',
          700: 'rgba(51, 65, 85, 1)',
          800: 'rgba(30, 41, 59, 1)',
        }
      }
    },
  },
  plugins: [],
}
