import { visit } from "unist-util-visit"

/**
 * Remark plugin to transform directive nodes (:::tip, :::note, etc.) into styled callout boxes
 */
export function remarkCallouts() {
  const knownTypes = {
    note: {
      containerClass: "callout callout-note",
      icon: "ℹ️",
      title: "Note",
    },
    tip: {
      containerClass: "callout callout-tip",
      icon: "💡",
      title: "Tip",
    },
    warning: {
      containerClass: "callout callout-warning",
      icon: "⚠️",
      title: "Warning",
    },
    danger: {
      containerClass: "callout callout-danger",
      icon: "🚨",
      title: "Danger",
    },
    info: {
      containerClass: "callout callout-info",
      icon: "ℹ️",
      title: "Info",
    },
  }

  return (tree) => {
    visit(tree, (node, index, parent) => {
      if (
        node.type === "containerDirective" ||
        node.type === "leafDirective" ||
        node.type === "textDirective"
      ) {
        const style = knownTypes[node.name]

        // Restore text/leaf directives that remark-directive parsed from
        // normal content (e.g. `:00` from `[0:00](url)`, `::after` in CSS discussion)
        if (node.type === "textDirective" || node.type === "leafDirective") {
          const prefix = node.type === "textDirective" ? ":" : "::"
          node.type = "text"
          node.value = `${prefix}${node.name}`
          delete node.data
          delete node.name
          delete node.attributes
          delete node.children
          return
        }

        if (!style) return

        const data = node.data || (node.data = {})

        // remark-directive puts the `[Title]` of `:::tip[Title]` in a first
        // paragraph marked as the directive label
        const labelNode = node.children[0]?.data?.directiveLabel
          ? node.children.shift()
          : undefined
        const title = labelNode?.children ?? [
          { type: "text", value: node.attributes?.label || style.title },
        ]

        // Transform to HTML
        data.hName = "div"
        data.hProperties = {
          class: style.containerClass,
        }

        node.children.unshift({
          type: "paragraph",
          data: {
            hName: "div",
            hProperties: { class: "callout-title" },
          },
          children: [{ type: "text", value: `${style.icon} ` }, ...title],
        })
      }
    })
  }
}
