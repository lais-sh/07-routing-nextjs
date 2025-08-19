'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchNoteById } from '@/lib/api';

export default function NoteDetailsClient({ noteId }: { noteId: number }) {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['note', noteId],
    queryFn: () => fetchNoteById(noteId),
  });

  if (isLoading) return <p style={{ textAlign: 'center', marginTop: 40 }}>Loading…</p>;

  if (isError || !data) {
    return (
      <p style={{ color: 'crimson', textAlign: 'center', marginTop: 40 }}>
        Could not fetch note. {error instanceof Error ? error.message : ''}
      </p>
    );
  }

  return (
    <article style={{ maxWidth: 720, margin: '2rem auto', lineHeight: 1.6 }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ margin: 0 }}>{data.title}</h1>
        <span style={{ fontSize: 12, padding: '2px 8px', background: '#eef', borderRadius: 8 }}>{data.tag}</span>
      </header>
      <p style={{ marginTop: 12, whiteSpace: 'pre-wrap' }}>{data.content}</p>
      <footer style={{ marginTop: 24, fontSize: 12, color: '#666' }}>
        Created: {data.createdAt}
        {data.updatedAt ? ` • Updated: ${data.updatedAt}` : null}
      </footer>
    </article>
  );
}
