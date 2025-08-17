import { fetchNotes } from '@/lib/api';
import NotesClient from './filter/[...slug]/Notes.client';

export const dynamic = 'force-dynamic';

export default async function NotesPage() {
  const initialData = await fetchNotes({ page: 1 });

  return <NotesClient initialData={initialData} />;
}

