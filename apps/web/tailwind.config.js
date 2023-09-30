import defaultTheme from "tailwindcss/defaultTheme";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Bricolage Grotesque Variable", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
};
