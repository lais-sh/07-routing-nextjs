"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";
import Modal from "@/components/Modal/Modal";
import { useRouter } from "next/navigation";

type NotePreviewProps = {
  noteId: string;
  onClose?: () => void;
};

export default function NotePreview({ noteId, onClose }: NotePreviewProps) {
  const router = useRouter();
  const close = onClose ?? (() => router.back());

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["note", noteId],
    queryFn: () => fetchNoteById(noteId),
    refetchOnMount: false,
  });

  return (
    <Modal onClose={close}>
      {isLoading && <div style={{ padding: 24 }}>Loading…</div>}
      {isError && (
        <div style={{ padding: 24 }}>
          <p>Could not load preview. {error instanceof Error ? error.message : ""}</p>
          <button onClick={close}>Close</button>
        </div>
      )}
      {data && (
        <article style={{ background: "#fff", padding: 24, maxWidth: 680, width: "100%", borderRadius: 12 }}>
          <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h2 style={{ margin: 0 }}>{data.title}</h2>
            <span style={{ fontSize: 12, padding: "2px 8px", background: "#eef", borderRadius: 8 }}>
              {data.tag}
            </span>
          </header>
          <p style={{ marginTop: 12, whiteSpace: "pre-wrap" }}>{data.content}</p>
          <footer style={{ marginTop: 16 }}>
            <button onClick={close}>Close</button>
          </footer>
        </article>
      )}
    </Modal>
  );
}
