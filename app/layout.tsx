import './globals.css';
import TanStackProvider from '@/components/TanStackProvider/TanStackProvider';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'NoteHub',
  description: 'Manage your personal notes efficiently.',
};

type RootLayoutProps = {
  children: ReactNode;
  modal: ReactNode; 
};

export default function RootLayout({ children, modal }: RootLayoutProps) {
  return (
    <html lang="en">
      <body>
        <TanStackProvider>
          <Header />
          <main>
            {children}
            {modal}
          </main>
          <Footer />
        </TanStackProvider>
      </body>
    </html>
  );
}