/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0a0a0f',
        secondary: '#1a1a2e',
        accent: '#00f5ff',
        accent2: '#7c3aed',
        accent3: '#f472b6',
      },
    },
  },
  plugins: [],
}
