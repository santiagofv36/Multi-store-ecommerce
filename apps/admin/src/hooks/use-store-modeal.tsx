import { create } from 'zustand';

interface useStoreModalInterface {
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

export const useStoreModal = create<useStoreModalInterface>((set) => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
}));
