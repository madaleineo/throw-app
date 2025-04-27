/** @type {import('tailwindcss').Config} */
export default {
  content: ['./app/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'burnt-orange': '#DDC3AA',
        'pale-yellow': '#FAF6EA',
        'deep-green': '#717955',
        // 'deep-green': '#868866',
        'hover-orange': '#ebdbcc',
        'hover-yellow': '#f5edd5',
        'hover-green': '#92956f',
        'mid-yellow': '#f0e4c0',
        'plurple': '#5046e5',
        'hover-plurple': '#6460ea'
      },
      width: {
        'nine': '90%',
        'eighty': '80%',
        'seventy': '70%',
        'sixty': '60%',
        'fifty': '50%',
        'forty': '40%',
        'thirty': '30%',
        'twenty': '20%',
        'ten': '10%',
      }
    }
  },
  plugins: []
}
