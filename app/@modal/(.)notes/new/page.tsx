import { HydrationBoundary, dehydrate, QueryClient } from "@tanstack/react-query";
import CreateNoteClient from "./CreateNote.client";

export default async function Page() {
  const qc = new QueryClient();
  return (
    <HydrationBoundary state={dehydrate(qc)}>
      <CreateNoteClient />
    </HydrationBoundary>
  );
}
