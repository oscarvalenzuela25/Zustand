import { StateCreator } from 'zustand';

export interface ConfirmationSlice {
  isConfirm: boolean;

  setIsConfirm: (value: boolean) => void;
}

export const createConfirmationSlice: StateCreator<
  ConfirmationSlice
> = set => ({
  isConfirm: false,

  setIsConfirm: (value: boolean) => set(() => ({ isConfirm: value })),
});
