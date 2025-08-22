"use client";

import { type FC } from "react";
import styles from "./Pagination.module.css";

type Props = {
  currentPage: number;
  totalPages: number;
  onPageChange: (next: number) => void;
};

const clamp = (v: number, min: number, max: number) =>
  Math.max(min, Math.min(max, v));

const Pagination: FC<Props> = ({ currentPage, totalPages, onPageChange }) => {
  if (!totalPages || totalPages <= 1) return null;

  const prev = () => onPageChange(clamp(currentPage - 1, 1, totalPages));
  const next = () => onPageChange(clamp(currentPage + 1, 1, totalPages));

  return (
    <nav className={styles.root} aria-label="Pagination">
      <button className={styles.btn} onClick={prev} disabled={currentPage <= 1}>
        ‹ Prev
      </button>
      <span className={styles.info}>
        Page {currentPage} / {totalPages}
      </span>
      <button
        className={styles.btn}
        onClick={next}
        disabled={currentPage >= totalPages}
      >
        Next ›
      </button>
    </nav>
  );
};

export default Pagination;
