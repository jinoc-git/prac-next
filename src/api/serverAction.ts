import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

import type { Database, PlanType } from '@/types/supabase';

const supabaseServerClient = createServerComponentClient<Database>({ cookies });

export const getSessionFromServer = async () => {
  const {
    data: { session },
  } = await supabaseServerClient.auth.getSession();

  return session;
};

export const getPlanByIdFromServer = async (planId: string) => {
  const { data: plan, error } = await supabaseServerClient
    .from('plans')
    .select()
    .eq('id', planId)
    .single();

  return plan;
};

export const getAllPinsByPlanFromServer = async (plan: PlanType | null) => {
  if (plan === null) return null;

  const { data, error } = await supabaseServerClient
    .from('pins')
    .select()
    .eq('plan_id', plan.id)
    .in('date', plan.dates)
    .order('date', { ascending: true });

  return data;
};
