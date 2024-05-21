'use client';

import React from 'react';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider, MouseTransition, TouchTransition } from 'react-dnd-multi-backend';
import { TouchBackend } from 'react-dnd-touch-backend';

const HTML5ToTouch = {
  backends: [
    {
      id: 'html5',
      backend: HTML5Backend,
      transition: MouseTransition,
    },
    {
      id: 'touch',
      backend: TouchBackend,
      options: { enableMouseEvents: true },
      preview: true,
      transition: TouchTransition,
    },
  ],
};

const DragNDropProvider = ({ children }: { children: React.ReactNode }) => {
  return <DndProvider options={HTML5ToTouch}>{children}</DndProvider>;
};

export default DragNDropProvider;
