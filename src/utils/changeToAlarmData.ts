import type { InsertInviteAlarmType, InsertPlanType, UserType } from '@/types/supabase';

export interface ChangeToAlarmDataArgs {
  currentUser: UserType;
  plan: InsertPlanType;
  invitedUser: UserType[];
  oldUser?: UserType[];
}

export const changeToAlarmData = ({
  currentUser,
  plan,
  invitedUser,
  oldUser,
}: ChangeToAlarmDataArgs) => {
  const result: InsertInviteAlarmType[] = [];

  if (!oldUser) {
    for (let user of invitedUser) {
      if (user.id === currentUser.id) continue;

      const alarmData: InsertInviteAlarmType = {
        invite_from: currentUser.id,
        invite_to: user.id,
        from_nickname: currentUser.nickname,
        invite_planId: plan.id,
        plan_title: plan.title,
      };

      result.push(alarmData);
    }
  } else {
    for (let user of invitedUser) {
      const isExist = oldUser.find(({ id }) => id === user.id);
      if (!isExist) {
        const alarmData: InsertInviteAlarmType = {
          invite_from: currentUser.id,
          invite_to: user.id,
          from_nickname: currentUser.nickname,
          invite_planId: plan.id,
          plan_title: plan.title,
        };

        result.push(alarmData);
      }
    }
  }

  return result;
};
