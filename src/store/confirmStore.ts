import { create } from 'zustand';

type ConfirmBtnText = 'default' | 'modify' | 'delete' | 'quit';

interface confirmStoreType {
  isOpen: boolean;
  title: string;
  desc: string;
  buttonText: ConfirmBtnText;
  func: () => void;
  openConfirm: (
    title: string,
    description: string,
    buttonText: ConfirmBtnText,
    func: () => void,
  ) => void;
  closeConfirm: () => void;
}

export const confirmStore = create<confirmStoreType>((set) => ({
  isOpen: false,
  title: '',
  desc: '',
  buttonText: 'default',
  func: () => {},
  openConfirm: (
    title: string,
    desc: string,
    buttonText: ConfirmBtnText,
    func: () => void,
  ) => {
    set(() => ({
      isOpen: true,
      title,
      desc,
      buttonText,
      func,
    }));
  },
  closeConfirm: () => {
    set(() => ({
      isOpen: false,
      title: '',
      desc: 'default',
    }));
  },
}));
