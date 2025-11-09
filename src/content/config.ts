import { defineCollection, z } from 'astro:content'

const blog = defineCollection({
	// Type-check frontmatter using a schema
	schema: z.object({
		title: z.string(),
		description: z.string(),
		pubDate: z.date(),
		updatedpubDate: z.date().optional(),
		coverImageCredit: z.string().optional(),
	}),
})

export const collections = { blog }
