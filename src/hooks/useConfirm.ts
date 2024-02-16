import { confirmStore } from '@/store/confirmStore';

const useConfirm = () => {
  const { openConfirm } = confirmStore();

  const confirm = {
    default: (title: string, desc: string, func: () => void) => {
      openConfirm(title, desc, '확인', func);
    },
    modify: (title: string, desc: string, func: () => void) => {
      openConfirm(title, desc, '수정하기', func);
    },
    delete: (title: string, desc: string, func: () => void) => {
      openConfirm(title, desc, '삭제하기', func);
    },
    quit: (title: string, desc: string, func: () => void) => {
      openConfirm(title, desc, '나가기', func);
    },
  };

  return confirm;
};

export default useConfirm;
