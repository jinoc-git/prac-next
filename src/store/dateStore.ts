import { create } from 'zustand';

interface dateStoreType {
  oldDates: string[];
  dates: string[];
  setDates: (data: string[]) => void;
  resetDates: () => void;
}

export const dateStore = create<dateStoreType>((set) => ({
  oldDates: [],
  dates: [],
  setDates: (data: string[]) => {
    set((state) => ({
      oldDates: state.dates,
      dates: data,
    }));
  },
  resetDates: () => {
    set(() => ({
      oldDates: [],
      dates: [],
    }));
  },
}));
