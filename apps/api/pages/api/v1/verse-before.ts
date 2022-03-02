import CheckQueryInput from "~/functions/CheckQueryInput";
import { GetDataVerse } from "~/functions/GetData";
import { LoopCreateQuestion } from "~/functions/LoopCreateQuestion";
import QueryParser from "~/functions/QueryParser";
import CreateQuestionVerseBefore from "~/functions/question-maker/CreateQuestionVerseBefore";
import { AyatQuestion } from "~/lib/AyatType";
import AllowNextCors from "~/lib/NextCors";

async function VerseBefore(req, res) {
  await AllowNextCors(req, res);
  const { amount, select, mode } = QueryParser(req);

  const { errorInput } = CheckQueryInput(amount, select, mode);

  if (errorInput)
    return res.json({
      error: { message: errorInput.message },
      amount,
      select,
      mode,
    });

  const { data, error } = await GetDataVerse(select, mode);

  if (error) return res.json(error);

  // Create bucket for question results
  const results: AyatQuestion[] = [];

  // Create question by amount input
  LoopCreateQuestion(amount, data, results, CreateQuestionVerseBefore);

  res.json({ error: null, amount, mode, select, results });
}

export default VerseBefore;
