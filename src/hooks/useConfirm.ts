import { confirmStore } from '@/store/confirmStore';

import type { ConfirmDesc } from '@/store/confirmStore';

const useConfirm = () => {
  const { openConfirm } = confirmStore();

  const confirm = {
    default: (title: string, desc: ConfirmDesc, func: () => void) => {
      openConfirm(title, desc, 'default', func);
    },
    modify: (title: string, desc: ConfirmDesc, func: () => void) => {
      openConfirm(title, desc, 'modify', func);
    },
    delete: (title: string, desc: ConfirmDesc, func: () => void) => {
      openConfirm(title, desc, 'delete', func);
    },
    quit: (title: string, desc: ConfirmDesc, func: () => void) => {
      openConfirm(title, desc, 'quit', func);
    },
  };
  return { confirm };
};

export default useConfirm;
