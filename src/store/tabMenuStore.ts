import { create } from 'zustand';

export type SelectedMenu = 'bookMark' | 'traveling' | 'planning' | 'end';

interface Actions {
  setSelectedMenu: (menu: SelectedMenu) => void;
}

interface Store {
  selectedMenu: SelectedMenu;
  actions: Actions;
}

export const tabMenuStore = create<Store>((set) => ({
  selectedMenu: 'traveling',
  actions: {
    setSelectedMenu: (menu) => {
      set({ selectedMenu: menu });
    },
  },
}));

export const useTabMenuStoreState = () => tabMenuStore((store) => store.selectedMenu);
export const useTabMenuStoreActions = () => tabMenuStore((store) => store.actions);
