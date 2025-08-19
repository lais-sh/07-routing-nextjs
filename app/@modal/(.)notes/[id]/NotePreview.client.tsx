'use client';

import { useParams, useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { fetchNoteById } from '@/lib/api';

export default function NotePreview({ id }: { id?: number }) {
  const params = useParams<{ id: string }>();
  const router = useRouter();

  const noteId = id ?? Number(params?.id);
  const enabled = Number.isFinite(noteId);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['note-preview', noteId],
    queryFn: () => fetchNoteById(noteId!),
    enabled,
  });

  if (!enabled) return null;

  if (isLoading) return <div style={{ padding: 24 }}>Loading…</div>;

  if (isError || !data) {
    return (
      <div style={{ padding: 24 }}>
        <p>Could not load preview. {error instanceof Error ? error.message : ''}</p>
        <button onClick={() => router.back()}>Close</button>
      </div>
    );
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,.5)',
        display: 'grid',
        placeItems: 'center',
        padding: 16,
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) router.back();
      }}
    >
      <article style={{ background: '#fff', padding: 24, maxWidth: 680, width: '100%', borderRadius: 12 }}>
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ margin: 0 }}>{data.title}</h2>
          <span style={{ fontSize: 12, padding: '2px 8px', background: '#eef', borderRadius: 8 }}>{data.tag}</span>
        </header>
        <p style={{ marginTop: 12, whiteSpace: 'pre-wrap' }}>{data.content}</p>
        <footer style={{ marginTop: 16 }}>
          <button onClick={() => router.back()}>Close</button>
        </footer>
      </article>
    </div>
  );
}
