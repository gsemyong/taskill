import defaultTheme from "tailwindcss/defaultTheme";
import forms from "@tailwindcss/forms";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "var(--tg-theme-bg-color)",
        foreground: "var(--tg-theme-text-color)",
        hint: "var(--tg-theme-hint-color)",
        link: "var(--tg-theme-link-color)",
        primary: "var(--tg-theme-button-color)",
        "primary-foreground": "var(--tg-theme-button-text-color)",
        "secondary-background": "var(--tg-theme-secondary-bg-color)",
      },
      fontFamily: {
        sans: ["Bricolage Grotesque Variable", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [forms],
};
