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
          700: "#6a5dd9",
        },
        grey: {
          200: "#fafcfc",
          100: "##ffffff",
          400: "#dedede",
          500: "#9d9ea3",
          700: "#222c38",
        },
      },
    },
  },
  plugins: [],
};
