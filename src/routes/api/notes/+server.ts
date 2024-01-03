import { json } from '@sveltejs/kit';
import type { Note } from '$lib/types';

async function getNotes() {
  let notes: Note[] = [];

  const paths = import.meta.glob('/src/notes/*.md', { eager: true });

  for (const path in paths) {
    const file = paths[path];

    if (file && typeof file === 'object' && 'metadata' in file) {
      const href = path.replace(/^\/src\/notes\//, "").replace(/\.[^/.]+$/, "");
      const note: Note = {
        href,
        ...(file.metadata as Omit<Note, 'href'>)
      };
      notes.push(note);
    }
  }

  notes = notes.sort(
    (first, second) =>
      new Date(second.date).getTime() - new Date(first.date).getTime()
  );

  return notes;
}

export async function GET() {
  const notes = await getNotes();
  return json(notes.filter((note: Note) => note.tags && note.tags.includes('home')));
}
