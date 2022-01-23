export type AyatDatabase = {
  AyahTex: string;
  VerseID: number;
  SuraID: number;
  JuzID: number;
};

export type AyatResp = {
  AyahText: string;
  VerseID: number;
};

export type AyatQuestion = {
  id: number;
  questionText: string;
  questionVerseId: number;
  options: AyatOption[];
};

export type AyatOption = {
  value: 1 | 0;
  option: string;
};
