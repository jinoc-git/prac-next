import { create } from 'zustand';

interface State {
  dates: string[];
}

interface Actions {
  setDates: (dates: string[]) => void;
  resetDates: () => void;
}

interface Store {
  state: State;
  actions: Actions;
}

export const dateStore = create<Store>((set) => ({
  state: {
    dates: [],
  },
  actions: {
    setDates: (dates: string[]) => {
      set({ state: { dates } });
    },
    resetDates: () => {
      set({ state: { dates: [] } });
    },
  },
}));

export const useDateStoreState = () => dateStore((store) => store.state);
export const useDateStoreActions = () => dateStore((store) => store.actions);
