import { ShuffleOption } from "~/functions/ShuffleOption";
import { AlquranTable, AyatOption, AyatQuestion } from "~/lib/AyatType";

import { CloneData } from "../CloneData";

function CreateQuestionVerseBefore(
  resp: AlquranTable[],
  results: AyatQuestion[],
  id: number,
) {
  // Clone data
  const data: AlquranTable[] = CloneData(resp);

  // Question
  const { questionText, questionVerseId, trueOptionText } = GetQuestion(data);

  // Option
  const options: AyatOption[] = [];
  GetOption(data, options, 3);

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

export default CreateQuestionVerseBefore;

function GetQuestion(data: AlquranTable[]) {
  // get random number question in range data length
  // answer is after question, so randomNumberQuestion + 1
  const randomNumberQuestion = Math.floor(Math.random() * data.length) || 1;
  const randomNumberAnswer = randomNumberQuestion - 1;

  const questionText = data[randomNumberQuestion].text_imlaei;
  const questionVerseId = data[randomNumberQuestion].id;
  const trueOptionText = data[randomNumberAnswer].text_imlaei;

  // remove question and answer from data array
  // check, random number answer
  data.splice(randomNumberAnswer, 2);

  return { questionText, questionVerseId, trueOptionText };
}

function GetOption(
  data: AlquranTable[],
  options: AyatOption[],
  amountOption: number,
) {
  // amount option is how many option, except true option you want to make
  for (let i = 0; i < amountOption; i++) {
    const randomNumberOption = Math.floor(Math.random() * data.length);
    const optionText = data[randomNumberOption].text_imlaei;
    data.splice(randomNumberOption, 1);
    options.push({ value: 0, option: optionText });
  }
}
