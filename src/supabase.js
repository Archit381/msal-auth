import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://hyocsjnzkqeecdlvbhvn.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh5b2Nzam56a3FlZWNkbHZiaHZuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDU2ODU4OTUsImV4cCI6MjAyMTI2MTg5NX0.eBLD1OY02E-kv1VPuOapFFNvHRDaSIfbv4E41xT7kdg";

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
