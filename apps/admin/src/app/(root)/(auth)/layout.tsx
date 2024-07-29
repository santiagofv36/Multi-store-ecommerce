'use client';

import React from 'react';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <main className=" min-h-[100dvh] flex items-center justify-center">{children}</main>;
}
