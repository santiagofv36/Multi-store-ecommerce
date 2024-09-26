import { Button, Modal } from '../ui';

interface AlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loading: boolean;
}

export function AlertModal({
  isOpen,
  onClose,
  onConfirm,
  loading,
}: AlertModalProps) {
  return (
    <Modal
      title="Are you sure?"
      description="This action cannot be undone."
      onClose={onClose}
      isOpen={isOpen}
    >
      <div className="flex pt-6 space-x-2 items-center justify-end w-full">
        <Button variant="outline" onClick={onClose} disabled={loading}>
          Cancel
        </Button>
        <Button variant="destructive" onClick={onConfirm} disabled={loading}>
          Continue
        </Button>
      </div>
    </Modal>
  );
}
