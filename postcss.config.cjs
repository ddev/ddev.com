const tailwindcss = require("tailwindcss")

module.exports = {
  plugins: [
    require("postcss-import"),
    require("tailwindcss/nesting"),
    require("postcss-nested"),
    require("autoprefixer"),
  ],
}
