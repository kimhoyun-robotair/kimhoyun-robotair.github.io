import type { APIRoute } from 'astro';
import { getNotes, getProjects } from '../lib/content';
export const GET: APIRoute = async ({ site }) => {
  const [projects, notes] = await Promise.all([getProjects(), getNotes()]);
  const paths = ['/', '/research/', '/projects/', '/wiki/', ...projects.map((p) => `/projects/${p.id}/`), ...notes.map((n) => `/wiki/${n.id}/`)];
  return new Response(`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${paths.map((pathname) => `<url><loc>${new URL(pathname, site)}</loc></url>`).join('')}</urlset>`, { headers: { 'Content-Type': 'application/xml' } });
};
