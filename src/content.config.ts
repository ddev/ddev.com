import { defineCollection, z } from "astro:content"
import fs2 from "fs"
import { glob as oldglob } from "glob"
import { glob as contentGlob } from "astro/loaders"

const allowedCategories = [
  "Announcements",
  "Community",
  "DevOps",
  "Performance",
  "Guides",
  "TechNotes",
  "Training",
  "Videos",
]

/**
 * Quick and dirty method that returns full names of all existing authors.
 * @returns array of `name` values from author entry frontmatter
 */
const getAuthorNames = () => {
  const files = oldglob.sync(`./src/content/authors/*.md`)
  const authorNames = files.map((file) => {
    const contents = fs2.readFileSync(file, "utf-8")
    const result = contents.match(new RegExp("name: (.*)"))
    return result[1]
  })

  return authorNames
}

/**
 * Below we’re defining schemas for our Content Collections so their
 * frontmatter can be validated.
 *
 * Feature: https://docs.astro.build/en/guides/content-collections/
 * Validation library: https://zod.dev/
 */

const authorCollection = defineCollection({
  loader: contentGlob({
    pattern: "**/[^_]*.md",
    base: "./src/content/authors",
  }),
  schema: z.object({
    name: z.string(),
    firstName: z.string(),
    avatarUrl: z.string().optional(),
  }),
})

const blogCollection = defineCollection({
  loader: contentGlob({ pattern: "**/[^_]*.md", base: "./src/content/blog" }),
  schema: z.object({
    title: z.string(),
    summary: z.string().optional(),
    pubDate: z.date(),
    modifiedDate: z.date().optional(),
    modifiedComment: z.string().optional(),
    author: z.enum(getAuthorNames()),
    featureImage: z
      .object({
        src: z.string(),
        alt: z.nullable(z.string()),
        caption: z.nullable(z.string()).optional(),
        credit: z.nullable(z.string()).optional(),
        shadow: z.boolean().optional(),
        hide: z.boolean().optional(),
      })
      .optional(),
    categories: z.array(z.enum(allowedCategories)),
  }),
})

export const collections = {
  blog: blogCollection,
  authors: authorCollection,
}
