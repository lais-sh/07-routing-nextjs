"use client";

import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import Modal from "@/components/Modal/Modal";
import { fetchNoteById } from "@/lib/api";
import type { Note } from "@/types/note";

type Props = { id: string };

export default function NotePreview({ id }: Props) {
  const router = useRouter();

  const { data, isLoading, isError } = useQuery<Note>({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(Number(id)) as Promise<Note>,
  });

  const onClose = () => router.back();

  return (
    <Modal isOpen onClose={onClose} ariaLabel="Note preview">
      {isLoading && <p>Loading…</p>}
      {isError && <p>Failed to load note.</p>}
      {data && (
        <>
          <h2>{data.title}</h2>
          <p style={{ whiteSpace: "pre-wrap" }}>{data.content}</p>
          <div style={{ marginTop: 12 }}>
            <button onClick={onClose}>Close</button>
          </div>
        </>
      )}
    </Modal>
  );
}
