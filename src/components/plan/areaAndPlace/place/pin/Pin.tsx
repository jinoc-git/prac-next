'use client';

import React from 'react';
import type { XYCoord } from 'react-dnd';
import { useDrag, useDrop } from 'react-dnd';

import { type Identifier } from 'dnd-core';
import { usePathname } from 'next/navigation';

import PinContents from './pinContents/PinContents';
import PinDistance from './pinDistance/PinDistance';
import PinOrder from './pinOrder/PinOrder';

import type { PinContentsType } from '@/types/supabase';

interface ItemType {
  id: string;
  idx: number;
}

interface Props {
  pin: PinContentsType;
  idx: number;
  distance?: string;
  dragArea?: React.ReactNode;
  isModify?: boolean;
  movePins?: (beforeIdx: number, afterIdx: number) => void;
  handleUpdate?: (idx: number) => void;
  handleDelete?: (idx: number) => void;
}

const Pin = (props: Props) => {
  const { pin, idx, distance, isModify, movePins, handleUpdate, handleDelete } = props;

  const pathname = usePathname();
  const isEnding = pathname.split('/')[1] === 'ending';

  const dragBoxRef = React.useRef<HTMLLIElement>(null);

  const [{ handlerId }, drop] = useDrop<ItemType, void, { handlerId: Identifier | null }>({
    accept: 'pin',
    collect: (monitor) => ({
      handlerId: monitor.getHandlerId(),
    }),
    hover: (item, moniter) => {
      if (dragBoxRef.current === null) return;

      const dragIndex = item.idx;
      const hoverIndex = idx;

      if (dragIndex === hoverIndex) return;

      const hoverBoundingRect = dragBoxRef.current.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = moniter.getClientOffset();
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return;
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return;

      if (movePins) movePins(dragIndex, hoverIndex);

      item.idx = idx;
    },
  });

  const [{ isDragging }, dragRef, previewRef] = useDrag({
    type: 'pin',
    item: () => {
      return { id: pin.id, idx };
    },
    collect: (moniter) => ({
      isDragging: moniter.isDragging(),
    }),
    end: (item, moniter) => {
      const didDrop = moniter.didDrop();

      if (didDrop) {
        // changeOrderAtDidDrop();
      }
    },
  });

  drop(previewRef(dragBoxRef));

  return (
    <li
      ref={dragBoxRef}
      data-handler-id={handlerId}
      className={`relative flex items-center justify-between gap-4 ${
        isDragging ? 'opacity-30' : 'opacity-100'
      }
      sm:w-[286px] sm:mb-[37px] 
      md:w-[651px] md:mx-[25px] md:ml-0`}
    >
      <PinOrder idx={idx} />
      <PinDistance distance={distance} />
      <PinContents
        idx={idx}
        pin={pin}
        isEnding={isEnding}
        isModify={isModify}
        dragRef={dragRef}
        handleUpdate={handleUpdate}
        handleDelete={handleDelete}
      />
    </li>
  );
};

export default Pin;
