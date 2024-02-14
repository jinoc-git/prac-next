import type { UsersDataList } from '@/types/aboutPlan';
import type { BookMarkType, UserType } from '@/types/supabase';

export const cardListing =
  (bookMarkData: BookMarkType[], usersDataList: UsersDataList[]) =>
  (planId: string) => {
    const isBookMark = bookMarkData.find(
      (bookMark: BookMarkType) => bookMark.plan_id === planId,
    );
    const participants = usersDataList.find(
      (users: UsersDataList) => users[planId],
    )!;
    const avatarList = participants[planId].map(
      (user: UserType) => user.avatar_url,
    );
    const nicknameList = participants[planId].map(
      (user: UserType) => user.nickname,
    );

    return { isBookMark, avatarList, nicknameList };
  };
