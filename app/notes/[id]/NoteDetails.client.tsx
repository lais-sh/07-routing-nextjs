'use client';

import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { fetchNoteById } from '@/lib/api';
import type { Note } from '@/types/note';

type Props = {
  /** Можно передать id сверху; если не передан — возьмём из useParams */
  noteId?: string;
};

export default function NoteDetailsClient({ noteId }: Props) {
  const params = useParams<{ id: string }>();
  const id = noteId ?? params?.id;           // ← всегда string

  if (!id) return null;

  const { data, isLoading, isError, error } = useQuery<Note>({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),        // ← string
    refetchOnMount: false,
  });

  if (isLoading) return <p>Loading…</p>;
  if (isError || !data)
    return (
      <p style={{ color: 'red' }}>
        Failed to load note{error instanceof Error ? `: ${error.message}` : ''}
      </p>
    );

  return (
    <article style={{ maxWidth: 720, margin: '2rem auto', lineHeight: 1.6 }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ margin: 0 }}>{data.title}</h1>
        <span style={{ padding: '4px 8px', borderRadius: 8, background: '#eef', fontSize: 12 }}>
          {data.tag}
        </span>
      </header>

      <p style={{ marginTop: 12, whiteSpace: 'pre-wrap' }}>{data.content}</p>

      <footer style={{ marginTop: 24, fontSize: 12, color: '#666' }}>
        Created: {data.createdAt}
        {data.updatedAt ? ` • Updated: ${data.updatedAt}` : null}
      </footer>
    </article>
  );
}
