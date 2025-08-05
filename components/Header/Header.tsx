import Link from 'next/link';
import TagsMenu from '@/components/TagsMenu/TagsMenu';

export default function Header() {
  return (
    <header>
      <nav>
        <Link href="/">Home</Link>
        <TagsMenu />
      </nav>
    </header>
  );
}
