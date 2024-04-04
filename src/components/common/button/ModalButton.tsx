'use client';

import React from 'react';

interface Props {
  value: string;
  fill: boolean;
  type: 'submit' | 'reset' | 'button';
  ariaLable?: string;
  name?: string;
  disabled?: boolean;
  onClick: (...arg: any[]) => any;
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
