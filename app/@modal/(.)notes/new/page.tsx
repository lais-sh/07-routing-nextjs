import { QueryClient, dehydrate, HydrationBoundary } from "@tanstack/react-query";
import CreateNoteClient from "./CreateNote.client";

export default async function CreateNotePage() {
  const qc = new QueryClient();

  return (
    <HydrationBoundary state={dehydrate(qc)}>
      <CreateNoteClient />
    </HydrationBoundary>
  );
}
