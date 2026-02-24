import { visit } from "unist-util-visit"

/**
 * Rehype plugin that wraps each <table> element in a <div class="table-wrapper">.
 *
 * This is needed for responsive horizontal scrolling. Setting `overflow-x: auto`
 * directly on a <table> element has no effect because tables are not block-level
 * containers. Setting `display: block` on the table fixes that but breaks the
 * table's natural full-width behaviour. A wrapper div avoids both problems:
 * the table stays as `display: table` (full width via Tailwind Typography prose
 * styles) and the wrapper provides the scroll container.
 *
 * The wrapper is styled in global.css via `.prose .table-wrapper`.
 */
export function rehypeWrapTables() {
  return (tree) => {
    visit(tree, "element", (node, index, parent) => {
      if (node.tagName !== "table" || !parent) return

      parent.children[index] = {
        type: "element",
        tagName: "div",
        properties: { className: ["table-wrapper"] },
        children: [node],
      }
    })
  }
}
