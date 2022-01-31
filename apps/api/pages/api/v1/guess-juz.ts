import CheckQueryInput from "~/functions/CheckQueryInput";
import { GetDataJuz } from "~/functions/GetData";
import QueryParser from "~/functions/QueryParser";
import CreateQuestionGuessJuz from "~/functions/question-maker/CreateQuestionGuessJuz";
import { AyatQuestion } from "~/lib/AyatType";

async function GuessJuz(req, res) {
  const { amount, select } = QueryParser(req);

  if (select.length < 4)
    return res.json({
      error: { message: "Choose at least 4 juz" },
      amount,
      select,
    });

  const { errorInput } = CheckQueryInput(amount, select, "juz");

  if (errorInput)
    return res.json({
      error: { message: errorInput.message },
      amount,
      select,
    });

  const { data, error } = await GetDataJuz(select);

  if (error) return res.json(error);

  // Create bucket for question results
  const results: AyatQuestion[] = [];

  // Create question by amount input
  try {
    for (let i = 0; i < amount; i++) {
      CreateQuestionGuessJuz(data, results, i, select);
    }
  } catch (err) {
    console.log(err);
    return res.json({
      error: { message: "Error when looping to create a question" },
      amount,
      select,
    });
  }

  res.json({ error: null, amount, select, results });
}

export default GuessJuz;
