import { useConfirmStoreActions } from '@/store/confirmStore';

const useConfirm = () => {
  const { openConfirm } = useConfirmStoreActions();

  const confirm = {
    default: (title: string, desc: string, func: () => void) => {
      openConfirm({ title, desc, buttonText: '확인', func });
    },
    modify: (title: string, desc: string, func: () => void) => {
      openConfirm({ title, desc, buttonText: '수정하기', func });
    },
    delete: (title: string, desc: string, func: () => void) => {
      openConfirm({ title, desc, buttonText: '삭제하기', func });
    },
    quit: (title: string, desc: string, func: () => void) => {
      openConfirm({ title, desc, buttonText: '나가기', func });
    },
  };

  return confirm;
};

export default useConfirm;
