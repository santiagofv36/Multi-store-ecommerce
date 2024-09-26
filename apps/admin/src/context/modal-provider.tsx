'use client';

import { StoreModal } from '@admin/components';
import React from 'react';

export default function ModalProvider() {
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <React.Fragment>
      <StoreModal />
    </React.Fragment>
  );
}
