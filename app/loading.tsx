import styles from "./Spinner.module.css";

export default function Spinner() {
  return (
    <div className={styles.wrapper} role="status" aria-label="Loading">
      <svg className={styles.spinner} viewBox="0 0 50 50">
        <circle
          className={styles.path}
          cx="25"
          cy="25"
          r="20"
          fill="none"
          strokeWidth="4"
        />
      </svg>
      <span className={styles.text}>Loading...</span>
    </div>
  );
}
