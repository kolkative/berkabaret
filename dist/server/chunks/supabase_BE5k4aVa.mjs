import { createClient } from '@supabase/supabase-js';

const supabaseAdmin = createClient(
  "https://xgsyfeppyqlixpybfopo.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhnc3lmZXBweXFsaXhweWJmb3BvIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3OTYzMDc5NCwiZXhwIjoyMDk1MjA2Nzk0fQ.a-B01NJi0NS6yavPsznhYfzk01T4jdrW24zKdG-2Kk8"
);

export { supabaseAdmin as s };
