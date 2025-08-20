import { notFound } from "next/navigation";
import NoteList from "@/components/NoteList/NoteList";
import { fetchNotes } from "@/lib/api";
import type { NoteTag } from "@/types/note";

export const dynamic = "force-dynamic";

type Params = Promise<{ slug: string[] }>;

const ALLOWED_TAGS: ReadonlyArray<NoteTag | "All"> = ["All","Work","Personal","Meeting","Shopping","Todo",];

export default async function Page({ params }: { params: Params }) {
  const { slug } = await params;

  const [rawTag, rawPage] = slug ?? [];
  const tag = (rawTag ?? "All") as NoteTag | "All";

  if (!ALLOWED_TAGS.includes(tag)) {
    notFound();
  }

  const page = rawPage ? Number(rawPage) : 1;
  if (!Number.isFinite(page) || page < 1) {
    notFound();
  }

  try {
    const data = await fetchNotes({ page, tag });

    if (!data || data.notes.length === 0) {
      return (
        <>
          <h1>
            {tag === "All" ? "All notes" : `Notes tagged: ${tag}`}
          </h1>
          <p>No notes found.</p>
        </>
      );
    }

    return (
      <>
        <h1>
          {tag === "All" ? "All notes" : `Notes tagged: ${tag}`}
        </h1>
        <NoteList notes={data.notes} />
      </>
    );
  } catch (e) {
    console.error("❌ Error fetching notes:", e);
    return <p>Could not fetch the list of notes. Please try again later.</p>;
  }
}
