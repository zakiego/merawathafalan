import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { playStatus } from "~/lib/playstatus";
import { TypeUseQuestionData } from "~/lib/swr";

import QuizPlayButton from "./QuizPlayButton";
import QuizPlayOption from "./QuizPlayOption";

type Props = {
  data: TypeUseQuestionData;
  indexQuestionNumber: number;
  isRTL: boolean;
  setIndexQuestionNumber: React.Dispatch<React.SetStateAction<number>>;
  amount: number;
  modeQuiz: string;
};

export default function QuizPlayRoot({
  data,
  indexQuestionNumber,
  isRTL,
  setIndexQuestionNumber,
  amount,
  modeQuiz,
}: Props) {
  const router = useRouter();

  const [startTime, setStartTime] = useState(0);

  const [status, setStatus] = useState<playStatus>("check");
  const [isOptionDisable, setIsOptionDisable] = useState(false);
  const [isButtonDisable, setIsButtonDisable] = useState(true);
  const [isCheckButtonShow, setIsCheckButtonShow] = useState(false);

  const [selectOptionId, setSelectOptionId] = useState<number | undefined>();
  const [selectOptionValue, setSelectOptionValue] = useState<1 | 0>();

  const [point, setPoint] = useState(0);
  const [falseAnswerIdList, setFalseAnswerIdList] = useState<number[]>([]);
  const [trueAnswerIdList, setTrueAnswerIdList] = useState<number[]>([]);

  const isLastQuestion = amount - indexQuestionNumber == 1 ? true : false;

  const [isLoadingSubmit, setIsLoadingSubmit] = useState(false);

  const { results } = data;

  if (!results) {
    return <div>Something error</div>;
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    setStartTime(performance.now());
  }, []);

  const question = results[indexQuestionNumber];

  async function buttonHandler(status: playStatus) {
    if (status == "check") {
      setIsOptionDisable(true);
      setIsCheckButtonShow(true);

      // push to list state
      if (selectOptionValue == 1) {
        setTrueAnswerIdList([...trueAnswerIdList, question.questionVerseId]);
        setPoint(point + selectOptionValue);
      } else {
        setFalseAnswerIdList([...falseAnswerIdList, question.questionVerseId]);
      }

      isLastQuestion ? setStatus("finish") : setStatus("next");
    }
    if (status == "next") {
      setIsOptionDisable(false);
      setIsButtonDisable(true);
      setIsCheckButtonShow(false);
      setSelectOptionId(undefined);
      setIndexQuestionNumber(indexQuestionNumber + 1);
      setStatus("check");
    }

    if (status == "finish") {
      setIsLoadingSubmit(true);
      const time = Math.round((performance.now() - startTime) / 1000.0);
      await fetch("/api/app/submit", {
        method: "POST",
        body: JSON.stringify({
          point: point * 10,
          countFalse: falseAnswerIdList.length,
          countTrue: trueAnswerIdList.length,
          timeSecond: time,
        }),
        headers: { "content-type": "application/json" },
      });

      Cookies.set("countTrue", trueAnswerIdList.length.toString());
      Cookies.set("countFalse", falseAnswerIdList.length.toString());
      Cookies.set("timeInSecond", time.toString());

      router.push("/app/quiz/result");
    }
  }

  return (
    <div className="mt-8">
      <div className="text-right font-hafs text-2xl leading-relaxed ">
        {question.questionText}
      </div>
      <QuizPlayButton
        status={status}
        buttonHandler={buttonHandler}
        isButtonDisable={isButtonDisable}
        isLoadingSubmit={isLoadingSubmit}
      />
      {/* <div>Point: {point}</div>
      <div>Salah: {JSON.stringify(falseAnswerIdList)}</div>
      <div>Benar {JSON.stringify(trueAnswerIdList)}</div>
      <button
        onClick={() => {
          console.log((performance.now() - startTime) / 1000.0);
          console.log(startTime);
        }}
      >
        End
      </button> */}

      <QuizPlayOption
        modeQuiz={modeQuiz}
        isOptionDisable={isOptionDisable}
        isRTL={isRTL}
        isCheckButtonShow={isCheckButtonShow}
        question={question}
        selectOptionId={selectOptionId}
        selectOptionValue={selectOptionValue}
        setIsButtonDisable={setIsButtonDisable}
        setSelectOptionId={setSelectOptionId}
        setSelectOptionValue={setSelectOptionValue}
      />
    </div>
  );
}
