// supabase.js
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_API_KEY;

export const supabaseClient = createClient(supabaseUrl, supabaseAnonKey);
