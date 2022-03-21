import Cookies from "js-cookie";
import { useRouter } from "next/router";

import LayoutMainPadding from "~/components/Layout/LayoutMainPadding";
import LayoutMaxWidth from "~/components/Layout/LayoutMaxWidth";
import QuizTopNavbar from "~/components/Quiz/QuizTopNavbar";
import { listMode } from "~/lib/mode";

export default function ModeQuiz() {
  const router = useRouter();

  async function submitHandler(modeQuiz: string) {
    await Cookies.set("modeQuiz", modeQuiz);
    router.push("/app/quiz/mode-ayat");
  }

  return (
    <div>
      <QuizTopNavbar title="Mode Quiz" href="/app" />
      <LayoutMaxWidth>
        <LayoutMainPadding>
          <div className="space-y-6">
            {listMode.map((mode) => {
              return (
                <button
                  key={mode.name}
                  className="w-full text-left"
                  onClick={() => submitHandler(mode.id)}
                >
                  <div key={mode.name} className="card-option-mode-quiz">
                    <h1 className="text-lg">{mode.name}</h1>
                  </div>
                </button>
              );
            })}
          </div>
        </LayoutMainPadding>
      </LayoutMaxWidth>
    </div>
  );
}
