/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // ✅ this tells Tailwind where to look
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
