import { notFound } from "next/navigation";
import Link from "next/link";
import NoteList from "@/components/NoteList/NoteList";
import { fetchNotes } from "@/lib/api";
import type { NoteTag } from "@/types/note";

export const dynamic = "force-dynamic";

type Params = Promise<{ slug: string[] }>;

const ALLOWED_TAGS: ReadonlyArray<NoteTag | "All"> = [
  "All",
  "Work",
  "Personal",
  "Meeting",
  "Shopping",
  "Todo",
];

export default async function Page({ params }: { params: Params }) {
  const { slug } = await params;

  const [rawTag, rawPage] = slug ?? [];
  const tag = (rawTag ?? "All") as NoteTag | "All";

  if (!ALLOWED_TAGS.includes(tag)) notFound();

  const page = rawPage ? Number(rawPage) : 1;
  if (!Number.isFinite(page) || page < 1) notFound();

  try {
    const data = await fetchNotes({ page, tag });

    const title = tag === "All" ? "All notes" : `Notes tagged: ${tag}`;

    if (!data || data.notes.length === 0) {
      return (
        <section>
          <HeaderWithCreate title={title} />
          <p>No notes found.</p>
        </section>
      );
    }

    const totalPages = data.totalPages ?? 1;

    return (
      <section>
        <HeaderWithCreate title={title} />

        <NoteList notes={data.notes} />

        {totalPages > 1 && (
          <ServerPagination
            currentPage={page}
            totalPages={totalPages}
            makeHref={(p) => `/notes/filter/${encodeURIComponent(tag)}/${p}`}
          />
        )}
      </section>
    );
  } catch (e) {
    console.error("❌ Error fetching notes:", e);
    return <p>Could not fetch the list of notes. Please try again later.</p>;
  }
}


function HeaderWithCreate({ title }: { title: string }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 12,
      }}
    >
      <h1 style={{ margin: 0 }}>{title}</h1>
      <Link
        href="/notes/new"
        id="create-note-btn"
        style={{
          padding: "8px 12px",
          borderRadius: 8,
          background: "#2563eb",
          color: "#fff",
          textDecoration: "none",
          fontWeight: 600,
        }}
      >
        Create note +
      </Link>
    </div>
  );
}

function ServerPagination({
  currentPage,
  totalPages,
  makeHref,
}: {
  currentPage: number;
  totalPages: number;
  makeHref: (page: number) => string;
}) {
  const clamp = (v: number, min: number, max: number) =>
    Math.max(min, Math.min(max, v));

  const prev = clamp(currentPage - 1, 1, totalPages);
  const next = clamp(currentPage + 1, 1, totalPages);

  // компактне «вікно» сторінок
  const windowSize = 5;
  const half = Math.floor(windowSize / 2);
  let start = Math.max(1, currentPage - half);
  let end = Math.min(totalPages, currentPage + half);
  if (end - start + 1 < windowSize) {
    if (start === 1) end = Math.min(totalPages, start + windowSize - 1);
    else if (end === totalPages) start = Math.max(1, end - windowSize + 1);
  }

  const pages: (number | "...")[] = [];
  if (start > 1) {
    pages.push(1);
    if (start > 2) pages.push("...");
  }
  for (let p = start; p <= end; p++) pages.push(p);
  if (end < totalPages) {
    if (end < totalPages - 1) pages.push("...");
    pages.push(totalPages);
  }

  return (
    <nav
      aria-label="Pagination"
      style={{ display: "flex", gap: 8, alignItems: "center", marginTop: 16 }}
    >
      <Link
        href={makeHref(1)}
        aria-label="First page"
        style={{ opacity: currentPage === 1 ? 0.5 : 1, pointerEvents: currentPage === 1 ? "none" : "auto" }}
      >
        « First
      </Link>
      <Link
        href={makeHref(prev)}
        aria-label="Previous page"
        style={{ opacity: currentPage === 1 ? 0.5 : 1, pointerEvents: currentPage === 1 ? "none" : "auto" }}
      >
        ‹ Prev
      </Link>

      <span aria-hidden>Page {currentPage} / {totalPages}</span>

      {pages.map((p, i) =>
        p === "..." ? (
          <span key={`ellipsis-${i}`} aria-hidden>
            …
          </span>
        ) : (
          <Link
            key={p}
            href={makeHref(p)}
            aria-current={p === currentPage ? "page" : undefined}
            style={{
              fontWeight: p === currentPage ? 700 : 400,
              textDecoration: p === currentPage ? "underline" : "none",
            }}
          >
            {p}
          </Link>
        )
      )}

      <Link
        href={makeHref(next)}
        aria-label="Next page"
        style={{
          opacity: currentPage === totalPages ? 0.5 : 1,
          pointerEvents: currentPage === totalPages ? "none" : "auto",
        }}
      >
        Next ›
      </Link>
      <Link
        href={makeHref(totalPages)}
        aria-label="Last page"
        style={{
          opacity: currentPage === totalPages ? 0.5 : 1,
          pointerEvents: currentPage === totalPages ? "none" : "auto",
        }}
      >
        Last »
      </Link>
    </nav>
  );
}
