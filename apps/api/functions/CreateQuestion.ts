import { AyatOption, AyatQuestion, AyatResp } from "~/lib/AyatType";

function CreateQuestion(resp: AyatResp[], results: AyatQuestion[], id: number) {
  // clone data
  const data: AyatResp[] = JSON.parse(JSON.stringify(resp));

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

export default CreateQuestion;

function GetOption(
  data: AyatResp[],
  options: AyatOption[],
  amountOption: number,
) {
  // amount option is how many option, except true option you want to make
  for (let i = 0; i < amountOption; i++) {
    const randomNumberOption = Math.floor(Math.random() * data.length);
    const optionText = data[randomNumberOption].AyahText;
    data.splice(randomNumberOption, 1);
    options.push({ value: 0, option: optionText });
  }
}

function GetQuestion(data: AyatResp[]) {
  // get random number question in range data length
  // answer is after question, so randomNumberQuestion + 1
  const randomNumberQuestion = Math.floor(Math.random() * (data.length - 1));
  const randomNumberAnswer = randomNumberQuestion + 1;

  const questionText = data[randomNumberQuestion].AyahText;
  const questionVerseId = data[randomNumberQuestion].VerseID;
  const trueOptionText = data[randomNumberAnswer].AyahText;

  // remove question and answer from data array
  data.splice(randomNumberQuestion, 2);

  return { questionText, questionVerseId, trueOptionText };
}

function ShuffleOption(array: AyatOption[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
}
