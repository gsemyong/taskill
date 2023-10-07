import defaultTheme from "tailwindcss/defaultTheme";
import forms from "@tailwindcss/forms";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "rgb(var(--tg-theme-bg-color))",
        foreground: "rgb(var(--tg-theme-text-color))",
        hint: "rgb(var(--tg-theme-hint-color))",
        link: "rgb(var(--tg-theme-link-color))",
        primary: "rgb(var(--tg-theme-button-color))",
        "primary-foreground": "rgb(var(--tg-theme-button-text-color))",
        "secondary-background": "rgb(var(--tg-theme-secondary-bg-color))",
      },
      fontFamily: {
        sans: ["Bricolage Grotesque Variable", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [forms],
};
