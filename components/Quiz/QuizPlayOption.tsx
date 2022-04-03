import { HiCheckCircle, HiXCircle } from "react-icons/hi";

interface Props {
  question: {
    id: number;
    questionText: string;
    questionVerseId: number;
    options: {
      value: 0 | 1;
      option: string;
    }[];
  };
  isRTL: boolean;
  selectOptionId: number | undefined;
  isCheckButtonShow: boolean;
  selectOptionValue: 1 | 0 | undefined;
  isOptionDisable: boolean;
  setSelectOptionValue: React.Dispatch<React.SetStateAction<0 | 1 | undefined>>;
  setSelectOptionId: React.Dispatch<React.SetStateAction<number | undefined>>;
  setIsButtonDisable: React.Dispatch<React.SetStateAction<boolean>>;
  modeQuiz: string;
}
export default function QuizPlayOption(props: Props) {
  const {
    question,
    isRTL,
    selectOptionId,
    isCheckButtonShow,
    setSelectOptionValue,
    setSelectOptionId,
    setIsButtonDisable,
    selectOptionValue,
    isOptionDisable,
    modeQuiz,
  } = props;

  return (
    <div className="mt-9 space-y-4 font-hafs text-xl">
      {question.options.map((option, id) => {
        return (
          <button
            onClick={() => {
              setSelectOptionValue(option.value);
              setSelectOptionId(id);
              setIsButtonDisable(false);
            }}
            disabled={isOptionDisable}
            className={`card-option-mode-ayat disabled:hover:bg-text flex w-full items-center disabled:cursor-not-allowed
              ${isButtonClicked(selectOptionId, id)}`}
            key={id}
          >
            <div className="w-1/12">
              <IconTrueOrFalse
                id={id}
                optionValue={option.value}
                selectOptionId={selectOptionId}
                selectOptionValue={selectOptionValue}
                isCheckButtonShow={isCheckButtonShow}
              />
            </div>
            <div
              className={`${isButtonRTL(isRTL)} w-11/12 ${
                modeQuiz == "tebak-juz" && "font-sans text-base"
              }`}
            >
              {modeQuiz == "tebak-juz" && "Juz "}
              {option.option}
            </div>
          </button>
        );
      })}
    </div>
  );
}

function IconTrueOrFalse({
  id,
  selectOptionId,
  selectOptionValue,
  isCheckButtonShow,
  optionValue,
}: {
  id: number;
  selectOptionId: number | undefined;
  selectOptionValue: 1 | 0 | undefined;
  isCheckButtonShow: boolean;
  optionValue: number;
}) {
  if (!isCheckButtonShow) return <div />;

  // if (id != selectOptionId) return <div />;

  if (optionValue == 1) {
    return <HiCheckCircle className="h-6 w-6 text-[#49B572]" />;
  }

  if (selectOptionValue == 0 && id == selectOptionId) {
    return <HiXCircle className="h-6 w-6 text-[#DE6B59]" />;
  }

  return <div />;
}

function isButtonRTL(isRTL: boolean) {
  if (isRTL) return "text-right";
}

function isButtonClicked(selectOptionId: number | undefined, id: number) {
  if (selectOptionId == id) return "bg-primary text-white";
}
