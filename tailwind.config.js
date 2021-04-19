import defaultTheme from 'tailwindcss/defaultTheme'

module.exports = {
  purge: ['.public/index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    screens: {
      xs: '340px',
      // => @media (min-width: 340px) { ... }
      ...defaultTheme.screens,
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
