"use client";

import { useEffect, useState } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import Link from "next/link";

import { fetchNotes, type NotesResponse } from "@/lib/api";
import type { NoteTag } from "@/types/note";

import NoteList from "@/components/NoteList/NoteList";
import Pagination from "@/components/Pagination/Pagination";

type Props = {
  tag?: NoteTag | "All";
  initialPage?: number;
};

export default function NotesClient({ tag, initialPage = 1 }: Props) {
  const [page, setPage] = useState<number>(initialPage);
  const [query, setQuery] = useState<string>("");

  // локальный дебаунс
  const [debounced, setDebounced] = useState("");
  useEffect(() => {
    const t = setTimeout(() => setDebounced(query.trim()), 300);
    return () => clearTimeout(t);
  }, [query]);

  const { data, isLoading, isError } = useQuery<NotesResponse>({
    queryKey: ["notes", page, debounced, tag],
    queryFn: () =>
      fetchNotes({
        page,
        search: debounced || undefined,
        tag, // api сам отбросит "All"
      }),
    // v5:
    placeholderData: keepPreviousData,
    // если у тебя v4, используй:
    // keepPreviousData: true,
  });

  return (
    <section>
      <div style={{ marginBottom: 12 }}>
        <input
          type="text"
          placeholder="Search notes…"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            if (page !== 1) setPage(1);
          }}
        />
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
        <h1>Notes</h1>
        <Link href="/notes/new">Create note</Link>
      </div>

      {isLoading && <p>Loading…</p>}
      {isError && <p>Failed to load notes.</p>}

      {data?.notes?.length ? (
        <NoteList notes={data.notes} />
      ) : (
        !isLoading && <p>No notes found</p>
      )}

      {data?.totalPages ? (
        <Pagination currentPage={page}totalPages={data!.totalPages}onPageChange={setPage}/>
      ) : null}
    </section>
  );
}
