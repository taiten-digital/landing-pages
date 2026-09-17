/**
 * Single source of truth for client slug generation. Used by both
 * scripts/create-client.mjs (Node) and any .astro/.ts code that needs to
 * derive or validate a slug.
 */
export function slugify(name) {
  return name
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '') // strip accents
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function isValidSlug(slug) {
  return /^[a-z0-9]+(-[a-z0-9]+)*$/.test(slug);
}
