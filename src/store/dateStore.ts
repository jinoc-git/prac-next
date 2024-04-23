import { create } from 'zustand';

interface Store {
  state: {
    oldDates: string[];
    dates: string[];
  };
  actions: {
    setDates: (data: string[]) => void;
    resetDates: () => void;
  };
}

export const dateStore = create<Store>((set) => ({
  state: {
    oldDates: [],
    dates: [],
  },
  actions: {
    setDates: (data: string[]) => {
      set(({ state }) => ({
        state: {
          oldDates: state.dates,
          dates: data,
        },
      }));
    },
    resetDates: () => {
      set({ state: { oldDates: [], dates: [] } });
    },
  },
}));

export const useDateStoreState = () => dateStore((store) => store.state);
export const useDateStoreActions = () => dateStore((store) => store.actions);
