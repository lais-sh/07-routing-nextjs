'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createNote } from '@/lib/api';
import { useState } from 'react';
import type { NewNote } from '@/types/note';
import styles from './NoteForm.module.css';

interface Props {
  onClose: () => void;
}

export default function NoteForm({ onClose }: Props) {
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState<NewNote>({
    title: '',
    content: '',
    tag: 'Todo',
  });

  const { mutate, isPending } = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      onClose();
    },
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value as NewNote['tag'] }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate(formData);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <label>
        Title
        <input
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          disabled={isPending}
        />
      </label>

      <label>
        Content
        <textarea
          name="content"
          value={formData.content}
          onChange={handleChange}
          disabled={isPending}
        />
      </label>

      <label>
        Tag
        <select
          name="tag"
          value={formData.tag}
          onChange={handleChange}
          disabled={isPending}
        >
          <option value="Todo">Todo</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Meeting">Meeting</option>
          <option value="Shopping">Shopping</option>
        </select>
      </label>

      <div className={styles.actions}>
        <button type="submit" disabled={isPending}>
          {isPending ? 'Saving...' : 'Save'}
        </button>
        <button type="button" onClick={onClose} disabled={isPending}>
          Cancel
        </button>
      </div>
    </form>
  );
}
