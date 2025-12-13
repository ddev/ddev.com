// src/scripts/copyCode.js

document.addEventListener("DOMContentLoaded", () => {
  const copyButtons = document.querySelectorAll("button.copy")

  copyButtons.forEach((button) => {
    button.addEventListener("click", async () => {
      // The transformer places the button inside a <pre> element
      const pre = button.closest("pre")
      const code = pre?.querySelector("code")

      if (code) {
        // Use the modern Clipboard API
        await navigator.clipboard.writeText(code.innerText)

        // Provide visual feedback
        button.classList.add("copied")
        button.ariaLabel = "Copied!"

        setTimeout(() => {
          button.classList.remove("copied")
          button.ariaLabel = "Copy code to clipboard"
        }, 2000) // Matches the default 2000ms toggle time
      }
    })
  })
})
