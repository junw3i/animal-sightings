/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        greyish: 'rgb(223, 223, 221)',
        orangey: '#5C33F6',
        purplish: '#B983FF',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
