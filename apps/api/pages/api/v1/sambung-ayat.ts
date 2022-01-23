import { NextApiRequest, NextApiResponse } from "next";

import CheckQueryInput from "~/functions/CheckQueryInput";
import CreateQuestion from "~/functions/CreateQuestion";
import GetAyat from "~/functions/GetAyat";
import QueryParser from "~/functions/QueryParser";
import { AyatQuestion, AyatResp } from "~/lib/AyatType";

async function SambungAyat(req: NextApiRequest, res: NextApiResponse) {
  const { amount, select, mode } = QueryParser(req);

  const { errorInput } = CheckQueryInput(amount, select, mode);

  if (errorInput)
    return res.json({
      error: { messsage: errorInput.message },
      amount,
      select,
      mode,
    });

  const { data, error } = await GetAyat(select, mode);

  if (error) return res.json(error);

  // create bucket for result and id for each question
  const results: AyatQuestion[] = [];

  // run function create question
  LoopCreateQuestion(amount, data as unknown as AyatResp[], results);

  res.json({ error: null, amount, mode, select, results });
}

export default SambungAyat;

function LoopCreateQuestion(
  amount: number,
  data: AyatResp[],
  results: AyatQuestion[],
) {
  try {
    for (let i = 0; i < amount; i++) {
      CreateQuestion(data as unknown as AyatResp[], results, i);
    }
  } catch (err) {
    console.log(err);
  }
}
