/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          red: '#B91C1C', // approximate for footer/headers
          blue: '#1E40AF', // approximate for hero
        }
      }
    },
  },
  plugins: [],
}
