import { AlquranTable, AyatQuestion } from "~/lib/AyatType";

export function LoopCreateQuestion(
  amount: number,
  data: AlquranTable[],
  results: AyatQuestion[],
  createQuestionFunction: (
    resp: AlquranTable[],
    results: AyatQuestion[],
    id: number,
  ) => void,
) {
  try {
    for (let i = 0; i < amount; i++) {
      createQuestionFunction(data, results, i);
    }
  } catch (err) {
    console.log(err);
  }
}
