class GiscusComments extends HTMLElement {
  constructor() {
    super()
    this.iframe = null
  }

  connectedCallback() {
    if (typeof window === "undefined") return
    if (this.querySelector("iframe.giscus-frame")) return

    // Helper function to get the theme based on dark class or system preference
    const getTheme = () => {
      const savedTheme =
        typeof localStorage !== "undefined"
          ? localStorage.getItem("theme")
          : null

      if (savedTheme === "dark") {
        return "dark_dimmed"
      } else if (savedTheme === "light") {
        return "light"
      } else {
        // Auto mode: check system preference
        return window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark_dimmed"
          : "light"
      }
    }

    const setTheme = () => {
      const theme = getTheme()

      const script = document.createElement("script")
      script.src = "https://giscus.app/client.js"
      script.setAttribute("data-repo", "ddev/giscus-comments")
      script.setAttribute("data-repo-id", "R_kgDON5ODtA")
      script.setAttribute("data-category", "ddev.com comments")
      script.setAttribute("data-category-id", "DIC_kwDON5ODtM4CnDbQ")
      script.setAttribute("data-mapping", "title")
      script.setAttribute("data-strict", "1")
      script.setAttribute("data-reactions-enabled", "0")
      script.setAttribute("data-emit-metadata", "0")
      script.setAttribute("data-input-position", "top")
      script.setAttribute("data-theme", theme)
      script.setAttribute("data-lang", "en")
      script.setAttribute("data-loading", "lazy")
      script.crossOrigin = "anonymous"
      script.async = true

      this.innerHTML = ""
      this.appendChild(script)

      script.onload = () => {
        // Store iframe reference once script has loaded
        this.iframe = this.querySelector("iframe.giscus-frame")
        this.updateTheme(theme)
      }
    }

    // Initial theme setup
    setTheme()

    // Listen for changes to the dark class on html element
    const observer = new MutationObserver(() => {
      const newTheme = getTheme()
      this.updateTheme(newTheme)
    })

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    })

    // Also listen for system theme changes when in auto mode
    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", () => {
        const savedTheme = localStorage.getItem("theme")
        // Only update if in auto mode
        if (!savedTheme) {
          const newTheme = getTheme()
          this.updateTheme(newTheme)
        }
      })
  }

  updateTheme(theme) {
    if (!this.iframe || !this.iframe.contentWindow) return

    // Post the theme update message to the iframe content window
    this.iframe.contentWindow.postMessage(
      { giscus: { setConfig: { theme } } },
      "https://giscus.app"
    )
  }
}

customElements.define("giscus-comments", GiscusComments)
