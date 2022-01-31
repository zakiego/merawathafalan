export type AlquranTable = {
  id: number;
  text_imlaei: string;

  verse_number?: number;
  surah_number?: number;
  hizb_number?: number;
  juz_number?: number;
  page_number?: number;
  rub_number?: number;

  sajdah_number?: string;
  sajdah_type?: string;

  verse_key?: string;

  surah: SurahTable;
};

export type SurahTable = {
  id: number;
  name_simple: string;
};

// export type AyatResp = {
//   AyahText: string;
//   VerseID: number;
// };

export type AyatQuestion = {
  id: number;
  questionText: string;
  questionVerseId: number;
  options: AyatOption[];
};

export type AyatOption = {
  value: 1 | 0;
  option: string | number;
};
