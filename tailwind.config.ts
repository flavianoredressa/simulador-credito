import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#8EDB00",
          "50": "#F4FDE0",
          "100": "#E8FCC1",
          "200": "#D6F987",
          "300": "#C4F64D",
          "400": "#A8F019",
          "500": "#8EDB00",
          "600": "#76B800",
          "700": "#5E9400",
          "800": "#467000",
          "900": "#2E4C00",
        },
        secondary: {
          DEFAULT: "#50504F",
          "50": "#F7F7F7",
          "100": "#E8E8E8",
          "200": "#D1D1D0",
          "300": "#BABAB9",
          "400": "#A3A3A2",
          "500": "#8C8C8B",
          "600": "#757574",
          "700": "#5E5E5D",
          "800": "#50504F",
          "900": "#3A3A3A",
        },
      },
    },
  },
  plugins: [],
};
export default config;
