import { create } from 'zustand';

export type SelectedMenu = 'bookMark' | 'traveling' | 'planning' | 'end';

interface TabMenuStore {
  selectedMenu: SelectedMenu;
  setSelectedMenu: (plan: SelectedMenu) => void;
}

export const tabMenuStore = create<TabMenuStore>((set) => ({
  selectedMenu: 'traveling',
  setSelectedMenu: (plan) => {
    set({ selectedMenu: plan });
  },
}));
