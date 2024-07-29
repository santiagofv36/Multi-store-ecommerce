'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React from 'react';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  const { data: session, status } = useSession();

  React.useEffect(() => {
    if (status === 'authenticated') {
      localStorage.setItem('token', session.user.token);
      router.push('/dashboard');
    }
  }, [status]);

  return (
    <main className=" min-h-[100dvh] flex items-center justify-center">
      {children}
    </main>
  );
}
