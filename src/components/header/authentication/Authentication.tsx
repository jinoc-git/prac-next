import React from 'react';

import Link from 'next/link';

export default function Authentication() {
  return (
    <div>
      <Link href="/signin">로그인</Link>
      <Link href="/signup">회원가입</Link>
    </div>
  );
}
