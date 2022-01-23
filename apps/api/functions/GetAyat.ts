import supabase from "supabaseconfig/supabase-client";

import { AyatDatabase } from "~/lib/AyatType";

async function GetAyat(select: number[], mode: "surah" | "juz") {
  const column = mode == "juz" ? "JuzID" : "SuraID";
  const rangeMax = mode == "juz" ? 30 : 114;

  const validateArray = select.some((el: number) => el > rangeMax)
    ? []
    : select;

  const { data, error } = await supabase
    .from<AyatDatabase>("quran")
    .select("AyahText, VerseID")
    .in(column, validateArray);

  return { data, error };
}

export default GetAyat;
