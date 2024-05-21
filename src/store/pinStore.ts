import { create } from 'zustand';

import type { PinContentsType } from '@/types/supabase';

interface State {
  pin: PinContentsType | null;
  idx: number;
}

interface Actions {
  updateClick: (data: PinContentsType, idx: number) => void;
  resetPin: () => void;
}

interface Store {
  state: State;
  actions: Actions;
}

export const pinStore = create<Store>((set) => ({
  state: {
    pin: null,
    idx: 0,
  },
  actions: {
    updateClick: (data: PinContentsType, idx: number) => {
      set(() => ({
        state: {
          pin: {
            id: data.id,
            lat: data.lat,
            lng: data.lng,
            placeName: data.placeName,
            cost: data.cost,
            address: data.address,
          },
          idx,
        },
      }));
    },
    resetPin: () => {
      set(() => ({
        state: {
          pin: null,
          idx: 0,
        },
      }));
    },
  },
}));

export const usePinStoreState = () => pinStore((store) => store.state);
export const usePinStoreActions = () => pinStore((store) => store.actions);
