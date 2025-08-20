"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { fetchNoteById } from "@/lib/api";
import type { Note } from "@/types/note";

type Props = {
  noteId?: string;
};

export default function NoteDetailsClient({ noteId }: Props) {
  const params = useParams<{ id: string }>();
  const id = noteId ?? params?.id;
  if (!id) return null;

  const { data, isLoading, isError, error } = useQuery<Note>({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });

  if (isLoading) return <p>Loading…</p>;
  if (isError || !data)
    return (
      <p style={{ color: "red" }}>
        Failed to load note{error instanceof Error ? `: ${error.message}` : ""}
      </p>
    );

  return (
    <article>
      <h1>{data.title}</h1>
      <p>{data.content}</p>
      <p><strong>Tag:</strong> {data.tag}</p>
      <p><em>{new Date(data.createdAt).toLocaleString()}</em></p>
    </article>
  );
}
