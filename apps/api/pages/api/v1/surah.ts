import supabase from "~/../../packages/supabaseconfig/supabase-client";
import AllowNextCors from "~/lib/NextCors";

export default async function Surah(req, res) {
  await AllowNextCors(req, res);
  const { data, error } = await supabase.from("surah").select();

  if (error) return res.json({ error });

  return res.json({ error: null, results: data });
}
