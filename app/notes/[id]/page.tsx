import { notFound } from 'next/navigation';
import { fetchNoteById } from '@/lib/api';
import type { Note } from '@/types/note';

type Props = { params: { id: string } };

export default async function NoteDetailsPage({ params }: Props) {
  const id = params.id;                 // ← НЕ преобразуем в число
  if (!id || typeof id !== 'string') {
    notFound();
  }

  let note: Note | undefined;
  try {
    note = await fetchNoteById(id);     // ← ожидает string
  } catch {
    notFound();
  }

  if (!note) notFound();

  return (
    <article style={{ maxWidth: 720, margin: '2rem auto', lineHeight: 1.6 }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ margin: 0 }}>{note.title}</h1>
        <span style={{ padding: '4px 8px', borderRadius: 8, background: '#eef', fontSize: 12 }}>
          {note.tag}
        </span>
      </header>

      <p style={{ marginTop: 12, whiteSpace: 'pre-wrap' }}>{note.content}</p>

      <footer style={{ marginTop: 24, fontSize: 12, color: '#666' }}>
        Created: {note.createdAt}
        {note.updatedAt ? ` • Updated: ${note.updatedAt}` : null}
      </footer>
    </article>
  );
}
