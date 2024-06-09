import React from 'react';

const useModal = () => {
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

  return { isOpenModal, isAnimate, handleOpenModal, handleCloseModal };
};

export default useModal;
