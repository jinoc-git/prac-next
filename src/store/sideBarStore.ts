import { create } from 'zustand';

interface State {
  isSideBarOpen: boolean;
  isVisibleSideBar: boolean;
  isNotFoundPage: boolean;
}

interface Actoins {
  toggleMenu: () => void;
  setMenuIsOpen: (val: boolean) => void;
  setVisibilitySideBar: (val: boolean) => void;
  setIsNotFoundPage: (val: boolean) => void;
}

interface Store {
  state: State;
  actions: Actoins;
}

export const sideBarStore = create<Store>((set) => ({
  state: {
    isSideBarOpen: false,
    isVisibleSideBar: false,
    isErrorPage: false,
    isNotFoundPage: false,
  },
  actions: {
    toggleMenu: () => {
      set(({ state }) => ({
        state: { ...state, isSideBarOpen: !state.isSideBarOpen },
      }));
    },
    setMenuIsOpen: (val) => {
      set(({ state }) => ({ state: { ...state, isSideBarOpen: val } }));
    },
    setVisibilitySideBar: (val: boolean) => {
      set(({ state }) => ({ state: { ...state, isVisibleSideBar: val } }));
    },
    setIsNotFoundPage: (val: boolean) => {
      set(({ state }) => ({ state: { ...state, isNotFoundPage: val } }));
    },
  },
}));

export const useSideBarStoreState = () => sideBarStore((store) => store.state);
export const useSideBarStoreActions = () =>
  sideBarStore((store) => store.actions);
