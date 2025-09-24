/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        // Light theme base
        primary: '#fff1f2', // rose-50
        secondary: '#6b7280', // gray-500 for readable body text
        accent: '#FF5C77', // pink/rose light accent
      }
    },
  },
  plugins: [],
};
