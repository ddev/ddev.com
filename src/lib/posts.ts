import { getCollection, type CollectionEntry } from "astro:content"

/**
 * Blog posts, newest first.
 */
export async function getOrderedPosts() {
  const posts = await getCollection("blog")

  return posts.sort((a, b) =>
    new Date(a.data.pubDate) > new Date(b.data.pubDate) ? -1 : 1
  )
}

/**
 * The neighbors of the given post: `prev` is the next-newer post, `next` the
 * next-older one.
 */
export async function getAdjacentPosts(id: string): Promise<{
  prev?: CollectionEntry<"blog">
  next?: CollectionEntry<"blog">
}> {
  const posts = await getOrderedPosts()
  const index = posts.findIndex((post) => post.id === id)

  if (index === -1) {
    return {}
  }

  return {
    prev: posts[index - 1],
    next: posts[index + 1],
  }
}

/**
 * Words that say nothing about what a post is about. DDEV's own vocabulary is
 * deliberately absent: inverse document frequency already discounts a term that
 * appears in nearly every post.
 */
const STOP_WORDS = new Set(
  `about after all also and any are because been before being but can did does
   doing done each even every for from get gets going had has have how into
   its just like make makes many may more most much need needs not now off
   one only other our out over own same see should some such than that the
   their them then there these they this those through too under until use
   used uses using very want was way well were what when where which while
   who why will with without you your`.split(/\s+/)
)

/**
 * The words of a piece of text, minus the parts of a markdown file that aren't
 * prose. Hyphens are dropped after tokenizing, so "add-on" and "addon" become
 * the same term — the same rule the site search uses (see lib/search-index.js).
 */
const tokenize = (text: string) =>
  (
    text
      .toLowerCase()
      .replace(/```[\s\S]*?```/g, " ")
      .replace(/`[^`]*`/g, " ")
      .replace(/!?\[([^\]]*)\]\([^)]*\)/g, " $1 ")
      .replace(/https?:\/\/\S+/g, " ")
      .replace(/<[^>]+>/g, " ")
      .match(/[a-z0-9]+(?:-[a-z0-9]+)*/g) ?? []
  )
    .map((token) => token.replace(/-/g, ""))
    .filter((token) => token.length > 2 && !STOP_WORDS.has(token))

/**
 * How often each term occurs in a post, counting the fields that describe it
 * best more heavily than its body.
 */
function termCounts(post: CollectionEntry<"blog">) {
  const counts = new Map<string, number>()

  const add = (text: string, weight: number) => {
    for (const term of tokenize(text)) {
      counts.set(term, (counts.get(term) ?? 0) + weight)
    }
  }

  add(post.data.title, 4)
  add(post.data.summary ?? "", 2)
  add(post.data.categories.join(" "), 3)
  add(post.body ?? "", 1)

  return counts
}

/**
 * A unit-length tf-idf vector per post, so two posts can be compared by the
 * cosine of the angle between them. Built once per build, not once per page.
 */
let vectors: Promise<Map<string, Map<string, number>>> | null = null

function getPostVectors() {
  return (vectors ??= (async () => {
    const posts = await getOrderedPosts()
    const counted = posts.map((post) => ({
      id: post.id,
      counts: termCounts(post),
    }))

    const documentFrequency = new Map<string, number>()
    for (const { counts } of counted) {
      for (const term of counts.keys()) {
        documentFrequency.set(term, (documentFrequency.get(term) ?? 0) + 1)
      }
    }

    const total = counted.length
    const result = new Map<string, Map<string, number>>()

    for (const { id, counts } of counted) {
      const vector = new Map<string, number>()
      let magnitude = 0

      for (const [term, count] of counts) {
        // A term every post uses scores 0 here and drops out.
        const idf = Math.log(total / documentFrequency.get(term)!)
        if (idf <= 0) continue

        const weight = (1 + Math.log(count)) * idf
        vector.set(term, weight)
        magnitude += weight * weight
      }

      magnitude = Math.sqrt(magnitude) || 1
      for (const [term, weight] of vector) {
        vector.set(term, weight / magnitude)
      }

      result.set(id, vector)
    }

    return result
  })())
}

const EMPTY_VECTOR: Map<string, number> = new Map()

/** Cosine similarity of two unit vectors, so just their dot product. */
function similarity(a: Map<string, number>, b: Map<string, number>) {
  const [smaller, larger] = a.size <= b.size ? [a, b] : [b, a]
  let total = 0

  for (const [term, weight] of smaller) {
    const other = larger.get(term)
    if (other) total += weight * other
  }

  return total
}

/**
 * Posts most like the given one, best match first. Ranked mostly on what the
 * posts say, with a shared category and a shared author as smaller nudges:
 * categories alone were too coarse, nine of them covering 140 posts.
 */
export async function getSimilarPosts(id: string, limit = 5) {
  const posts = await getOrderedPosts()
  const current = posts.find((post) => post.id === id)

  if (!current) {
    return []
  }

  const postVectors = await getPostVectors()
  const currentVector = postVectors.get(id) ?? EMPTY_VECTOR
  const categories = new Set(current.data.categories)

  // A newsletter is a digest of its month, so it has a word in common with
  // almost any post. Newsletters only compete for a slot with each other.
  const isNewsletter = (post: CollectionEntry<"blog">) =>
    post.data.categories.includes("Newsletters")

  const scored = posts
    .filter(
      (post) => post.id !== id && (isNewsletter(current) || !isNewsletter(post))
    )
    .map((post) => {
      const words = similarity(
        currentVector,
        postVectors.get(post.id) ?? EMPTY_VECTOR
      )
      const shared = post.data.categories.filter((category) =>
        categories.has(category)
      ).length
      const sameAuthor = post.data.author === current.data.author

      return { post, score: words * 2 + shared * 0.5 + (sameAuthor ? 0.1 : 0) }
    })
    .sort((a, b) => b.score - a.score)

  // Relative to the best match, so a post on a subject nothing else covers gets
  // two or three good matches instead of five weak ones. The floor keeps a post
  // with no real match from filling the list on the strength of one word.
  const best = scored[0]?.score ?? 0
  const cutoff = Math.max(0.15, best * 0.3)

  return scored
    .filter(({ score }) => score >= cutoff)
    .slice(0, limit)
    .map(({ post }) => post)
}
