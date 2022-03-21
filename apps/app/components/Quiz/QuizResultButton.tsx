/* eslint-disable @next/next/no-html-link-for-pages */
import Cookies from "js-cookie";
import Link from "next/link";
import { useRouter } from "next/router";

export default function QuizResultButton() {
  const router = useRouter();

  function clearCookiesBackHome() {
    Cookies.remove("amount");
    Cookies.remove("select");
    Cookies.remove("modeAyat");
    Cookies.remove("modeQuiz");
    Cookies.remove("countTrue");
    Cookies.remove("countFalse");
    Cookies.remove("timeInSecond");

    router.push("/app");
  }

  return (
    <div className="mt-10 space-y-4">
      <Link href="/app/quiz/play" passHref>
        <button className="btn-primary w-full">Latih Hafalanmu Lagi!</button>
      </Link>
      <a href="/app">
        <button
          // onClick={() => clearCookiesBackHome()}
          className="btn-outline mt-4 w-full"
        >
          Beranda
        </button>
      </a>
    </div>
  );
}
