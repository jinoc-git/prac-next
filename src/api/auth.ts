import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { uuid } from '@supabase/gotrue-js/dist/module/lib/helpers';

import { type Database, type UserType } from '@/types/supabase';

const supabaseClientClient = createClientComponentClient<Database>();

export { supabaseClientClient };

export const signUpWithSB = async (email: string, password: string, nickname: string) => {
  const { data, error: authError } = await supabaseClientClient.auth.signUp({
    email,
    password,
    options: {
      data: {
        nickname,
      },
    },
  });

  const isAuthError = Boolean(authError);
  if (isAuthError) {
    return authError;
  }

  const id = data.user?.id;
  const user = {
    id: id as string,
    email,
    nickname,
  };

  const res = await insertUser(user);

  const isUsersTableError = Boolean(res);
  if (isUsersTableError) {
    return res;
  }
};

export const insertUser = async (user: UserType) => {
  const { id, email, nickname } = user;

  const { error } = await supabaseClientClient.from('users').insert({
    id,
    email,
    nickname,
  });

  if (error) throw error;
};

export const signInWithSB = async (email: string, password: string) => {
  const { error: authError } = await supabaseClientClient.auth.signInWithPassword({
    email,
    password,
  });

  const isAuthError = Boolean(authError);
  if (isAuthError) {
    return authError;
  }
};

export const signInWithGoogle = async () => {
  await supabaseClientClient.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: 'http://localhost:3000/authloading',
      queryParams: {
        access_type: 'offline',
        prompt: 'consent',
      },
    },
  });
};

export const checkGoogleUser = async () => {
  const {
    data: { session },
  } = await supabaseClientClient.auth.getSession();

  if (session) {
    const {
      id,
      email,
      user_metadata: { name: nickname },
    } = session.user;

    const { data: check } = await supabaseClientClient.from('users').select('id').eq('id', id);

    if (check && check.length === 0) {
      const user = {
        id,
        email: email as string,
        nickname,
      };

      await insertUser(user);
    }
  }
};

export const signOutForSB = async () => {
  await supabaseClientClient.auth.signOut();
};

export const uploadProfileImg = async (avatarFile: File, email: string) => {
  const { data, error } = await supabaseClientClient.storage
    .from('profile_img')
    .upload(`${email}/${uuid()}`, avatarFile, {
      cacheControl: '3600',
      upsert: false,
    });

  if (error) throw new Error('프로필 사진 업로드 오류');

  return data.path;
};

export const updateUserProfileImage = async (path: string, userId: string) => {
  const URL = `${process.env.NEXT_PUBLIC_SB_STORAGE_URL as string}/profile_img/${path}`;

  const { data, error } = await supabaseClientClient.auth.updateUser({
    data: { profileImg: URL },
  });

  const { error: tableError } = await supabaseClientClient
    .from('users')
    .update({ avatar_url: URL })
    .eq('id', userId)
    .select();

  if (error || tableError) throw new Error('프로필 업데이트 오류');

  const { id, email, user_metadata } = data.user;

  return {
    id,
    email: email as string,
    nickname: user_metadata.nickname as string,
    profileImg: user_metadata.profileImg ? (user_metadata.profileImg as string) : '',
  };
};

export const deleteUserProfileImg = async (userId: string) => {
  const { data, error } = await supabaseClientClient.auth.updateUser({
    data: { profileImg: null },
  });

  const { error: tableError } = await supabaseClientClient
    .from('users')
    .update({ avatar_url: null })
    .eq('id', userId)
    .select();

  if (error || tableError) throw new Error('아바타 삭제 오류');

  const { id, email, user_metadata } = data.user;

  return {
    id,
    email: email as string,
    nickname: user_metadata.nickname as string,
    profileImg: user_metadata.profileImg ? (user_metadata.profileImg as string) : '',
  };
};

export const checkUserNickname = async (nickname: string) => {
  const { data, error } = await supabaseClientClient
    .from('users')
    .select('nickname')
    .eq('nickname', nickname);

  if (error) throw new Error('닉네임 중복 확인 오류');

  if (data.length === 0) return true;
  else return false;
};

export const checkUserEmail = async (email: string) => {
  const { data, error } = await supabaseClientClient
    .from('users')
    .select('email')
    .eq('email', email);

  if (error) throw new Error('이메일 중복 확인 오류');

  const isOk = data.length === 0;
  if (isOk) return true;

  return false;
};

export const updateUserNickname = async (nickname: string, userId: string) => {
  const { data, error } = await supabaseClientClient.auth.updateUser({
    data: { nickname },
  });

  const { error: tableError } = await supabaseClientClient
    .from('users')
    .update({ nickname })
    .eq('id', userId)
    .select();

  if (error || tableError) throw new Error('닉네임 업데이트 오류');

  const { id, email, user_metadata } = data.user;

  return {
    id,
    email: email as string,
    nickname: user_metadata.nickname as string,
    profileImg: user_metadata.profileImg ? (user_metadata.profileImg as string) : '',
  };
};

export const getUserInfoWithId = async (id: string) => {
  const { data, error } = await supabaseClientClient.from('users').select().eq('id', id);

  if (error) throw new Error(error.message);

  return data;
};

export const getUserInfoWithIdList = async (userIdList: string[]) => {
  const { data, error } = await supabaseClientClient.from('users').select().in('id', userIdList);

  if (error) throw new Error(error.message);

  return data;
};
