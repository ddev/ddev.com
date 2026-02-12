import path from "path"
import { visit } from "unist-util-visit"

/**
 * Rewrites absolute /img/... paths in markdown image nodes to relative paths
 * pointing at public/img/..., so Astro's native remark-collect-images pipeline
 * picks them up for optimization.
 */
export function remarkPublicImages() {
  return (tree, file) => {
    visit(tree, "image", (node) => {
      if (node.url && node.url.startsWith("/img/")) {
        const publicImagePath = path.join(file.cwd, "public", node.url)
        const fileDir = path.dirname(file.path)
        node.url = path.relative(fileDir, publicImagePath)
      }
    })
  }
}
