import { defineCollection, z } from 'astro:content';
import { file, glob } from 'astro/loaders';

// Every guidance page is forced to declare where its content came from and
// when the law was last checked. If a page is missing either, the build fails.
const guides = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/guides' }),
  schema: z.object({
    title: z.string(),
    // Used in <meta name="description"> and in listings.
    summary: z.string().max(200),
    // Where this page sits in the RTM sequence. 0 = not part of the sequence.
    step: z.number().int().min(0).default(0),
    order: z.number().int(),
    lawStatedAt: z.coerce.date(),
    reviewedBy: z.string().optional(),
    sources: z
      .array(
        z.object({
          title: z.string(),
          url: z.string().url(),
          // 'ogl' triggers the Open Government Licence attribution line.
          licence: z.enum(['ogl-v3', 'legislation', 'other']).default('other'),
          note: z.string().optional(),
        })
      )
      .min(1, 'Every guidance page needs at least one source.'),
    draft: z.boolean().default(false),
  }),
});

// Law tracker entries, edited in src/content/law-tracker.yaml. The build fails
// if an entry is missing a field or uses an unknown status.
const lawTracker = defineCollection({
  loader: file('./src/content/law-tracker.yaml'),
  schema: z.object({
    date: z.coerce.date(),
    dateLabel: z.string().optional(),
    status: z.enum(['in-force', 'passed', 'proposed']),
    title: z.string(),
    summary: z.string(),
    points: z.array(z.string()).optional(),
    rtm: z.string().optional(),
    inForce: z.array(z.object({ title: z.string(), date: z.string() })).optional(),
    waiting: z.array(z.object({ title: z.string(), when: z.string() })).optional(),
    source: z.object({ title: z.string(), url: z.string().url() }),
  }),
});

export const collections = { guides, lawTracker };
