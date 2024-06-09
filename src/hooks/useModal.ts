import React from 'react';

const useModal = () => {
  const modalBGRef = React.useRef<HTMLDialogElement | null>(null);

  const [isOpenModal, setIsOpenModal] = React.useState<boolean>(false);
  const [isAnimate, setIsAnimate] = React.useState<boolean>(true);

  const handleOpenModal = React.useCallback(() => {
    setIsAnimate(true);
    setIsOpenModal(true);
  }, []);

  const handleCloseModal = React.useCallback(() => {
    setIsAnimate(false);
    setTimeout(() => {
      setIsOpenModal(false);
    }, 400);
  }, []);

  const onClickModalBG = React.useCallback(
    (e: React.MouseEvent<HTMLDialogElement, MouseEvent>) => {
      if (e.target === modalBGRef.current) handleCloseModal();
    },
    [modalBGRef],
  );

  return { modalBGRef, isOpenModal, isAnimate, handleOpenModal, handleCloseModal, onClickModalBG };
};

export default useModal;
