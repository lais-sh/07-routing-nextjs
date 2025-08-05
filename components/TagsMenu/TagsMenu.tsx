'use client';

import Link from 'next/link';
import { useState } from 'react';
import styles from './TagsMenu.module.css';

const noteCategories = ['Work', 'Personal', 'Meeting', 'Shopping', 'Todo'];

function TagLink({
  label,
  href,
  onClick,
}: {
  label: string;
  href: string;
  onClick: () => void;
}) {
  return (
    <li className={styles.item}>
      <Link href={href} className={styles.link} onClick={onClick}>
        {label}
      </Link>
    </li>
  );
}

export default function TagsMenu() {
  const [menuVisible, setMenuVisible] = useState(false);

  const switchMenu = () => setMenuVisible((v) => !v);

  const closeMenu = () => setMenuVisible(false);

  return (
    <div className={styles.wrapper}>
      <button
        className={styles.button}
        onClick={switchMenu}
        aria-expanded={menuVisible}
      >
        Tags ▾
      </button>

      {menuVisible && (
        <ul className={styles.list}>
          <TagLink
            label="All"
            href="/notes"
            onClick={closeMenu}
          />
          {noteCategories.map((category) => (
            <TagLink
              key={category}
              label={category}
              href={`/notes/filter/${category.toLowerCase()}`}
              onClick={closeMenu}
            />
          ))}
        </ul>
      )}
    </div>
  );
}
