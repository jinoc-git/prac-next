import { create } from 'zustand';

interface State {
  oldDates: string[];
  dates: string[];
}

interface Actions {
  setDates: (data: string[]) => void;
  resetDates: () => void;
}

interface Store {
  state: State;
  actions: Actions;
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
