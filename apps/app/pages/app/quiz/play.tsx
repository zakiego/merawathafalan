import type { GetServerSideProps } from "next";
import cookies from "next-cookies";
import { useState } from "react";

import { LoadingIcon } from "~/components/Icon/LoadingIcon";
import LayoutMainPadding from "~/components/Layout/LayoutMainPadding";
import LayoutMaxWidth from "~/components/Layout/LayoutMaxWidth";
import QuizPlayRoot from "~/components/Quiz/QuizPlayRoot";
import QuizPlayTopNavbar from "~/components/Quiz/QuizPlayTopNavbar";
import QuizProgressBar from "~/components/Quiz/QuizProgressBar";
import { listMode } from "~/lib/mode";
import { useQuestionData } from "~/lib/swr";

interface Props {
  modeQuiz: string;
  modeAyat: string;
  select: string;
  amount: number;
  hitApiLink: string;
  isRTL: boolean;
  title: string;
  startTime: number;
}

export default function QuizPlay({
  modeQuiz,
  amount,
  hitApiLink,
  isRTL,
  title,
}: Props) {
  const [indexQuestionNumber, setIndexQuestionNumber] = useState(0);

  const { data, error } = useQuestionData(hitApiLink);

  if (error)
    return (
      <div className="flex min-h-screen">
        <div className="m-auto flex flex-col items-center justify-center">
          <div className="mt-6 text-center font-medium md:text-xl">
            <p>Something Error :((</p>
            <p className="mt-4">{error}</p>
          </div>
        </div>
      </div>
    );

  if (!data)
    return (
      <div className="flex min-h-screen">
        <div className="m-auto flex flex-col items-center justify-center">
          <LoadingIcon className="h-20 w-20 text-black" />
          <div className="mt-6 text-center font-medium md:text-xl">
            <p>Sambil Nunggu</p>
            <p>Dzikir Dulu</p>
          </div>
        </div>
      </div>
    );

  return (
    <div>
      <QuizPlayTopNavbar
        title={title}
        href="/app/quiz"
        amount={amount}
        questionNumber={indexQuestionNumber}
      />
      <LayoutMaxWidth>
        <LayoutMainPadding>
          <QuizProgressBar
            amount={amount}
            indexQuestionNumber={indexQuestionNumber}
          />
          <QuizPlayRoot
            modeQuiz={modeQuiz}
            amount={amount}
            data={data}
            isRTL={isRTL}
            indexQuestionNumber={indexQuestionNumber}
            setIndexQuestionNumber={setIndexQuestionNumber}
          />
          {/* <button
            onClick={() => setIndexQuestionNumber(indexQuestionNumber + 1)}
          >
            Tambah
          </button> */}
        </LayoutMainPadding>
      </LayoutMaxWidth>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { modeQuiz, modeAyat, select, amount } = cookies(context);

  if (
    modeQuiz == null ||
    modeAyat == null ||
    select == null ||
    amount == null
  ) {
    return {
      redirect: {
        permanent: false,
        destination: "/app/quiz",
      },
    };
  }

  const api = listMode.find((element) => element.id == modeQuiz)?.api;

  const isRTL = modeQuiz == "tebak-surah" ? false : true;
  const title = modeQuiz.replace(/-/g, " ");

  const hitApiLink = `${api}?amount=${amount}&mode=${modeAyat}&select=${select}`;

  return {
    props: {
      modeQuiz,
      modeAyat,
      select,
      amount: parseInt(amount),
      hitApiLink,
      isRTL,
      title,
    },
  };
};
