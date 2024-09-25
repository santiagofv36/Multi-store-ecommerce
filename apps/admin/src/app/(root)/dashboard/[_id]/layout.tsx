'use client';

import { Button } from '@admin/components/ui/button';
import { signOut } from 'next-auth/react';
import React from 'react';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <React.Fragment>
      <Button onClick={() => signOut()}>Salir</Button>
      {children}
    </React.Fragment>
  );
}
