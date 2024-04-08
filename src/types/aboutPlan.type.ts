import type { PinContentsType, PlanType, UserType } from './supabase';
import type { SelectedMenu } from '@/store/tabMenuStore';

export type PlanStatus = Omit<SelectedMenu, 'bookMark'> | 'recording';

export type UsersDataList = Record<string, UserType[]>;

export interface AddPlanObj {
  newPlan: PlanType;
  pins: PinContentsType[][];
  invitedUser: UserType[];
}

export interface QuitPlanParam {
  userId: string;
  planId: string;
}

export interface PlanCountList {
  bookMark: number;
  planning: number;
  traveling: number;
  end: number;
}

export interface UserAndPlanList {
  planDataList: PlanType[];
  usersDataList: UsersDataList[];
}
