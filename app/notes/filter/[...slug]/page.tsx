import NoteList from '@/components/NoteList/NoteList';
import { fetchNotes } from '@/lib/api';
import type { NoteTag } from '@/types/note';

interface Props {
  params: { slug: string[] | string }; // ← підтримка [...slug]
}

export default async function Page({ params }: Props) {
  // Отримуємо перший сегмент slug
  const slugArray = Array.isArray(params.slug) ? params.slug : [params.slug];
  const rawTag = slugArray[0]; // перший елемент з [...slug]

  if (!rawTag) {
    return <p>❌ No tag provided in the URL.</p>;
  }

  const tag = (rawTag.charAt(0).toUpperCase() + rawTag.slice(1).toLowerCase()) as NoteTag;

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
