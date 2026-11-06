// "What can we help with?" Groups the conditions the clinic already lists (on its
// service pages) into everyday needs, each pointing to the services that cover them.
// The values live in needs.json, which staff can edit on /admin ("What can we help with?").
// The grouping is new; the conditions are not. Changes are logged in docs/changes.md.
import type { IconName } from '../components/Icon.astro';
import data from './needs.json';

export interface Need {
  id: string;
  title: string;
  /** One-line label for the home page tiles. */
  short: string;
  icon: IconName;
  examples: string[];
  /** Service ids (file names in src/content/services), most relevant first. */
  services: string[];
}

// A group added on /admin may have no link name yet: make one from its title ("Pregnancy and after" → "pregnancy-and-after").
const slug = (text: string) =>
  text
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

export const needs = (data.needs as (Omit<Need, 'id'> & { id?: string })[]).map((n) => ({
  ...n,
  id: n.id?.trim() || slug(n.title),
  examples: n.examples ?? [],
  services: n.services ?? [],
})) as Need[];
