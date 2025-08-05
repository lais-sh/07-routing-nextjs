import NoteList from '@/components/NoteList/NoteList';
import { fetchNotes } from '@/lib/api';
import type { NoteTag } from '@/types/note';

interface Props {
  params: { tag: string };
}

export default async function Page({ params }: Props) {
  const tag = params.tag.charAt(0).toUpperCase() + params.tag.slice(1).toLowerCase() as NoteTag;

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
  } catch (error) {
    console.error('❌ Error fetching notes:', error);
    return <p>Could not fetch the list of notes. Please try again later.</p>;
  }
}
