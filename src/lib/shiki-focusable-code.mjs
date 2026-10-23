/**
 * Moves Shiki's `tabindex` from `pre` to `code`, which is what scrolls once
 * global.css lets the copy button overflow the `pre`, so a keyboard can scroll
 * a long line into view.
 */
export function focusableCode() {
  return {
    name: "focusable-code",
    pre(node) {
      delete node.properties.tabindex
    },
    code(node) {
      node.properties.tabindex = "0"
    },
  }
}
