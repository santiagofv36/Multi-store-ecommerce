import { create } from 'zustand';

interface useModalInterface {
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

export const useModal = create<useModalInterface>((set) => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
}));

export type ModalReturn = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
};
