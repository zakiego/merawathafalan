import { ShuffleOption } from "~/functions/ShuffleOption";
import {
  AlquranTable,
  AyatOption,
  AyatQuestion,
  SurahTable,
} from "~/lib/AyatType";

import { CloneData } from "../CloneData";

function CreateQuestionGuessSurah(
  resp: AlquranTable[],
  results: AyatQuestion[],
  id: number,
  surahList: SurahTable[],
) {
  // Clone data
  const data: AlquranTable[] = CloneData(resp);

  // Question
  const { questionText, questionVerseId, trueOptionText, trueOptionId } =
    GetQuestionGuessSurah(data);

  // Option
  const options: AyatOption[] = [];
  GetOptionGuessSurah(surahList, options, 3, trueOptionId);

  // push true answer to option array
  options.push({ value: 1, option: trueOptionText });

  // shuffle array option
  ShuffleOption(options);

  results.push({
    id,
    questionText,
    questionVerseId,
    options,
  });
}

export default CreateQuestionGuessSurah;

function GetQuestionGuessSurah(data: AlquranTable[]) {
  // get random number question in range data length
  // answer is after question, so randomNumberQuestion + 1
  const randomNumberQuestion = Math.floor(Math.random() * (data.length - 1));
  const randomNumberAnswer = randomNumberQuestion + 1;

  const questionText = data[randomNumberQuestion].text_imlaei;
  const questionVerseId = data[randomNumberQuestion].id;
  const trueOptionText = data[randomNumberAnswer].surah.name_simple;
  const trueOptionId = data[randomNumberAnswer].surah.id;

  // remove question and answer from data array
  data.splice(randomNumberQuestion, 2);

  return { questionText, questionVerseId, trueOptionText, trueOptionId };
}

function GetOptionGuessSurah(
  surahList: SurahTable[],
  options: AyatOption[],
  amountOption: number,
  trueOptionId: number,
) {
  // before create option, remove the true option surah from surah array
  const filtered = surahList.filter(function (surah) {
    return surah.id != trueOptionId;
  });

  for (let i = 0; i < amountOption; i++) {
    const randomNumberOption = 0;
    const optionText = filtered[randomNumberOption].name_simple;
    filtered.splice(randomNumberOption, 1);
    options.push({ value: 0, option: optionText });
  }
}
