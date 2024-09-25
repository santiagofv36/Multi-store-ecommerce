'use client';

import { Navbar } from '@admin/components';
import React from 'react';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <React.Fragment>
      <Navbar />
      {children}
    </React.Fragment>
  );
}
