import { create } from 'zustand';

import type { UserType } from '@/types/supabase';

interface State {
  oldInvitedUser: UserType[];
  invitedUser: UserType[];
}

interface Actions {
  initUser: (data: UserType[]) => void;
  inviteUser: (data: UserType) => void;
  removeUser: (targetIdx: number) => void;
  resetInvitedUser: () => void;
  syncInvitedUser: () => void;
}

interface Store {
  state: State;
  actions: Actions;
}

export const inviteUserStore = create<Store>((set, get) => ({
  state: {
    oldInvitedUser: [],
    invitedUser: [],
  },
  actions: {
    initUser: (data: UserType[]) => {
      set(() => ({
        state: {
          invitedUser: data,
          oldInvitedUser: data,
        },
      }));
    },
    inviteUser: (data: UserType) => {
      const oldInvitedUser = get().state.invitedUser;
      const isExist = oldInvitedUser.find((user) => user.id === data.id);
      if (isExist != null) return;

      set(({ state }) => ({
        state: {
          ...state,
          invitedUser: [...state.invitedUser, data],
        },
      }));
    },
    removeUser: (targetIdx: number) => {
      const currentUser = get().state.invitedUser;
      const removedUser = currentUser.filter((_, idx) => idx !== targetIdx);

      set(({ state }) => ({
        state: {
          oldInvitedUser: state.oldInvitedUser,
          invitedUser: removedUser,
        },
      }));
    },
    resetInvitedUser: () => {
      set(() => ({
        state: {
          oldInvitedUser: [],
          invitedUser: [],
        },
      }));
    },
    syncInvitedUser: () => {
      set(({ state }) => ({
        state: {
          ...state,
          oldInvitedUser: state.invitedUser,
        },
      }));
    },
  },
}));

export const useInviteUserStoreState = () => inviteUserStore((store) => store.state);
export const useInviteUserStoreActions = () => inviteUserStore((store) => store.actions);

export const subInvite = inviteUserStore.subscribe((store) => {
  return store.state.invitedUser;
});
