import { create } from 'zustand';

import type { PinContentsType } from '@/types/supabase';

interface PinStoreType {
  pin: PinContentsType | null;
  idx: number;
  updateClick: (data: PinContentsType, idx: number) => void;
  resetPin: () => void;
}

export const pinStore = create<PinStoreType>((set) => ({
  pin: null,
  idx: 0,
  updateClick: (data: PinContentsType, idx: number) => {
    set(() => ({
      pin: {
        lat: data.lat,
        lng: data.lng,
        placeName: data.placeName,
        cost: data.cost,
      },
      idx,
    }));
  },
  resetPin: () => {
    set(() => ({
      pin: null,
      idx: 0,
    }));
  },
}));
