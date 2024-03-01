import type { BookMarkType, PlanType, UserType } from '@/types/supabase';

export const sideBarCallback = {
  sorting: (a: PlanType, b: PlanType) =>
    new Date(a.dates[0]).getTime() - new Date(b.dates[0]).getTime(),
  filtering: (status: string) => (plan: PlanType) => {
    if (status === 'planning') {
      return plan.plan_state === status;
    }
    if (status === 'traveling') {
      return plan.plan_state === status;
    }
    if (status === 'end') {
      return plan.plan_state === status || plan.plan_state === 'recording';
    }
  },
};

export const tabMenuCallback = (selectedMenu: string) => {
  return {
    filtering: (bookMarkPlanIdList: string[]) => (plan: PlanType) => {
      if (selectedMenu === 'bookMark') {
        return bookMarkPlanIdList.find((id) => id === plan.id);
      }
      if (selectedMenu === 'end') {
        return (
          (plan.plan_state === selectedMenu && !plan.isDeleted) ||
          (plan.plan_state === 'recording' && !plan.isDeleted)
        );
      }
      return plan.plan_state === selectedMenu && !plan.isDeleted;
    },
    sorting: (bookMarkData: BookMarkType[]) => (a: PlanType, b: PlanType) => {
      if (selectedMenu === 'bookMark') {
        const bookMarkA = bookMarkData.find(
          (bookMark) => bookMark.plan_id === a.id,
        )!;
        const bookMarkB = bookMarkData.find(
          (bookMark) => bookMark.plan_id === b.id,
        )!;
        return (
          new Date(bookMarkA.created_at).getTime() -
          new Date(bookMarkB.created_at).getTime()
        );
      }
      return new Date(a.dates[0]).getTime() - new Date(b.dates[0]).getTime();
    },
    counting: (plan: PlanType) => {
      if (selectedMenu === 'end') {
        return plan.plan_state === 'end' || plan.plan_state === 'recording';
      }

      return plan.plan_state === selectedMenu;
    },
  };
};

export const searchCallback = {
  isNotInvite:
    (searchedPeople: UserType[]) => (user: UserType, idx: number) => {
      return searchedPeople[idx]?.id !== user?.id;
    },
  cancelInvite: (idx: number) => (_: UserType, index: number) => index !== idx,
  excludeInvitedUsers: (invitedUser: UserType[]) => (person: UserType) => {
    return invitedUser.filter((user) => user.id === person.id).length === 0;
  },
};
