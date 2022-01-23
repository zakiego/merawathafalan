function CheckQueryInput(
  amount: number,
  select: number[],
  mode: "juz" | "surah",
) {
  // check amount
  if (amount > 50) return { errorInput: { message: "Maximal amount is 50" } };

  // check mode
  const modeList = ["juz", "surah"];

  if (modeList.indexOf(mode) < 0)
    return { errorInput: { message: "Wrong mode" } };

  // check select array
  // if juz, maximal 30
  // if surah, maximal 114
  const rangeMax = mode == "juz" ? 30 : 114;

  let selectOutOfIndex = false;

  select.some((el: number) => el > rangeMax)
    ? (selectOutOfIndex = true || selectOutOfIndex)
    : (selectOutOfIndex = false || selectOutOfIndex);

  if (selectOutOfIndex)
    return { errorInput: { message: "Select out of index" } };

  return { errorInput: null };
}

export default CheckQueryInput;
