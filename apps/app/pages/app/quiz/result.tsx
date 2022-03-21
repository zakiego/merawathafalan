import { GetServerSideProps } from "next";
import cookies from "next-cookies";

import LayoutMainPadding from "~/components/Layout/LayoutMainPadding";
import LayoutMaxWidth from "~/components/Layout/LayoutMaxWidth";
import QuizResultButton from "~/components/Quiz/QuizResultButton";
import QuizResultCard from "~/components/Quiz/QuizResultCard";
import QuizResultTitle from "~/components/Quiz/QuizResultTitle";
import QuizResultTopNavbar from "~/components/Quiz/QuizResultTopNavbar";

interface Props {
  modeQuiz: string;
  countTrue: string;
  countFalse: string;
  timeInSecond: number;
}

export default function Result({
  modeQuiz,
  countTrue,
  countFalse,
  timeInSecond,
}: Props) {
  return (
    <div>
      <QuizResultTopNavbar title="Hasil" />
      <LayoutMaxWidth>
        <LayoutMainPadding>
          <div className="mt-4">
            <QuizResultTitle modeQuiz={modeQuiz} countTrue={countTrue} />
            <QuizResultCard
              countFalse={countFalse}
              countTrue={countTrue}
              timeInSecond={timeInSecond}
            />
            <QuizResultButton />
          </div>
        </LayoutMainPadding>
      </LayoutMaxWidth>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const {
    modeQuiz,
    modeAyat,
    select,
    amount,
    countTrue,
    countFalse,
    timeInSecond,
  } = cookies(context);

  if (
    modeQuiz == null ||
    modeAyat == null ||
    select == null ||
    amount == null ||
    countTrue == null ||
    countFalse == null ||
    timeInSecond == null
  ) {
    return {
      redirect: {
        permanent: false,
        destination: "/app/quiz",
      },
    };
  }

  return {
    props: {
      modeQuiz: modeQuiz.replace(/-/g, " "),
      countTrue,
      countFalse,
      timeInSecond: parseInt(timeInSecond),
    },
  };
};
