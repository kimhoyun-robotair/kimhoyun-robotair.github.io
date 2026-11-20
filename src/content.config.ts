import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    subtitle: z.string(),
    description: z.string(),
    year: z.number(),
    order: z.number().default(0),
    undergraduate: z.boolean().default(false),
    membershipNote: z.string().optional(),
    highlight: z.string().optional(),
    tags: z.array(z.string()).default([]),
    cover: z.string(),
    coverAlt: z.string(),
    coverWidth: z.number().positive().default(960),
    coverHeight: z.number().positive().default(540),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
    authors: z.array(z.string()).default([]),
    affiliation: z.string().optional(),
    affiliationUrl: z.url().optional(),
    affiliationLogo: z.string().optional(),
    affiliationSuffix: z.string().optional(),
    venue: z.string().optional(),
    links: z.array(z.object({ label: z.string(), url: z.string() })).default([]),
    video: z.string().optional(),
    videoPoster: z.string().optional(),
    videoCaption: z.string().optional(),
    youtubeId: z.string().regex(/^[A-Za-z0-9_-]{11}$/).optional(),
    citation: z.string().optional(),
  }),
});

const wiki = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/wiki' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    topic: z.string(),
    tags: z.array(z.string()).default([]),
    updated: z.coerce.date(),
    status: z.enum(['seed', 'growing', 'evergreen']).default('seed'),
    draft: z.boolean().default(false),
    lang: z.enum(['ko', 'en']).default('en'),
  }),
});

export const collections = { projects, wiki };
