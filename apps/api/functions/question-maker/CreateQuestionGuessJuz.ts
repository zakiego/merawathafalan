import { ShuffleOption } from "~/functions/ShuffleOption";
import { AlquranTable, AyatOption, AyatQuestion } from "~/lib/AyatType";

import { CloneData } from "../CloneData";

function CreateQuestionGuessJuz(
  resp: AlquranTable[],
  results: AyatQuestion[],
  id: number,
  select: number[],
) {
  // Clone data
  const data: AlquranTable[] = CloneData(resp);

  // Question
  const { questionText, questionVerseId, trueOptionText, trueOptionId } =
    GetQuestionGuessJuz(data);

  // Option
  const options: AyatOption[] = [];
  GetOptionGuessJuz(select, options, 3, trueOptionId);

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

export default CreateQuestionGuessJuz;

function GetQuestionGuessJuz(data: AlquranTable[]) {
  // get random number question in range data length
  // answer is after question, so randomNumberQuestion + 1
  const randomNumberQuestion = Math.floor(Math.random() * (data.length - 1));
  const randomNumberAnswer = randomNumberQuestion + 1;

  const questionText = data[randomNumberQuestion].text_imlaei;
  const questionVerseId = data[randomNumberQuestion].id;
  const trueOptionText = data[randomNumberAnswer].juz_number;
  const trueOptionId = data[randomNumberAnswer].juz_number;

  // remove question and answer from data array
  data.splice(randomNumberQuestion, 2);

  return { questionText, questionVerseId, trueOptionText, trueOptionId };
}

function GetOptionGuessJuz(
  select: number[],
  options: AyatOption[],
  amountOption: number,
  trueOptionId: number,
) {
  // before create option, remove the true option surah from surah array
  const filtered = select.filter(function (juz) {
    return juz != trueOptionId;
  });

  for (let i = 0; i < amountOption; i++) {
    const randomNumberOption = 0;
    const optionText = filtered[randomNumberOption];
    filtered.splice(randomNumberOption, 1);
    options.push({ value: 0, option: optionText });
  }
}
