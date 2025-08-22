'use client';

import { useState } from 'react';
import { useDebounce } from 'use-debounce';
import { useQuery } from '@tanstack/react-query';
import { fetchNotes } from '@/lib/api';
import Modal from '@/components/Modal/Modal';
import { normalizeTag } from '@/lib/tags';

import NoteList from '@/components/NoteList/NoteList';
import Pagination from '@/components/Pagination/Pagination';
import SearchBox from '@/components/SearchBox/SearchBox';
import NoteForm from '@/components/NoteForm/NoteForm';

import type { NoteTag } from '@/lib/tags';

interface NotesClientProps {
  /** Тег из сегмента маршрута; может быть undefined */
  tag?: string;
  /** Початкова сторінка, що прийде із серверного компонента */
  initialPage?: number;
}

export default function NotesClient({ tag, initialPage = 1 }: NotesClientProps) {
  const [page, setPage] = useState(initialPage);
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // debounce пошуку
  const [debouncedSearch] = useDebounce(search, 500);

  // нормалізація тегу до типу NoteTag | 'All'
  const safeTag: NoteTag | 'All' | undefined = normalizeTag(tag);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['notes', { page, search: debouncedSearch, tag: safeTag }],
    queryFn: () => fetchNotes({ page, perPage: 12, search: debouncedSearch, tag: safeTag }),
    refetchOnMount: false, // опираємось на гідрацію
  });

  const handleSearch = (query: string) => {
    setPage(1);
    setSearch(query);
  };

  return (
    <>
      <button onClick={() => setIsModalOpen(true)}>➕ New Note</button>

      <SearchBox onSearch={handleSearch} />

      {isLoading && <p>Loading…</p>}
      {isError && <p style={{ color: 'red' }}>Failed to load notes.</p>}

      {!!data?.notes?.length ? (
        <>
          <NoteList notes={data.notes} />
          {data.totalPages > 1 && (
            <Pagination
              currentPage={page}
              totalPages={data.totalPages}
              onPageChange={setPage}
            />
          )}
        </>
      ) : (
        !isLoading && <p>No notes found.</p>
      )}

      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <NoteForm onClose={() => setIsModalOpen(false)} />
        </Modal>
      )}
    </>
  );
}
