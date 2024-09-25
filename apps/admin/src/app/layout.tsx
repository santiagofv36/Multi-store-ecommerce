import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import QueryProvider from '../context/query-context';
import { NextAuthProvider } from '../context/auth-provider';
import { UserContextProvider } from '@admin/context/user-provider';
import ModalProvider from '@admin/context/modal-provider';
import { Toaster } from 'react-hot-toast';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Multi-Ecommerce | Admin',
  description: 'Admin panel for Multi-Ecommerce',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <QueryProvider>
          <NextAuthProvider>
            <UserContextProvider>
              <ModalProvider />
              <Toaster />
              {children}
            </UserContextProvider>
          </NextAuthProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
