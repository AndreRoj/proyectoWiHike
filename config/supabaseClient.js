import dotenv from 'dotenv'
import { createClient } from '@supabase/supabase-js'

dotenv.config()

const supabaseUrl = import.meta.env.REACT_APP_SUPABASE_URL
const supabaseKey = import.meta.env.REACT_APP_ANON_KEY

const supabase = createClient(supabaseUrl, supabaseKey)
export default supabase