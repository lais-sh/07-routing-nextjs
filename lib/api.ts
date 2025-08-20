import axios from "axios";
import type { Note, NoteTag, NewNote } from "@/types/note";

const API = axios.create({
  baseURL: "https://notehub-public.goit.study/api",
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
  },
});

export type NotesResponse = {
  notes: Note[];
  totalPages: number;
};

type FetchNotesParams = {
  page: number;
  perPage?: number;
  search?: string;
  tag?: NoteTag | "All";
};

export async function fetchNotes({
  page,
  perPage = 12,
  search,
  tag,
}: FetchNotesParams): Promise<NotesResponse> {
  const params: Record<string, string | number | undefined> = {
    page,
    perPage,
    ...(search?.trim() ? { search } : {}),
    ...(tag && tag !== "All" ? { tag } : {}),
  };

  const { data } = await API.get<NotesResponse>("/notes", { params });
  return data;
}

export async function createNote(payload: NewNote): Promise<Note> {
  const { data } = await API.post<Note>("/notes", payload);
  return data;
}

export async function deleteNote(noteId: string): Promise<Note> {
  const { data } = await API.delete<Note>(`/notes/${noteId}`);
  return data;
}

export async function fetchNoteById(noteId: string): Promise<Note> {
  const { data } = await API.get<Note>(`/notes/${noteId}`);
  return data;
}
