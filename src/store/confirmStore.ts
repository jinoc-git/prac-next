import { create } from 'zustand';

type ConfirmDesc = 'default' | 'modify' | 'delete' | 'quit';

interface confirmStoreType {
  isOpen: boolean;
  title: string;
  desc: ConfirmDesc;
  buttonText: string;
  func: () => void;
  openConfirm: (
    title: string,
    description: ConfirmDesc,
    buttonText: string,
    func: () => void,
  ) => void;
  closeConfirm: () => void;
}

export const confirmStore = create<confirmStoreType>((set) => ({
  isOpen: false,
  title: '',
  desc: 'default',
  buttonText: '',
  func: () => {},
  openConfirm: (
    title: string,
    desc: ConfirmDesc,
    buttonText: string,
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
