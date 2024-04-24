import { create } from 'zustand';

interface State {
  isOpen: boolean;
  title: string;
  desc: string;
  buttonText: string;
  func: () => void;
}

interface ConfirmArgs {
  title: string;
  desc: string;
  buttonText: string;
  func: () => void;
}

interface Actions {
  openConfirm: (args: ConfirmArgs) => void;
  closeConfirm: () => void;
}

interface Store {
  state: State;
  actions: Actions;
}

const initState: State = {
  isOpen: false,
  title: '',
  desc: '',
  buttonText: '',
  func: () => {},
};

export const confirmStore = create<Store>((set, get) => ({
  state: initState,
  actions: {
    openConfirm: (args) => {
      set({ state: { isOpen: true, ...args } });
    },
    closeConfirm: () => {
      set({ state: initState });
    },
  },
}));

export const useConfirmStoreState = () => confirmStore((store) => store.state);
export const useConfirmStoreActions = () =>
  confirmStore((store) => store.actions);
