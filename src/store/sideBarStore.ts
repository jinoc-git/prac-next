import { create } from 'zustand';

interface SideBarStore {
  isSideBarOpen: boolean;
  isVisibleSideBar: boolean;
  isNotFoundPage: boolean;

  toggleMenu: () => void;
  setMenuIsOpen: (val: boolean) => void;
  setVisibilitySideBar: (val: boolean) => void;
  setIsNotFoundPage: (val: boolean) => void;
}

export const sideBarStore = create<SideBarStore>((set) => ({
  isSideBarOpen: false,
  isVisibleSideBar: false,
  isErrorPage: false,
  isNotFoundPage: false,

  toggleMenu: () => {
    set((state) => ({ isSideBarOpen: !state.isSideBarOpen }));
  },
  setMenuIsOpen: (val) => {
    set({ isSideBarOpen: val });
  },
  setVisibilitySideBar: (val: boolean) => {
    set({ isVisibleSideBar: val });
  },
  setIsNotFoundPage: (val: boolean) => {
    set({ isNotFoundPage: val });
  },
}));
