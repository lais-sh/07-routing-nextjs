import axios from "axios";
import type { Note, NoteTag, NewNote } from "@/types/note";

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

const API = axios.create({
  baseURL: "https://notehub-public.goit.study/api",
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
  },
  // при желании: timeout: 10000,
});

// Унифицируем id: можно передавать number | string
type NoteId = number | string;

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

export async function fetchNoteById(noteId: NoteId): Promise<Note> {
  const { data } = await API.get<Note>(`/notes/${noteId}`);
  return data;
}

export async function createNote(payload: NewNote): Promise<Note> {
  const { data } = await API.post<Note>("/notes", payload);
  return data;
}

export async function deleteNote(noteId: NoteId): Promise<Note> {
  const { data } = await API.delete<Note>(`/notes/${noteId}`);
  return data;
}
