import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://pzdebihuibuqqyvayjav.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB6ZGViaWh1aWJ1cXF5dmF5amF2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDY2NzkzNjEsImV4cCI6MjAyMjI1NTM2MX0.iikSQMtfNl9EI-JhZT2-jcETrsuVEwGRCgcTGt2tZtI";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;