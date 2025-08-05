import axios from 'axios';
import type { Note, NewNoteData } from '@/types/note';

const API_URL = 'https://notehub-public.goit.study/api/notes';
const AUTH_TOKEN = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

if (!AUTH_TOKEN) {
  console.warn('⚠️ Missing environment token: NEXT_PUBLIC_NOTEHUB_TOKEN');
}

const config = {
  headers: {
    Authorization: `Bearer ${AUTH_TOKEN}`,
    'Content-Type': 'application/json',
  },
};

export interface FetchNotesResponse {
  notes: Note[];
  page: number;
  perPage: number;
  totalPages: number;
  totalResults: number;
}

export async function fetchNotes({
  page,
  search = '',
  tag,
}: {
  page: number;
  search?: string;
  tag?: string;
}): Promise<FetchNotesResponse> {
  const params = {
    page,
    perPage: 10,
    ...(search.trim() && { search }),
    ...(tag && tag !== 'All' ? { tag } : {}),
  };

  const response = await axios.get<FetchNotesResponse>(API_URL, {
    headers: config.headers,
    params,
  });

  console.log('📒 Получено заметок:', response.data.notes);

  return response.data;
}

export async function createNote(noteData: NewNoteData): Promise<Note> {
  const response = await axios.post<Note>(API_URL, noteData, config);
  return response.data;
}

export async function deleteNote(noteId: number): Promise<Note> {
  const response = await axios.delete<Note>(`${API_URL}/${noteId}`, config);
  return response.data;
}

export async function fetchNoteById(noteId: number): Promise<Note> {
  const response = await axios.get<Note>(`${API_URL}/${noteId}`, config);
  return response.data;
}

