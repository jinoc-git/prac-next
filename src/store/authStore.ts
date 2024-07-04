import { create } from 'zustand';

import { createClientFromClient } from '@/utils/supabase/client';

import type { UserType } from '@/types/supabase';

interface Actions {
  authObserver: () => void;
  setUser: (user: UserType) => void;
  resetUser: () => void;
}

interface Store {
  user: UserType | null;
  actions: Actions;
}

export const authStore = create<Store>((set, get) => ({
  user: null,
  actions: {
    authObserver: async () => {
      const supabaseClientClient = createClientFromClient();
      const {
        data: { user: newUser },
      } = await supabaseClientClient.auth.getUser();

      const currentUser = get().user;
      if (newUser !== null && currentUser === null) {
        if (newUser.app_metadata.provider === 'google') {
          const {
            id,
            email,
            user_metadata: { name, nickname, profileImg },
          } = newUser;

          const user: UserType = {
            id,
            email: email as string,
            nickname: nickname ?? name,
            avatar_url: profileImg ?? null,
          };

          set({ user });
        } else if (newUser.app_metadata.provider === 'kakao') {
          const {
            id,
            email,
            user_metadata: { name, user_name, avatar_url },
          } = newUser;

          const user: UserType = {
            id,
            email: email as string,
            nickname: name ?? user_name,
            avatar_url: avatar_url ?? null,
          };

          set({ user });
        } else {
          const {
            id,
            email,
            user_metadata: { nickname, profileImg },
          } = newUser;

          const user: UserType = {
            id,
            email: email as string,
            nickname,
            avatar_url: profileImg ?? null,
          };

          set({ user });
        }
      }
    },

    setUser: (user: UserType) => {
      set({ user });
    },

    resetUser: () => {
      set({ user: null });
    },
  },
}));

export const useAuthStoreState = () => authStore((store) => store.user);
export const useAuthStoreActions = () => authStore((store) => store.actions);
