'use client';

import { Button } from '@admin/components/ui/button';
import { useStoreModal } from '@admin/hooks/use-store-modeal';
import { signOut } from 'next-auth/react';
import React from 'react';

export default function DashboardPage() {
  const { open } = useStoreModal();

  return (
    <div>
      <h1>Dashboard</h1>
      <Button onClick={() => signOut()}>Sign out</Button>
      <Button onClick={open}>Create store</Button>
    </div>
  );
}
