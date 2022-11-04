/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        header: ['Concert One', 'monospace'],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};