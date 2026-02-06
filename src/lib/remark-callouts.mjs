import { visit } from "unist-util-visit"

/**
 * Remark plugin to transform directive nodes (:::tip, :::note, etc.) into styled callout boxes
 */
export function remarkCallouts() {
  return (tree) => {
    visit(tree, (node) => {
      if (
        node.type === "containerDirective" ||
        node.type === "leafDirective" ||
        node.type === "textDirective"
      ) {
        const data = node.data || (node.data = {})
        const hast = data.hDirectiveLabel || {}
        const type = node.name

        // Map directive types to styles
        const styles = {
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

        const style = styles[type] || styles.note

        // Get the label from attributes or use default
        const label =
          node.attributes?.label || hast.children?.[0]?.value || style.title

        // Transform to HTML
        data.hName = "div"
        data.hProperties = {
          class: style.containerClass,
        }

        // Add title if label exists
        if (label) {
          node.children.unshift({
            type: "paragraph",
            data: {
              hName: "div",
              hProperties: { class: "callout-title" },
            },
            children: [
              {
                type: "text",
                value: `${style.icon} ${label}`,
              },
            ],
          })
        }
      }
    })
  }
}
