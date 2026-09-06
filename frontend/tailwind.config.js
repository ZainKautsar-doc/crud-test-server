/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          blue: '#1B5E8F',
          'blue-dark': '#13456B',
          'blue-light': '#2A7BB5',
          yellow: '#FDB913',
          'yellow-light': '#FEF3C7',
          'yellow-dark': '#D99B08',
          dark: '#1F2937',
          gray: '#F9FAFB',
          border: '#1F2937',
        },
      },
      boxShadow: {
        'neo': '4px 4px 0px 0px #1F2937',
        'neo-sm': '2px 2px 0px 0px #1F2937',
        'neo-lg': '6px 6px 0px 0px #1F2937',
        'neo-yellow': '4px 4px 0px 0px #FDB913',
        'neo-blue': '4px 4px 0px 0px #1B5E8F',
      },
      fontFamily: {
        sans: ['Inter', 'Segoe UI', 'sans-serif'],
      },
      borderRadius: {
        DEFAULT: '0px',
      }
    },
  },
  plugins: [],
}
