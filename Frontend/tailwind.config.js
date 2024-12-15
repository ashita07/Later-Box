/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        purple: {
          300: "#c3d6fa",
          500: "#3e38a7",
          600: "#353bb0",
        },
      },
    },
  },
  plugins: [],
};
