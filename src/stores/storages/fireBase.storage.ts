import { StateStorage, createJSONStorage } from 'zustand/middleware';

const firebaseUrl =
  'https://zustand-storage-89cc5-default-rtdb.firebaseio.com/zustand';

// Aca definimos el storage que vamos a usar para guardar el store en firebase
const customFirebaseStorage: StateStorage = {
  getItem: async function (name: string): Promise<string | null> {
    const data = await fetch(`${firebaseUrl}/${name}.json`).then(res =>
      res.json()
    );
    console.log(data);
    return JSON.stringify(data);
  },
  setItem: async function (name: string, value: string): Promise<void> {
    const data = await fetch(`${firebaseUrl}/${name}.json`, {
      method: 'PUT',
      body: value,
    }).then(res => res.json());
    console.log(data);
    return data;
  },
  removeItem: async function (name: string): Promise<void> {
    sessionStorage.removeItem(name);
  },
};

// Aca exportamos con el wrapper createJSONStorage
export const customfirebaseStorage = createJSONStorage(
  () => customFirebaseStorage
);
