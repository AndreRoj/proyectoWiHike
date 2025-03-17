import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://kpdtaamfpxohcygwpzqb.supabase.co"
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtwZHRhYW1mcHhvaGN5Z3dwenFiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDExMzQzMDYsImV4cCI6MjA1NjcxMDMwNn0.wyYuEYi0Se-2XdGa2Ru0K2vbEphrQEStKW1Oyi2-JnM"


export const supabase = createClient(supabaseUrl, supabaseKey)