// Renders mermaid code blocks client-side.
// Only loads the mermaid library if the page contains mermaid diagrams.
;(async () => {
  const codeBlocks = document.querySelectorAll("pre > code.language-mermaid")
  if (!codeBlocks.length) return

  const containers = []
  for (const code of codeBlocks) {
    const pre = code.parentElement
    const div = document.createElement("div")
    div.classList.add("mermaid")
    div.textContent = code.textContent
    pre.replaceWith(div)
    containers.push(div)
  }

  const { default: mermaid } = await import(
    "https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.esm.min.mjs"
  )

  const isDark =
    document.documentElement.classList.contains("dark") ||
    (!localStorage.getItem("theme") &&
      window.matchMedia("(prefers-color-scheme: dark)").matches)

  mermaid.initialize({
    startOnLoad: false,
    theme: isDark ? "dark" : "default",
  })

  await mermaid.run({ nodes: containers })
})()