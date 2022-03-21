import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useState } from "react";
import { HiPlay } from "react-icons/hi";

import { LoadingIcon } from "~/components/Icon/LoadingIcon";
import LayoutMainPadding from "~/components/Layout/LayoutMainPadding";
import LayoutMaxWidth from "~/components/Layout/LayoutMaxWidth";
import QuizTopNavbar from "~/components/Quiz/QuizTopNavbar";

export default function QuizAmount() {
  const [amount, setAmount] = useState(5);
  const router = useRouter();

  async function submitHandler() {
    Cookies.set("amount", amount as unknown as string);
    router.push("/app/quiz/play");
  }

  const amountOption = [5, 10, 20];

  const [isLoadingSubmit, setIsLoadingSubmit] = useState(false);

  return (
    <div>
      <QuizTopNavbar title="Jumlah Soal" href="/app/quiz/mode-ayat" />
      <LayoutMaxWidth>
        <LayoutMainPadding>
          <form>
            <div className="rounded-2xl border-2 border-gray-300 border-opacity-20 py-5 text-center shadow-lg shadow-gray-200/70 ">
              <h1 className="text-xl font-semibold md:text-2xl">
                Mau buat berapa soal?
              </h1>
              <input
                type={"number"}
                value={amount}
                min={1}
                max={50}
                onChange={(e) => setAmount(e.target.value as unknown as number)}
                className="mx-auto mt-5 w-14 border-0 border-b-2 border-gray-200 px-0.5 text-center focus:border-black focus:ring-0"
              />

              <div className="mt-6 flex justify-center space-x-3">
                {amountOption.map((option) => {
                  return (
                    <button
                      type="button"
                      onClick={() => setAmount(option)}
                      key={option}
                      className="btn-outline py-1 text-sm"
                    >
                      {option} Soal
                    </button>
                  );
                })}
              </div>
              <button
                type="submit"
                disabled={isLoadingSubmit}
                onClick={() => {
                  setIsLoadingSubmit(true);
                  submitHandler();
                }}
                className="btn-primary mx-auto mt-5 flex items-center justify-center space-x-1 font-semibold disabled:cursor-not-allowed disabled:opacity-40"
              >
                {!isLoadingSubmit && (
                  <>
                    <div>Mulai</div>
                    <HiPlay className="block h-5 w-5" />
                  </>
                )}
                {isLoadingSubmit && (
                  <div className="flex items-center">
                    <LoadingIcon />
                    <p>Loading...</p>
                  </div>
                )}
              </button>
            </div>
          </form>
        </LayoutMainPadding>
      </LayoutMaxWidth>
    </div>
  );
}
