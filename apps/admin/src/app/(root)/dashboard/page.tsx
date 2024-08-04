'use client';

import { Button } from '@admin/components/ui/button';
import { signOut } from 'next-auth/react';

export default function DashboardPage() {
  return (
    <div>
      <Button onClick={() => signOut()}>Sign Out</Button>
      <h1>Welcome to DashboardPage!</h1>
    </div>
  );
}
