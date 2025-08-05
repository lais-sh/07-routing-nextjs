'use client';

import { useRouter } from 'next/navigation';
import { Note } from '@/types/note';
import styles from './NotePreview.module.css';

interface Props {
  note: Note;
}

export default function NotePreview({ note }: Props) {
  const router = useRouter();

  const handleClose = () => router.back();

  return (
    <section className={styles.wrapper}>
      <article className={styles.note}>
        <header className={styles.header}>
          <h2 className={styles.title}>{note.title}</h2>
          <button
            onClick={handleClose}
            className={styles.closeButton}
            aria-label="Close note preview"
          >
            ✖
          </button>
        </header>

        <div className={styles.meta}>
          <span className={styles.tag}>{note.tag}</span>
          <span className={styles.date}>
            {new Date(note.createdAt).toLocaleString()}
          </span>
        </div>

        <p className={styles.content}>{note.content}</p>
      </article>
    </section>
  );
}
