import type { ReactNode } from 'react';

type FilterLayoutProps = {
  children: ReactNode;
  sidebar: ReactNode;
};

export default function FilterLayout({ children, sidebar }: FilterLayoutProps) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: '16px' }}>
      <aside>{sidebar}</aside>
      <section>{children}</section>
    </div>
  );
}