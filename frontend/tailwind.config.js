/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  prefix: "tw-",

  theme: {
    extend: {
      colors: {
        white: "var(--color-white)",
        black: "var(--mentalyc-black)",

        gray: {
          50: "var(--color-gray-50)",
          200: "var(--color-gray-200)",
          300: "var(--color-gray-300)",
          400: "var(--color-gray-400)",
          500: "var(--color-gray-500)",
          600: "var(--color-gray-600)",
          mentalyc: "var(--mentalyc-gray)"
        },
        primary: {
          400: "var(--color-primary-400)",
          500: "var(--color-primary-500)"
        },
        secondary: {
          100: "var(--color-secondary-100)"
        },
        danger: {
          500: "#F3404F",
          200: "#F8CDD9",
          300: "#FFEDEE",
          100: "#FFE1E4",
          400: "#FEA3AB"
        },
        warning: {
          100: "#fdf4c8",
          200: "#fef5f7"
        },
        success: {
          500: "#20A961",
          200: "#79DCA1",
          100: "#D5F6DE"
        },
        transparent: "transparent"
      },
      boxShadow: {
        dropdown:
          "0px 16px 48px 0px rgba(0, 0, 0, 0.10), 0px 8px 24px 0px rgba(0, 0, 0, 0.10), 0px 1px 0px 0px rgba(0, 0, 0, 0.10)",
        alert: "4px 4px 24px 0px rgba(0, 0, 0, 0.24)"
      }
    }
  },
  plugins: []
};
