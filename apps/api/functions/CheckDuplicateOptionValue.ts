import { AyatOption, AyatQuestion } from "~/lib/AyatType";

export function CheckDuplicateOptionValue(data: AyatQuestion[]) {
  function CheckEveryOption(options: AyatOption[]) {
    const unique = new Set();
    const showError = options.some(
      (element) => unique.size === unique.add(element.option).size,
    );
    return showError;
  }

  const isDuplicated = data.map((question: AyatQuestion) => {
    return CheckEveryOption(question.options);
  });

  return isDuplicated.some(Boolean);
}
