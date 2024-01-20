'use client';

import React from 'react';

import { sideBarStore } from '@/store/sideBarStore';

import SideBarIcon from './SideBarIcon';

export default function SideBar() {
  const { isVisibleSideBar, isSideBarOpen } = sideBarStore();

  return isVisibleSideBar ? (
    <>
      <SideBarIcon />
      <aside>
        <div></div>
      </aside>
    </>
  ) : null;
}
