import type { RealtimePostgresInsertPayload } from '@supabase/supabase-js';

export type AlarmCallbackFuncArgs = RealtimePostgresInsertPayload<{ [key: string]: any }>;
export type AlarmCallbackFunc = (payload: AlarmCallbackFuncArgs) => void;
