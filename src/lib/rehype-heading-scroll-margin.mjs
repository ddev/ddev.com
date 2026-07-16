import { visit } from "unist-util-visit"

/**
 * Rehype plugin that adds the `scroll-mt-5` Tailwind class to headings, so
 * anchor jumps leave a small gap above the heading instead of landing it
 * flush against the top of the viewport.
 *
 * This mirrors the `scroll-mt-5` set on the <SectionHeading> component, so
 * markdown-generated headings (blog posts) and component headings behave
 * the same way.
 */
export function rehypeHeadingScrollMargin({ tags = ["h2", "h3"] } = {}) {
  const headingTags = new Set(tags)

  return (tree) => {
    visit(tree, "element", (node) => {
      if (!headingTags.has(node.tagName)) return

      node.properties = node.properties || {}
      const className = node.properties.className
      const classes = Array.isArray(className)
        ? className
        : className
          ? [className]
          : []

      if (!classes.includes("scroll-mt-5")) {
        classes.push("scroll-mt-5")
      }
      node.properties.className = classes
    })
  }
}
