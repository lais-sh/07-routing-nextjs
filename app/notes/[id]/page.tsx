import { notFound } from "next/navigation";
import { fetchNoteById } from "@/lib/api";
import type { Note } from "@/types/note";

type PageProps = {
  params: { id: string };
};

function formatDT(v?: string) {
  if (!v) return "";
  const d = new Date(v);
  return Number.isNaN(d.valueOf()) ? v : d.toLocaleString();
}

export default async function NoteDetailsPage({ params }: PageProps) {
  const id = params?.id;
  if (!id) notFound();

  let note: Note | undefined;
  try {
    note = await fetchNoteById(id); 
  } catch {
    notFound();
  }
  if (!note) notFound();

  return (
    <article style={{ maxWidth: 720, margin: "2rem auto", lineHeight: 1.6 }}>
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 12,
        }}
      >
        <h1 style={{ margin: 0 }}>{note.title}</h1>
        <span
          style={{
            padding: "4px 8px",
            borderRadius: 8,
            background: "#eef",
            fontSize: 12,
            whiteSpace: "nowrap",
          }}
        >
          {note.tag}
        </span>
      </header>

      {note.content && (
        <p style={{ marginTop: 12, whiteSpace: "pre-wrap" }}>{note.content}</p>
      )}

      <footer style={{ marginTop: 24, fontSize: 12, color: "#666" }}>
        Created: {formatDT(note.createdAt)}
        {note.updatedAt ? ` • Updated: ${formatDT(note.updatedAt)}` : null}
      </footer>
    </article>
  );
}
