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
  const { data, error } = await supabaseServerClient
    .from('plans')
    .select()
    .eq('id', planId)
    .single();

  return data;
};

export const getAllPinsByPlanFromServer = async (plan: PlanType) => {
  const { data, error } = await supabaseServerClient
    .from('pins')
    .select()
    .eq('plan_id', plan.id)
    .in('date', plan.dates)
    .order('date', { ascending: true });

  if (error) throw new Error(error.message);

  return data;
};
