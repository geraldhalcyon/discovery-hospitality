const defaultTheme = require("tailwindcss/defaultTheme");
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./layout/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "var(--primary)",
        primary1: "var(--primary1)",
        secondary: "var(--secondary)",
        secondary1: "var(--secondary1)",
        secondary2: "var(--secondary2)",
        secondary3: "var(--secondary3)",
        dropdownBorder: "var(--dropdownBorder)",
      },
      fontFamily: {},
    },
    screens: {
      xxs: "380px",
      "2sm": "426px",
      xs: "480px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1200px",
      xxl: "1440px",
    },
  },
};
