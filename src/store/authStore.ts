import { create } from 'zustand';

import { supabase } from '@/api/auth';

import type { UserType } from '@/types/supabase';

interface AuthStore {
  user: UserType | null;
  authObserver: () => void;
  setUser: (user: UserType) => void;
  resetUser: () => void;
}

export const authStore = create<AuthStore>((set, get) => {
  const authObserver = () => {
    supabase.auth.onAuthStateChange((event, session) => {
      const currentUser = get().user;
      if (session !== null && currentUser === null) {
        localStorage.setItem('isLogin', 'true');

        if (session.user.app_metadata.provider === 'google') {
          const {
            id,
            email,
            user_metadata: { name, nickname, profileImg },
          } = session.user;

          const user: UserType = {
            id,
            email: email as string,
            nickname: nickname ?? name,
            avatar_url: profileImg ?? null,
          };

          set({ user });
        } else {
          const {
            id,
            email,
            user_metadata: { nickname, profileImg },
          } = session.user;

          const user: UserType = {
            id,
            email: email as string,
            nickname,
            avatar_url: profileImg ?? null,
          };

          set({ user });
        }
      } else if (session === null) {
        localStorage.setItem('isLogin', 'false');
      }
    });
  };

  const setUser = (user: UserType) => {
    set({ user });
  };

  const resetUser = () => {
    set({ user: null });
  };

  return {
    user: null,
    authObserver,
    setUser,
    resetUser,
  };
});
