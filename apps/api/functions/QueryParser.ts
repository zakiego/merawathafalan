function QueryParser(req) {
  const defaultAmount = 1;
  const defaultSelect = "1";
  const defaultMode = "surah";

  const query = req.query;

  const amount =
    query.amount !== undefined ? parseInt(query.amount) : defaultAmount;

  const mode =
    query.mode !== undefined ? query.mode.toLowerCase() : defaultMode;

  const encrypt =
    query.encrypt !== undefined ? query.encrypt.toLowerCase() : "false";

  const selectArray = query.select !== undefined ? query.select : defaultSelect;

  const select: number[] = FilterSelect(selectArray);

  return { amount, select, mode, encrypt };
}

export default QueryParser;

function FilterSelect(select: string) {
  const splitArray = select.split(",").map((item: string) => {
    return parseInt(item);
  });

  const filterArray = splitArray.filter((a) => a);

  return filterArray;
}
