'use client';

import { useStoreModal } from '@admin/hooks/use-store-modeal';
import Modal from '@admin/components/ui/modal';

export default function DashboardPage() {
  const { isOpen, close } = useStoreModal();
  return (
    <Modal
      title="Create Store"
      description="Add a new store to manage productos and categories"
      onClose={close}
      isOpen={isOpen}
    >
      Hi
    </Modal>
  );
}
