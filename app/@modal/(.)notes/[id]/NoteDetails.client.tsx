"use client";

import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import Modal from "@/components/Modal/Modal";
import { fetchNoteById } from "@/lib/api";
import type { Note } from "@/types/note";

function formatDT(v?: string) {
  if (!v) return "";
  const d = new Date(v);
  return Number.isNaN(d.valueOf()) ? v : d.toLocaleString();
}

export default function NoteDetailsClient({ noteId }: { noteId: string }) {
  const router = useRouter();

  const { data, isLoading, isError } = useQuery<Note>({
    queryKey: ["note", noteId],
    queryFn: () => fetchNoteById(noteId),
  });

  const onClose = () => router.back();

  return (
    <Modal isOpen onClose={onClose} ariaLabel="Note preview">
      {isLoading && <p>Loading…</p>}
      {isError && <p>Failed to load note.</p>}
      {data && (
        <article style={{ maxWidth: 720, lineHeight: 1.6 }}>
          <header
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 12,
              marginBottom: 8,
            }}
          >
            <h2 style={{ margin: 0 }}>{data.title}</h2>
            <span
              style={{
                padding: "4px 8px",
                borderRadius: 8,
                background: "#eef",
                fontSize: 12,
                whiteSpace: "nowrap",
              }}
            >
              {data.tag}
            </span>
          </header>

          {data.content && (
            <p style={{ whiteSpace: "pre-wrap", marginTop: 8 }}>{data.content}</p>
          )}

          <footer style={{ marginTop: 16, fontSize: 12, color: "#666" }}>
            Created: {formatDT(data.createdAt)}
            {data.updatedAt ? ` • Updated: ${formatDT(data.updatedAt)}` : null}
          </footer>

          <div style={{ marginTop: 12 }}>
            <button type="button" onClick={onClose}>Close</button>
          </div>
        </article>
      )}
    </Modal>
  );
}
