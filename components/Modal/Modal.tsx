"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import css from "./Modal.module.css";

type Props = {
  onClose?: () => void; // необов'язково — fallback на router.back()
  children: React.ReactNode;
};

export default function Modal({ onClose, children }: Props) {
  const router = useRouter();

  const close = () => {
    onClose ? onClose() : router.back();
  };

  // Закриття по Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Клік по backdrop
  const onBackdrop = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) close();
  };

  const content = (
    <div className={css.backdrop} onClick={onBackdrop} role="presentation">
      <div
        className={css.dialog}
        role="dialog"
        aria-modal="true"
        aria-label="Note details"
      >
        <button className={css.close} onClick={close} aria-label="Close modal">
          ×
        </button>
        <div className={css.body}>{children}</div>
      </div>
    </div>
  );

  return createPortal(content, document.body);
}
