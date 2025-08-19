export const dynamic = "force-dynamic";

import { notFound } from "next/navigation";
import { fetchNoteById } from "@/lib/api";
import { HydrationBoundary, dehydrate, QueryClient } from "@tanstack/react-query";
import NoteDetailsClient from "./NoteDetails.client";

interface Props {
  params: { id: string };
}

export default async function NoteDetailsPage({ params }: Props) {
  const id = Number(params.id);
  if (Number.isNaN(id)) {
    notFound();
  }

  const qc = new QueryClient();
  await qc.prefetchQuery({
    queryKey: ["noteDetails", id],
    queryFn: () => fetchNoteById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(qc)}>
  <NoteDetailsClient noteId={id} />
</HydrationBoundary>
  );
}
