"use client";

import { type FC, useMemo } from "react";
import styles from "./Pagination.module.css";

type Props = {
  currentPage: number;
  totalPages: number;
  onPageChange: (next: number) => void;
};

const clamp = (v: number, min: number, max: number) =>
  Math.max(min, Math.min(max, v));

function usePageWindow(current: number, total: number, windowSize = 5) {
  return useMemo(() => {
    if (total <= windowSize) {
      return Array.from({ length: total }, (_, i) => i + 1);
    }

    const half = Math.floor(windowSize / 2);
    let start = current - half;
    let end = current + half;

    if (start < 1) {
      end += 1 - start;
      start = 1;
    }
    if (end > total) {
      start -= end - total;
      end = total;
    }

    start = Math.max(1, start);
    end = Math.min(total, end);

    const pages: (number | "...")[] = [];

    if (start > 1) {
      pages.push(1);
      if (start > 2) pages.push("...");
    }

    for (let p = start; p <= end; p++) pages.push(p);

    if (end < total) {
      if (end < total - 1) pages.push("...");
      pages.push(total);
    }

    return pages;
  }, [current, total, windowSize]);
}

const Pagination: FC<Props> = ({ currentPage, totalPages, onPageChange }) => {
  if (!Number.isFinite(totalPages) || totalPages <= 1) return null;

  const safeCurrent = clamp(
    Number.isFinite(currentPage) ? currentPage : 1,
    1,
    totalPages
  );

  const go = (next: number) => {
    const target = clamp(next, 1, totalPages);
    if (target !== safeCurrent) onPageChange(target);
  };

  const prev = () => go(safeCurrent - 1);
  const next = () => go(safeCurrent + 1);
  const first = () => go(1);
  const last = () => go(totalPages);

  const windowPages = usePageWindow(safeCurrent, totalPages, 5);

  return (
    <nav className={styles.root} aria-label="Pagination">
      <button
        type="button"
        className={styles.btn}
        onClick={first}
        disabled={safeCurrent === 1}
        aria-label="Go to first page"
      >
        « First
      </button>

      <button
        type="button"
        className={styles.btn}
        onClick={prev}
        disabled={safeCurrent === 1}
        aria-label="Go to previous page"
      >
        ‹ Prev
      </button>

      <span className={styles.info} aria-hidden>
        Page {safeCurrent} / {totalPages}
      </span>

      {windowPages.map((p, i) =>
        p === "..." ? (
          <span key={`ellipsis-${i}`} className={styles.ellipsis} aria-hidden>
            …
          </span>
        ) : (
          <button
            type="button"
            key={p}
            className={`${styles.page} ${p === safeCurrent ? styles.active : ""}`}
            onClick={() => go(p)}
            aria-label={`Go to page ${p}`}
            aria-current={p === safeCurrent ? "page" : undefined}
            disabled={p === safeCurrent}
          >
            {p}
          </button>
        )
      )}

      <button
        type="button"
        className={styles.btn}
        onClick={next}
        disabled={safeCurrent === totalPages}
        aria-label="Go to next page"
      >
        Next ›
      </button>

      <button
        type="button"
        className={styles.btn}
        onClick={last}
        disabled={safeCurrent === totalPages}
        aria-label="Go to last page"
      >
        Last »
      </button>
    </nav>
  );
};

export default Pagination;
