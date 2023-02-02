import { z, defineCollection } from 'astro:content'

// https://zod.dev/

const authorCollection = defineCollection({
  schema: z.object({
    name: z.string(),
    firstName: z.string(),
    avatarUrl: z.string(),
  })
});


// TODO: require author to be existing author entry
const blogCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    pubDate: z.date(),
    author: z.string(),
    featureImage: z.object({
      src: z.string(),
      alt: z.nullable(z.string()).optional(),
      caption: z.nullable(z.string()).optional(),
      credit: z.nullable(z.string()).optional(),
      shadow: z.boolean().optional(),
      hide: z.boolean().optional(),
    }).optional(),
    categories: z.array(z.enum(['Announcements', 'Community', 'DevOps', 'Performance', 'Guides', 'Videos'])),
  })
});

export const collections = {
  'blog': blogCollection,
  'authors': authorCollection
};
