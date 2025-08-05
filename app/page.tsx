import styles from "./page.module.css";

export default function HomePage() {
  return (
    <main className={styles.main}>
      <section className={styles.section}>
        <h1 className={styles.heading}>Welcome to NoteHub</h1>

        <p className={styles.text}>
          NoteHub is a lightweight and intuitive platform for managing your personal notes.
          Capture your thoughts anytime and keep them organized in one secure place.
        </p>

        <p className={styles.text}>
          Enjoy a distraction-free interface for writing, editing, and exploring your notes.
          With keyword search and tag filtering, NoteHub simplifies note management for daily productivity.
        </p>
      </section>
    </main>
  );
}
