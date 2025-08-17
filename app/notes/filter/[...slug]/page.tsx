import { notFound } from 'next/navigation';
import NoteList from '@/components/NoteList/NoteList';
import { fetchNotes } from '@/lib/api';
import type { NoteTag } from '@/types/note';

export const dynamic = 'force-dynamic';

type Props = { params: { slug?: string[] } };

const ALLOWED: NoteTag[] = ['Work', 'Personal', 'Meeting', 'Shopping', 'Todo'];

export default async function Page({ params }: Props) {
  const seg = params.slug?.[0];
  if (!seg || seg.toLowerCase() === 'all') {
    const data = await fetchNotes({ page: 1 });
    return (
      <>
        <h1>All notes</h1>
        <NoteList notes={data.notes} />
      </>
    );
  }

  const tag = (seg.charAt(0).toUpperCase() + seg.slice(1).toLowerCase()) as NoteTag;
  if (!ALLOWED.includes(tag)) return notFound();

  try {
    const data = await fetchNotes({ page: 1, tag });
    if (!data || data.notes.length === 0) {
      return <p>No notes found for tag: {tag}</p>;
    }

    return (
      <>
        <h1>Notes tagged: {tag}</h1>
        <NoteList notes={data.notes} />
      </>
    );
  } catch (e) {
    console.error('❌ Error fetching notes:', e);
    return <p>Could not fetch the list of notes. Please try again later.</p>;
  }
}
