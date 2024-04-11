import type {
  InsertPlanType,
  PinContentsType,
  PinType,
  PlanType,
  UserType,
} from './supabase';
import type { SelectedMenu } from '@/store/tabMenuStore';

export type PlanStatus = Omit<SelectedMenu, 'bookMark'> | 'recording';

export type PlanIdAndMatesInfoList = Record<string, UserType[]>;

export interface AddPlanObj {
  plan: InsertPlanType;
  pins: PinContentsType[][];
  invitedUser: UserType[];
}

export interface UpdatePlanObj extends AddPlanObj {
  originPins: PinType[] | null | undefined;
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
