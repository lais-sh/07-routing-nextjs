export const TAGS = ["All","Work","Personal","Meeting","Shopping","Todo"] as const;
export type NoteTag = Exclude<typeof TAGS[number], "All">;

export function normalizeTag(
  raw?: string
): NoteTag | "All" | undefined {
  if (!raw) return undefined;
  return (TAGS as readonly string[]).includes(raw) ? (raw as NoteTag | "All") : undefined;
}
