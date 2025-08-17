import './globals.css'; 
import TanStackProvider from '@/components/TanStackProvider/TanStackProvider';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'NoteHub',
  description: 'Manage your personal notes efficiently.',
};

interface RootLayoutProps {
  children: React.ReactNode;
  modal?: React.ReactNode;
  sidebar?: React.ReactNode;
}

export default function RootLayout({
  children,
  modal = null,
  sidebar = null,
}: RootLayoutProps) {
  return (
    <html lang="en">
      <body>
        <TanStackProvider>
          <Header />
          <main>{children}</main>
          {modal}
          {sidebar}
          <Footer />
        </TanStackProvider>
      </body>
    </html>
  );
}
