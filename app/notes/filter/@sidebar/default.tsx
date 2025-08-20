"use client";

import Link from "next/link";
import styles from "./sidebar.module.css";

const TAGS = ["All", "Work", "Personal", "Meeting", "Shopping", "Todo"] as const;

export default function SidebarDefault() {
  return (
    <nav className={styles.sidebar}>
      <ul className={styles.list}>
        {TAGS.map((t) => (
          <li key={t} className={styles.item}>
            <Link href={`/notes/filter/${t}`} className={styles.link}>
              {t}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
