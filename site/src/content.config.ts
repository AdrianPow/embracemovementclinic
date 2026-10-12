import { defineCollection, reference } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Each service is one Markdown file in src/content/services. The file name is the URL,
// e.g. physiotherapy.md is served at /physiotherapy.
// Optional fields render as a visible TODO on the service page until they're filled in.
const services = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/services' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      order: z.number(),
      /** One or two sentences for cards and the services menu. */
      summary: z.string(),
      image: image().optional(),
      /** Which photo is intended, until it's supplied (see reference/images.json). */
      imageNote: z.string().optional(),
      seoTitle: z.string().optional(),
      seoDescription: z.string().optional(),
      whoFor: z.array(z.string()).optional(),
      conditions: z.array(z.string()).optional(),
      treatments: z.array(z.string()).optional(),
      details: z.array(z.string()).optional(),
      practitioners: z.array(reference('team')).optional(),
      /** The page's old Squarespace URL, if it changed (301 in public/_redirects). */
      oldUrl: z.string().optional(),
    }),
});

// Each practitioner is one Markdown file in src/content/team; the bio is the body.
const team = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/team' }),
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      order: z.number(),
      /** Must match the practitioner's AHPRA registration (see docs/to-supply.md). */
      titles: z.array(z.string()),
      postgradTraining: z.array(z.string()).default([]),
      /** Short status shown on cards, e.g. leave dates. */
      status: z.string().optional(),
      photo: image().optional(),
      photoNote: z.string().optional(),
    }),
});

export const collections = { services, team };
