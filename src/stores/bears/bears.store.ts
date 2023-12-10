import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface Bear {
  id: number;
  name: string;
}

interface BearState {
  blackBears: number;
  polarBear: number;
  pandaBear: number;

  bears: Bear[];

  totalBears: () => number;
  increaseBlackBear: (by: number) => void;
  increasePolarBear: (by: number) => void;
  increasePandaBear: (by: number) => void;

  doNothing: () => void;
  addBear: () => void;
  clearBears: () => void;
}

const useBearStore = create<BearState>()(
  devtools(
    persist(
      (set, get) => ({
        blackBears: 0,
        polarBear: 0,
        pandaBear: 0,
        bears: [{ id: 1, name: 'Oso #1' }],

        totalBears: () => {
          const { blackBears, polarBear, pandaBear, bears } = get();
          return blackBears + polarBear + pandaBear + bears.length;
        },
        increaseBlackBear: (by: number) =>
          set(state => ({ blackBears: state.blackBears + by })),
        increasePolarBear: (by: number) =>
          set(state => ({ polarBear: state.polarBear + by })),
        increasePandaBear: (by: number) =>
          set(state => ({ pandaBear: state.pandaBear + by })),
        doNothing: () => set(state => ({ bears: [...state.bears] })),
        addBear: () =>
          set(state => ({
            bears: [
              ...state.bears,
              {
                id: state.bears.length + 1,
                name: `Oso #${state.bears.length + 1}`,
              },
            ],
          })),
        clearBears: () => set(() => ({ bears: [] })),
      }),
      {
        name: 'bearStore',
      }
    )
  )
);

export default useBearStore;
