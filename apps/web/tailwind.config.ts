import { withUt } from "uploadthing/tw";
import type { Config } from "tailwindcss";
import radixThemePlugin from "radix-ui-themes-with-tailwind";

export default withUt({
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {},
  plugins: [
    radixThemePlugin({
      useTailwindColorNames: true,
      useTailwindRadiusNames: true,
      mapMissingTailwindColors: true,
    }),
  ],
}) satisfies Config;
