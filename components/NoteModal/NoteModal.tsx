'use client';

import { createPortal } from 'react-dom';
import { useEffect } from 'react';
import css from './NoteModal.module.css';

interface NoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const modalRoot = document.getElementById('modal-root') || document.body;

export default function NoteModal({ isOpen, onClose, children }: NoteModalProps) {
  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleEscape);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  return createPortal(
    <div
      className={css.backdrop}
      role="dialog"
      aria-modal="true"
      onClick={handleBackdropClick}
    >
      <div className={css.modal}>
        {children}
        <button
          onClick={onClose}
          className={css.closeButton}
          aria-label="Close modal"
        >
          ✖
        </button>
      </div>
    </div>,
    modalRoot
  );
}
