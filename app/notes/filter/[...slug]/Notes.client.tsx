'use client';

import { useState } from 'react';
import { useDebounce } from 'use-debounce';
import { useQuery } from '@tanstack/react-query';
import { fetchNotes } from '@/lib/api';

import NoteList from '@/components/NoteList/NoteList';
import Pagination from '@/components/Pagination/Pagination';
import SearchBox from '@/components/SearchBox/SearchBox';
import NoteForm from '@/components/NoteForm/NoteForm';

import type { FetchNotesValues } from '@/types/note';

interface NotesClientProps {
  initialData: FetchNotesValues;
  tag?: string;
}

export default function NotesClient({ initialData, tag }: NotesClientProps) {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [debouncedSearch] = useDebounce(search, 500);

  const { data = initialData, isError } = useQuery({
    queryKey: ['notes', page, debouncedSearch, tag],
    queryFn: () => fetchNotes({ page, search: debouncedSearch, tag }),
    initialData,
    placeholderData: (prev) => prev,
  });

  const handleSearch = (query: string) => {
    setPage(1);
    setSearch(query);
  };

  if (isError) {
    return <p style={{ color: 'red' }}>Failed to load notes.</p>;
  }

  return (
    <>
      <button onClick={() => setIsModalOpen(true)}>➕ New Note</button>

      <SearchBox onSearch={handleSearch} />

      {data.notes.length > 0 ? (
        <NoteList notes={data.notes} />
      ) : (
        <p>No notes found.</p>
      )}

      {data.totalPages > 1 && (
        <Pagination
          currentPage={page}
          totalPages={data.totalPages}
          onPageChange={setPage}
        />
      )}

      {isModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={(e) => e.target === e.currentTarget && setIsModalOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
          }}
        >
          <div
            style={{
              position: 'relative',
              background: '#fff',
              padding: 20,
              borderRadius: 8,
              minWidth: 320,
              maxWidth: 560,
              width: '90%',
            }}
          >
            <NoteForm onClose={() => setIsModalOpen(false)} />
            <button
              aria-label="Close modal"
              onClick={() => setIsModalOpen(false)}
              style={{
                position: 'absolute',
                top: 8,
                right: 10,
                border: 'none',
                background: 'transparent',
                fontSize: 20,
                cursor: 'pointer',
              }}
            >
              ✖
            </button>
          </div>
        </div>
      )}
    </>
  );
}
