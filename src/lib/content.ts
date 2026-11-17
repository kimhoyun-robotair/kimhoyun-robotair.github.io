import { getCollection, render } from 'astro:content';

export async function getProjects() {
  return (await getCollection('projects', ({ data }) => !data.draft))
    .sort((a, b) => b.data.year - a.data.year || a.data.order - b.data.order || a.data.title.localeCompare(b.data.title));
}

export async function getNotes() {
  return (await getCollection('wiki', ({ data }) => !data.draft))
    .sort((a, b) => b.data.updated.valueOf() - a.data.updated.valueOf() || a.data.title.localeCompare(b.data.title));
}

// Read rendered links so backlinks ignore examples inside code blocks and support
// both [[wiki-links]] and ordinary Markdown links.
export async function getBacklinks(id: string) {
  const target = `/wiki/${id}/`;
  const notes = await getNotes();
  const results = await Promise.all(notes.filter((note) => note.id !== id).map(async (note) => {
    await render(note);
    const html = note.rendered?.html ?? '';
    const urls = [...html.matchAll(/href="([^"]+)"/g)].map((m) => m[1].split(/[?#]/)[0]);
    return urls.includes(target) ? note : null;
  }));
  return results.filter((note) => note !== null);
}

export const formatDate = (date: Date) => date.toISOString().slice(0, 10);
export const statusLabels = { seed: 'Seed', growing: 'In progress', evergreen: 'Reference' };
