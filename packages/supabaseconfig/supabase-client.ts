import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://mieeuwqnxldfwsnwwovq.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYyOTE3MDIzNSwiZXhwIjoxOTQ0NzQ2MjM1fQ.TyY42cmncBmZCD7J_LJFqVTdPy4dlv3B7QYhXWI9SDs",
);

export default supabase;
