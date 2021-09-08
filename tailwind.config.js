const colors = require('tailwindcss/colors')

module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      transitionProperty: {
        m : 'margin'
      },
      boxShadow : {
        outer : '0 0 2px 0 rgba(0, 0, 0, 0.2)'
      }
    },
  },
  variants: {
    scale :({after}) => after(['active'])
  },
  plugins: [],
}
