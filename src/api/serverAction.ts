'use server';

import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

import type { Database, EndingPlanType, PlanType } from '@/types/supabase';

export const getSessionFromServer = async () => {
  const supabaseServerClient = createServerComponentClient<Database>({ cookies });

  const {
    data: { session },
  } = await supabaseServerClient.auth.getSession();

  return session;
};

export const getPlanByIdFromServer = async (planId: string) => {
  const supabaseServerClient = createServerComponentClient<Database>({ cookies });

  const { data, error } = await supabaseServerClient
    .from('plans')
    .select()
    .eq('id', planId)
    .single();

  return data;
};

export const getAllPinsByPlanFromServer = async (plan: PlanType | EndingPlanType) => {
  const supabaseServerClient = createServerComponentClient<Database>({ cookies });

  const { data, error } = await supabaseServerClient
    .from('pins')
    .select()
    .eq('plan_id', plan.id)
    .in('date', plan.dates)
    .order('date', { ascending: true });

  if (error) throw new Error(error.message);

  return data;
};

export const getEndingPlanFromServer = async (planId: string) => {
  const supabaseServerClient = createServerComponentClient<Database>({ cookies });

  const { data, error } = await supabaseServerClient
    .from('plans_ending')
    .select()
    .eq('id', planId)
    .single();

  if (error) throw new Error(error.message);

  return data;
};
