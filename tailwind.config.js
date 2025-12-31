/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: "#0F1115",    // Main background
          card: "#16191E",    // Card background
          border: "#262B33",  // Border lines
          accent: "#3B82F6",  // Blue buttons
        },
        hygiene: {
          green: "#10B981",   // Score 70-100
          amber: "#F59E0B",   // Score 40-69
          red: "#EF4444",     // Score 0-39
        }
      }
    },
  },
  plugins: [],
}