/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable global-require */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontSize: {
      xxs: "0.6rem",
      xs: "0.75rem",
      sm: "0.875rem",
      base: "1rem",
      lg: "1.125rem",
      xl: "1.25rem",
      "2xl": "1.5rem",
      "3xl": "1.875rem",
      "4xl": "2.25rem",
      "5xl": "3rem",
      "6xl": "4rem",
    },
    extend: {
      fontFamily: {
        sans: ['"Nunito"', "sans-serif", "Arial"],
      },
      colors: {
        primary: {
          DEFAULT: "#3d8f89",
          50: "#f3faf8",
          100: "#d8efeb",
          200: "#b0dfd8",
          300: "#81c7bf",
          400: "#57aaa3",
          500: "#3d8f89",
          600: "#2f726e",
          700: "#295c5a",
          800: "#244b49",
          900: "#223f3e",
        },
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp"), require("daisyui")],
};
