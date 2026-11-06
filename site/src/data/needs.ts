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

export const needs = data.needs as Need[];
