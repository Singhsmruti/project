import { createClient } from '@supabase/supabase-js'

// 1. We access the VITE_ variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY

// 2. We add a safety check (Optional but recommended for debugging)
if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase URL or Key. Check .env file.')
}

// 3. Create the client
export const supabase = createClient(supabaseUrl, supabaseKey)