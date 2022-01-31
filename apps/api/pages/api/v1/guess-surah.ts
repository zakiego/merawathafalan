import CheckQueryInput from "~/functions/CheckQueryInput";
import { GetDataSurah } from "~/functions/GetData";
import QueryParser from "~/functions/QueryParser";
import CreateQuestionGuessSurah from "~/functions/question-maker/CreateQuestionGuessSurah";
import { AyatQuestion } from "~/lib/AyatType";

async function GuessSurah(req, res) {
  const { amount, select } = QueryParser(req);

  if (select.length < 4)
    return res.json({
      error: { message: "Choose at least 4 surah" },
      amount,
      select,
    });

  const { errorInput } = CheckQueryInput(amount, select, "surah");

  if (errorInput)
    return res.json({
      error: { message: errorInput.message },
      amount,
      select,
    });

  const { data, error, surahList } = await GetDataSurah(select);

  if (error) return res.json(error);

  // Create bucket for question results
  const results: AyatQuestion[] = [];

  // Create question by amount input
  try {
    for (let i = 0; i < amount; i++) {
      CreateQuestionGuessSurah(data, results, i, surahList);
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

export default GuessSurah;
