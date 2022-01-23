import type { NextApiRequest, NextApiResponse } from "next";
import supabase from "supabaseconfig/supabase-client";

type Data = {
  name: string;
};

export default async function helloAPI(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { data, error } = await supabase.from("history").select().limit(3);

  res.status(200).json({ data });
}
