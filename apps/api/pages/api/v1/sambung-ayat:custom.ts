import CreateQuestion from "~/functions/createQuestion";
import GetDataCustom from "~/functions/getDataCustom";
import QueryInputCustom from "~/functions/queryInputCustom";
import SendResults from "~/functions/sendResults";

export default async function juzHandler(req, res) {
  const { amount, encrypt, mode, splitArray } = QueryInputCustom(req);
  const { data, error } = await GetDataCustom(splitArray, mode);

  // create bucket for result and id for each question
  const results = [];
  let id = 0;

  // run function create question
  try {
    for (let i = 0; i < amount; i++) {
      CreateQuestion(data, results, id);
      id += 1;
    }
  } catch (err) {
    console.log(err);
  }

  SendResults(results, mode, error, res, encrypt, amount);
}
