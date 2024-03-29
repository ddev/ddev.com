import { defineCollection, z} from 'astro:content'
import fs2 from "fs"
import Glob from 'glob'

const allowedCategories = ['Announcements', 'Community', 'DevOps', 'Performance', 'Guides', 'Videos']

/**
 * Quick and dirty method that returns full names of all existing authors.
 * @returns array of `name` values from author entry frontmatter
 */
// const getAuthorNames = () => {
//   const files = new Glob(`./src/content/authors/*.md`)
//   const authorNames = files.map((file) => {
//     const contents = fs2.readFileSync(file, "utf-8");
//     const result = contents.match(new RegExp("name: (.*)"))
//     return result[1];
//   })

//   return authorNames;
// }
// const getAuthorNames = () => {
//   const names = await getCollection('authors', ({ data }));
// }


/**
 * Below we’re defining schemas for our Content Collections so their
 * frontmatter can be validated.
 *
 * Feature: https://docs.astro.build/en/guides/content-collections/
 * Validation library: https://zod.dev/
 */

const authorCollection = defineCollection({
  schema: z.object({
    name: z.string(),
    firstName: z.string(),
    avatarUrl: z.string().optional(),
  })
});

const blogCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    summary: z.string().optional(),
    pubDate: z.date(),
    modifiedDate: z.date().optional(),
    modifiedComment: z.string().optional(),
    // author: z.enum(getAuthorNames()),
    author: z.string(),
    // author: z.array(reference('authors')),
    featureImage: z.object({
      src: z.string(),
      alt: z.nullable(z.string()),
      caption: z.nullable(z.string()).optional(),
      credit: z.nullable(z.string()).optional(),
      shadow: z.boolean().optional(),
      hide: z.boolean().optional(),
    }).optional(),
    categories: z.array(z.enum(allowedCategories)),
  })
});

export const collections = {
  'blog': blogCollection,
  'authors': authorCollection
};
