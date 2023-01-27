/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.tsx',
    './index.html'
  ],
  theme: {
    extend: {
      colors: {
        background: "#09090A",
        "google-blue": '#4285F4',
        "google-red": '#DB4437',
        "google-yellow": '#F4B400',
        "google-green": '#0F9D58'
      },
      gridTemplateRows:{
        7: 'repeat(7, minmax(0, 1fr))'
      }
    },
  },
  plugins: [],
}
