'use client';

import React from 'react';
import { useStoreModal } from '@admin/hooks/use-store-modal';
import { Modal } from '@admin/components';
import { StoreForm } from '../forms/store/store-form';

export function StoreModal() {
  const { isOpen, close } = useStoreModal();

  return (
    <Modal
      title="Create Store"
      description="Add a new store to manage productos and categories"
      onClose={close}
      isOpen={isOpen}
    >
      <StoreForm close={close} />
    </Modal>
  );
}
