import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

import type { Database } from '@/types/supabase';

const supabaseClientClient = createClientComponentClient<Database>();
