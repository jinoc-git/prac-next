import type { PlanType, UserType } from './supabase';

// 옮길 예정
export interface PinContentsType {
  id?: string;
  lat?: number;
  lng?: number;
  placeName?: string;
  cost?: string | null;
  address?: string;
  distance?: number | undefined;
}

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
