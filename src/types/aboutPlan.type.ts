import type {
  InsertPlanType,
  PinContentsType,
  PinType,
  PlanType,
  UserType,
} from './supabase';

export type PlanStatus = 'planning' | 'traveling' | 'recording' | 'end';

export type PlanIdAndMatesInfoList = Record<string, UserType[]>;

export interface AddPlanObj {
  plan: InsertPlanType;
  pins: PinContentsType[][];
  invitedUser: UserType[];
}

export interface UpdatePlanObj extends AddPlanObj {
  originPins: PinType[];
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
  planIdAndMatesInfoList: PlanIdAndMatesInfoList[];
}
