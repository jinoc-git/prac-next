import { create } from 'zustand';

import type { UserType } from '@/types/supabase';

interface State {
  oldInvitedUser: UserType[];
  invitedUser: UserType[];
}

interface Actions {
  inviteUser: (data: UserType) => void;
  resetInvitedUser: () => void;
  setUser: (data: UserType[]) => void;
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
    resetInvitedUser: () => {
      set(() => ({
        state: {
          oldInvitedUser: [],
          invitedUser: [],
        },
      }));
    },
    setUser: (data: UserType[]) => {
      set(({ state }) => ({
        state: {
          oldInvitedUser: state.invitedUser,
          invitedUser: [...data],
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

export const useInviteUserStoreState = () =>
  inviteUserStore((store) => store.state);
export const useInviteUserStoreActions = () =>
  inviteUserStore((store) => store.actions);

export const subInvite = inviteUserStore.subscribe((store) => {
  return store.state.invitedUser;
});
