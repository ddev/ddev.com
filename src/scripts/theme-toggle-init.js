// Check localStorage for theme preference, default to auto (system preference)
const savedTheme =
  typeof localStorage !== "undefined" ? localStorage.getItem("theme") : null

if (savedTheme === "dark") {
  document.documentElement.classList.add("dark")
  document.documentElement.setAttribute("data-theme", "dark")
} else if (savedTheme === "light") {
  document.documentElement.classList.remove("dark")
  document.documentElement.setAttribute("data-theme", "light")
} else {
  // Auto mode: use system preference
  if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
    document.documentElement.classList.add("dark")
    document.documentElement.setAttribute("data-theme", "dark")
  } else {
    document.documentElement.classList.remove("dark")
    document.documentElement.setAttribute("data-theme", "light")
  }
}
