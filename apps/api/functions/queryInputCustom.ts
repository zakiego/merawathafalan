function QueryInputCustom(req) {
  // query input
  const amount =
    req.query.amount !== undefined ? parseInt(req.query.amount) : 1;

  const select = req.query.select !== undefined ? req.query.select : "1";

  const encrypt =
    req.query.encrypt !== undefined ? req.query.encrypt.toLowerCase() : "false";

  const mode =
    req.query.mode !== undefined ? req.query.mode.toLowerCase() : "surah";

  const splitArray = select.split(",").map((item) => {
    return parseInt(item);
  });

  return { amount, encrypt, mode, splitArray };
}

export default QueryInputCustom;
