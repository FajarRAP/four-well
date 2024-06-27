/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js}",
    "./pages/**/*.{html,js}",
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
        novaSquare: ['Nova Square', 'cursive'],
      },
    },

  },
  plugins: [
    require('tw-bootstrap-grid-optimizer'),
  ],

}

