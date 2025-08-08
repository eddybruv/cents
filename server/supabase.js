// supabase.js
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_API_KEY

console.log({ supabaseUrl, supabaseAnonKey, mode: import.meta.env.MODE })

export const supabase = createClient(supabaseUrl, supabaseAnonKey)