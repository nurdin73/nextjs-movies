module.exports = {
  purge: [
    './pages/**/*.{js,ts,jsx,tsx}', 
    './components/**/*.{js,ts,jsx,tsx}'
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {
      inset: ['hover', 'focus'],
      backgroundBlendMode: ['hover', 'focus'],
      divideColor: ['group-hover'],
      mixBlendMode: ['hover', 'focus'],
      transform: ['group-hover'],
      translate: ['group-hover']
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
    require('@tailwindcss/aspect-ratio'),
    require('tailwind-scrollbar-hide')
  ],
}
