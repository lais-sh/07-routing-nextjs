import Link from 'next/link';
import styles from './SidebarNotes.module.css';

interface Props {
  categories: string[];
}

export default function SidebarMenu({ categories }: Props) {
  return (
    <nav className={styles.sidebar}>
      <ul className={styles.list}>
        <MenuItem href="/notes/filter" label="All notes" />

        {categories.map((category) => (
          <MenuItem
            key={category}
            href={`/notes/filter/${category.toLowerCase()}`}
            label={category}
          />
        ))}
      </ul>
    </nav>
  );
}

interface MenuItemProps {
  href: string;
  label: string;
}

function MenuItem({ href, label }: MenuItemProps) {
  return (
    <li className={styles.item}>
      <Link href={href} className={styles.link}>
        {label}
      </Link>
    </li>
  );
}
