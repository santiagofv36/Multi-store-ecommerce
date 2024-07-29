'use client';

import useUser from '@admin/hooks/use-user';
import { useCurrentUser } from '@admin/services/auth';
import { signOut } from 'next-auth/react';
import React from 'react';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useUser();

  const { data, isLoading } = useCurrentUser();

  React.useEffect(() => {
    // Validate if useCurrentUser have and Error or Return a empty object
    if ((!isLoading && !data?._id)) {
      setUser(null);
      signOut();
      localStorage.removeItem('token');
    }

    if (data) {
      setUser(data);
    }
  }, [data, isLoading]);

  return (
    <main className="min-h-[100dvh] flex items-center justify-center">
      {children}
    </main>
  );
}
