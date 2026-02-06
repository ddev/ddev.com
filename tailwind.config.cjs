/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  darkMode: "class",
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
          650: "#027ba7",
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
        code: {
          light: "#818b981f",
          dark: "#2e3440ff",
        },
      },
      typography: {
        DEFAULT: {
          css: {
            // remove automatic quote marks from blockquotes
            "blockquote p:first-of-type::before": null,
            "blockquote p:last-of-type::after": null,
            // remove automatic backticks that surround inline code blocks
            "code::before": null,
            "code::after": null,
            // use modern CSS text-wrap for better typography (replaces deprecated rehype-widont)
            p: {
              textWrap: "pretty",
            },
            h1: {
              textWrap: "pretty",
            },
            h2: {
              textWrap: "pretty",
            },
            h3: {
              textWrap: "pretty",
            },
            h4: {
              textWrap: "pretty",
            },
            // Support markdown table alignment via align attributes
            'th[align="left"], td[align="left"]': {
              textAlign: "left",
            },
            'th[align="center"], td[align="center"]': {
              textAlign: "center",
            },
            'th[align="right"], td[align="right"]': {
              textAlign: "right",
            },
          },
          code: {},
        },
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    function ({ addBase, theme }) {
      addBase({
        // GitHub style for inline code blocks
        code: {
          padding: ".2em .4em",
          margin: "0",
          borderRadius: "6px",
          fontWeight: "500 !important",
          backgroundColor: theme("colors.code.light"),
        },
        ".dark code": {
          backgroundColor: theme("colors.code.dark"),
        },
      })
    },
  ],
}
