import { StateCreator, create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { customSessionStorage } from '../storages/session.storage';
import { useWeddingBoundStore } from '../wedding';
//import { customfirebaseStorage } from '../storages/fireBase.storage';

interface PersonState {
  firstName: string;
  lastName: string;

  setFirstName: (firstName: string) => void;
  setLastName: (lastName: string) => void;
}

const storeAPI: StateCreator<
  PersonState,
  [['zustand/devtools', unknown]]
> = set => ({
  firstName: '',
  lastName: '',

  setFirstName: (firstName: string) =>
    set(() => ({ firstName }), false, 'setFirstName'),
  setLastName: (lastName: string) =>
    set(() => ({ lastName }), false, 'setLastName'),
});

// Por defecto el store se guarda en localStorage
// Si agregamos el storage al objeto de configuración
// entonces podemos guardar el storage en otros lados
// como por ejemplo sessionStorage o fireBase
export const usePersonStore = create<PersonState>()(
  devtools(
    persist(storeAPI, {
      name: 'personStore',
      storage: customSessionStorage,
    })
  )
);

usePersonStore.subscribe(nextState => {
  const { firstName, lastName } = nextState;

  useWeddingBoundStore.getState().setFirstName(firstName);
  useWeddingBoundStore.getState().setLastName(lastName);
});
