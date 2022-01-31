import supabase from "supabaseconfig/supabase-client";

import { AlquranTable, SurahTable } from "~/lib/AyatType";

export async function GetDataVerse(select: number[], mode: "surah" | "juz") {
  const column = mode == "juz" ? "juz_number" : "surah_number";
  const rangeMax = mode == "juz" ? 30 : 114;

  const validateArray = select.some((el: number) => el > rangeMax)
    ? []
    : select;

  const { data, error } = await supabase
    .from<AlquranTable>("alquran")
    .select("id, text_imlaei, verse_number")
    .in(column, validateArray);

  return { data, error };
}

export async function GetDataSurah(select: number[]) {
  const column = "surah_number";
  const rangeMax = 114;

  const validateArray = select.some((el: number) => el > rangeMax)
    ? []
    : select;

  const { data, error } = await supabase
    .from<AlquranTable>("alquran")
    .select(`id, text_imlaei, surah_number, surah ( id, name_simple )`)
    .in(column, validateArray);

  const { data: surahList } = await supabase
    .from<SurahTable>("surah")
    .select(`id, name_simple`)
    .in("id", validateArray);

  return { data, error, surahList };
}

export async function GetDataJuz(select: number[]) {
  const column = "juz_number";
  const rangeMax = 30;

  const validateArray = select.some((el: number) => el > rangeMax)
    ? []
    : select;

  const { data, error } = await supabase
    .from<AlquranTable>("alquran")
    .select(`id, text_imlaei, juz_number`)
    .in(column, validateArray);

  return { data, error };
}
