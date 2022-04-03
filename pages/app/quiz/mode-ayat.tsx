import Cookies from "js-cookie";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import cookies from "next-cookies";
import { useState } from "react";

import LayoutMainPadding from "~/components/Layout/LayoutMainPadding";
import LayoutMaxWidth from "~/components/Layout/LayoutMaxWidth";
import QuizAyatModeList from "~/components/Quiz/QuizAyatModeList";
import QuizAyatModeToggle from "~/components/Quiz/QuizAyatModeToggle";
import QuizFloatSelectAyatMode from "~/components/Quiz/QuizFloatSelectAyatMode";
import QuizTopNavbar from "~/components/Quiz/QuizTopNavbar";

interface Props {
  showTab: string[];
  modeQuiz: "sambung-ayat" | "tebak-ayat-sebelum" | "tebak-surah" | "tebak-juz";
}

export default function QuizMode({ showTab, modeQuiz }: Props) {
  const router = useRouter();

  const [menu, setMenu] = useState(showTab[0]);
  const [selectState, setSelectState] = useState<number[]>([]);

  async function nextButton() {
    await Cookies.set("modeAyat", menu);
    await Cookies.set("select", selectState);
    router.push("/app/quiz/amount");
  }

  function addState(val: number) {
    const isInclude = selectState.some((item) => item == val);

    if (isInclude) {
      // remove
      const index = selectState.indexOf(val);
      const temp = [...selectState];
      temp.splice(index, 1);
      setSelectState(temp.sort((a, b) => a - b));
    } else {
      // add
      const temp = [...selectState, val].sort((a, b) => a - b);
      setSelectState(temp);
    }
  }

  function clearSelectState() {
    setSelectState([]);
  }

  return (
    <div>
      <QuizTopNavbar title="Mode Ayat" href="/app/quiz/mode-quiz" />
      <LayoutMaxWidth>
        <LayoutMainPadding>
          <QuizAyatModeToggle
            showTab={showTab}
            menu={menu}
            setMenu={setMenu}
            clearSelectState={clearSelectState}
          />
          <QuizAyatModeList
            menu={menu}
            addState={addState}
            selectState={selectState}
            modeQuiz={modeQuiz}
          />
          <QuizFloatSelectAyatMode
            modeQuiz={modeQuiz}
            menu={menu}
            selectState={selectState}
            addState={addState}
            nextButton={nextButton}
          />
        </LayoutMainPadding>
      </LayoutMaxWidth>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { modeQuiz } = cookies(context);

  if (!modeQuiz) {
    return {
      redirect: {
        permanent: false,
        destination: "/app/quiz",
      },
    };
  }

  if (modeQuiz == "sambung-ayat" || modeQuiz == "tebak-ayat-sebelum") {
    return { props: { showTab: ["surah", "juz"], modeQuiz } };
  }

  if (modeQuiz == "tebak-surah") {
    return { props: { showTab: ["surah"], modeQuiz } };
  }

  if (modeQuiz == "tebak-juz") {
    return { props: { showTab: ["juz"], modeQuiz } };
  }

  return {
    redirect: {
      permanent: false,
      destination: "/app/quiz",
    },
  };
};
