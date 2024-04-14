import type { PlanIdAndMatesInfoList } from '@/types/aboutPlan.type';
import type { BookMarkType, UserType } from '@/types/supabase';

export const cardListing =
  (
    bookMarkDataList: BookMarkType[],
    planIdAndMatesInfoList: PlanIdAndMatesInfoList[],
  ) =>
  (planId: string) => {
    const bookMarkData = bookMarkDataList.find(
      (bookMark: BookMarkType) => bookMark.plan_id === planId,
    );
    const participants = planIdAndMatesInfoList.find(
      (users: PlanIdAndMatesInfoList) => users[planId],
    )!;
    const avatarList = participants[planId].map(
      (user: UserType) => user.avatar_url,
    );
    const nicknameList = participants[planId].map(
      (user: UserType) => user.nickname,
    );

    return { bookMarkData, avatarList, nicknameList };
  };
