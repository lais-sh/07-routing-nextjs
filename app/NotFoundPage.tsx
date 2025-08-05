import styles from "./NotFound.module.css";

export default function NotFoundPage() {
  return (
    <main className={styles.wrapper}>
      <h1 className={styles.title}>404 — Nothing Here</h1>
      <p className={styles.text}>
        This page couldn't be found. Please check the URL or go back to the homepage.
      </p>
      <a href="/" className={styles.link}>
        Back to Home
      </a>
    </main>
  );
}
