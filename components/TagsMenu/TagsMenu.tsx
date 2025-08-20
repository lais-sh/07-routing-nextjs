"use client";

import Link from "next/link";
import { useState } from "react";
import styles from "./TagsMenu.module.css";

const TAGS = ["Work", "Personal", "Meeting", "Shopping", "Todo"] as const;

export default function TagsMenu() {
  const [open, setOpen] = useState(false);
  const toggle = () => setOpen((v) => !v);

  return (
    <div className={styles.menuContainer}>
      <button className={styles.menuButton} onClick={toggle}>
        Notes ▾
      </button>

      {open && (
        <ul className={styles.menuList}>
          <li className={styles.menuItem}>
            <Link href="/notes/filter/All" className={styles.menuLink} onClick={toggle}>
              All notes
            </Link>
          </li>
          {TAGS.map((tag) => (
            <li className={styles.menuItem} key={tag}>
              <Link
                href={`/notes/filter/${tag}`}
                className={styles.menuLink}
                onClick={toggle}
              >
                {tag}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
