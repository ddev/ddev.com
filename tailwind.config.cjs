/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        blue: {
          50: "#73dafe",
          100: "#73dafe",
          200: "#50d1fd",
          300: "#2dc7fd",
          400: "#0abefd",
          500: "#02a8e2",
          600: "#0293c6",
          700: "#01698d",
          800: "#015471",
          900: "#013f55",
        },
        navy: {
          50: "#62b9ff",
          100: "#2da2ff",
          200: "#0089f8",
          300: "#006cc3",
          400: "#004f8f",
          500: "#00325a",
          600: "#002c4f",
          700: "#002544",
          800: "#001f38",
          900: "#00192d",
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
}
