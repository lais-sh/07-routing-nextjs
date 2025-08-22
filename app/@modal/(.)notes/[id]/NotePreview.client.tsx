"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";
import Modal from "@/components/Modal/Modal";

type Props = {
  noteId: string;
  onClose: () => void;
};

export default function NotePreviewClient({ noteId, onClose }: Props) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["note", noteId],
    queryFn: () => fetchNoteById(noteId),
    refetchOnMount: false,
  });

  return (
    <Modal onClose={onClose}>
      {isLoading && <p>Loading…</p>}
      {isError && <p>Failed to load note.</p>}
      {data && (
        <article>
          <h2>{data.title}</h2>
          <p>{data.content}</p>
          <p><strong>Tag:</strong> {data.tag}</p>
        </article>
      )}
    </Modal>
  );
}
