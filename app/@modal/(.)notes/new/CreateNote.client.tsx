"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Modal from "@/components/Modal/Modal";
import { createNote } from "@/lib/api";
import type { Note, NoteTag } from "@/types/note";

export default function CreateNoteClient() {
  const router = useRouter();
  const qc = useQueryClient();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tag, setTag] = useState<NoteTag>("Todo");

  const { mutate, isPending } = useMutation<Note, Error, void>({
    mutationFn: () => createNote({ title, content, tag }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["notes"] });
      router.back();
    },
  });

  const canSubmit = title.trim().length > 0 && !isPending;
  const onClose = () => router.back();

  return (
    <Modal isOpen onClose={onClose} ariaLabel="Create note">
      <h2>Create note</h2>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (canSubmit) mutate();
        }}
        style={{ display: "grid", gap: 8 }}
      >
        <input
          required
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={6}
        />

        <select
          value={tag}
          onChange={(e) => setTag(e.target.value as NoteTag)}
          aria-label="Tag"
        >
          <option value="Todo">Todo</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Meeting">Meeting</option>
          <option value="Shopping">Shopping</option>
        </select>

        <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
          <button type="submit" disabled={!canSubmit}>
            {isPending ? "Saving…" : "Save"}
          </button>
          <button type="button" onClick={onClose}>
            Cancel
          </button>
        </div>
      </form>
    </Modal>
  );
}
