import React from 'react';

import Image from 'next/image';

export default function Logo() {
  return (
    <h1>
      <Image
        src="/images/img-traduler-logo-color-4x.webp"
        alt="logo"
        width={134}
        height={33}
      />
    </h1>
  );
}
