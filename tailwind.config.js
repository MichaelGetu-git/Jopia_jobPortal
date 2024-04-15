/** @type {import('tailwindcss').Config} */
export default {
  content: [ "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",],
  theme: {
    extend: {
      colors: {
        "priority" : "#141414",
        "blue" : "#3575E2",
        "moto" : "#26A4FF",
        "bar" : "#F8F8FD"
      },
      fontFamily: {
        barrio: ['Barrio', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

