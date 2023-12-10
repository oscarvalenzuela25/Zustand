import { StateStorage, createJSONStorage } from 'zustand/middleware';

// Aca definimos el storage que vamos a usar para guardar el store en sessionStorage
const customSessionStorageBase: StateStorage = {
  getItem: function (name: string): string | Promise<string | null> | null {
    const data = sessionStorage.getItem(name);
    return data;
  },
  setItem: function (name: string, value: string): void {
    sessionStorage.setItem(name, value);
  },
  removeItem: function (name: string): void | Promise<void> {
    sessionStorage.removeItem(name);
  },
};

// Aca exportamos con el wrapper createJSONStorage
export const customSessionStorage = createJSONStorage(
  () => customSessionStorageBase
);
