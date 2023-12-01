import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey)
  throw new Error(
    "Couldn't find your supabase client config. Please check if 'REACT_APP_SUPABASE_URL' and 'REACT_APP_SUPABASE_ANON_KEY' is properly set in your environment variables"
  );

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
