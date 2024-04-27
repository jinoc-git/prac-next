'use client';

import React from 'react';

import type { ButtonCompProps } from '@/types/buttonComp.type';

interface Props extends ButtonCompProps {
  fill: boolean;
}

const ModalButton = (props: Props) => {
  const { value, fill, type, ariaLable, name, disabled, onClick } = props;

  const colors = (fill: boolean) => {
    if (fill) {
      return 'bg-navy text-white hover:bg-navy_light_3';
    } else {
      return 'border border-navy text-navy hover:bg-navy_light_1';
    }
  };

  return (
    <button
      type={type}
      aria-label={ariaLable}
      name={name}
      disabled={disabled}
      onClick={onClick}
      className={`modal-button ${colors(fill)} disabled:hover:bg-gray`}
    >
      {value}
    </button>
  );
};

export default ModalButton;
