import { defineCollection, reference } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// A labelled point, e.g. a condition or a treatment, with an optional explanation.
const item = z.object({
  name: z.string(),
  detail: z.string().optional(),
});

// Each service is one Markdown file in src/content/services. The file name is the URL
// (physiotherapy.md is /physiotherapy). The Markdown body is an optional "About" section.
// Clinical wording changes must be logged in docs/changes.md.
const services = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/services' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      /** Shorter name for tight spaces (menus, chips). */
      shortTitle: z.string().optional(),
      order: z.number(),
      /** One-on-one appointments, or small-group classes. */
      kind: z.enum(['appointment', 'class']),
      /** One or two sentences for cards. */
      summary: z.string(),
      /** Opening line under the page title. */
      lede: z.string(),
      forYou: z.object({
        heading: z.string(),
        intro: z.string().optional(),
        items: z.array(item),
      }),
      expect: z.object({
        /** Kept verbatim where it's consent or examination wording. */
        text: z.string().optional(),
        steps: z.array(item).optional(),
      }),
      treatments: z
        .object({
          heading: z.string().default('Treatment may include'),
          items: z.array(item),
        })
        .optional(),
      goodToKnow: z.array(item).default([]),
      practitioners: z.array(reference('team')),
      practitionersNote: z.string().optional(),
      related: z.array(reference('services')).default([]),
      /** Photo in src/assets/photos, used on the page, its card and when the page is shared. */
      image: image().optional(),
      /** Describes the photo for screen readers and when the page is shared. */
      imageAlt: z.string().optional(),
      /** Which part to keep when the photo is cropped (CSS object-position), e.g. "50% 30%". */
      imagePosition: z.string().optional(),
      /** Which photo is intended, until it's supplied (see reference/images.json). */
      imageNote: z.string().optional(),
      seoTitle: z.string(),
      seoDescription: z.string(),
      /** Old Squarespace URL if it changed (301 in public/_redirects). */
      oldUrl: z.string().optional(),
    }),
});

// Each practitioner is one Markdown file in src/content/team; the bio is the body.
const team = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/team' }),
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      firstName: z.string(),
      order: z.number(),
      /** Must match the practitioner's AHPRA registration (see docs/to-supply.md). */
      titles: z.array(z.string()),
      education: z.array(z.string()).default([]),
      postgradTraining: z.array(z.string()).default([]),
      experience: z.array(z.string()).default([]),
      experienceHeading: z.string().default('Experience'),
      /** Short status shown on cards, e.g. leave dates. */
      status: z.string().optional(),
      photo: image().optional(),
      /** Which part to keep when the photo is cropped (CSS object-position). Top by default, so headshots keep the whole head. */
      photoPosition: z.string().default('50% 0%'),
      photoNote: z.string().optional(),
      seoDescription: z.string(),
    }),
});

// Clinic news. Dated posts; older ones carry an "archived" note.
const news = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/news' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      /** Shown as month and year only. */
      date: z.coerce.date(),
      summary: z.string(),
      archivedNote: z.string().optional(),
      /** Photos in src/assets/photos, each with a description and an optional crop position. */
      images: z.array(z.object({ src: image(), alt: z.string(), position: z.string().optional() })).default([]),
      /** Photos still to be supplied (shown as placeholders). */
      imageNotes: z.array(z.string()).default([]),
      oldUrl: z.string().optional(),
    }),
});

export const collections = { services, team, news };
