import { useState } from "react";
import {
  HiChevronDoubleRight,
  HiOutlineChevronDown,
  HiOutlineChevronUp,
  HiOutlineMinusCircle,
} from "react-icons/hi";

import { LoadingIcon } from "~/components/Icon/LoadingIcon";
import LayoutMaxWidth from "~/components/Layout/LayoutMaxWidth";
import { listJuz } from "~/lib/juz";
import { listSurah } from "~/lib/surah";

interface Props {
  menu: string;
  selectState: number[];
  addState(val: number): void;
  nextButton(): void;
  modeQuiz: string;
}

export default function QuizFloatSelectAyatMode({
  menu,
  selectState,
  addState,
  nextButton,
  modeQuiz,
}: Props) {
  const source = menu == "surah" ? listSurah : listJuz;
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed inset-x-0 bottom-3 md:bottom-11">
      <LayoutMaxWidth>
        <div className="flex justify-center">
          <button onClick={() => setIsOpen(isOpen ? false : true)}>
            {isOpen ? (
              <HiOutlineChevronDown className="h-6 w-6" />
            ) : (
              <HiOutlineChevronUp className="h-6 w-6" />
            )}
          </button>
        </div>
        <div className="px-4">
          {isOpen ? (
            <TrueOpen
              menu={menu}
              selectState={selectState}
              source={source}
              addState={addState}
              nextButton={nextButton}
            />
          ) : (
            <FalseOpen
              menu={menu}
              selectState={selectState}
              source={source}
              addState={addState}
              nextButton={nextButton}
              modeQuiz={modeQuiz}
            />
          )}
        </div>
      </LayoutMaxWidth>
    </div>
  );
}

interface TrueProps {
  menu: string;
  selectState: number[];
  source: {
    value: number;
    name: string;
  }[];
  addState(val: number): void;
  nextButton(): void;
}

// open extend to up mode

function TrueOpen({ selectState, source, menu, addState }: TrueProps) {
  return (
    <div className="justify-between space-y-1 rounded-2xl border-2 border-gray-300 border-opacity-40 bg-white px-5 py-4 shadow-xl shadow-gray-400/30">
      <h3 className="px-1 font-semibold">
        {selectState.length} <span className="capitalize">{menu}</span>
      </h3>
      <div className="max-h-72 space-y-1 overflow-y-scroll">
        {selectState.map((x) => {
          return (
            <div key={x} className="pr-5">
              <button
                onClick={() => addState(x)}
                className="flex w-full justify-between rounded-md px-1 py-1 hover:bg-gray-100/70"
              >
                <p>
                  {menu == "surah"
                    ? `${source[x - 1].value}. ${source[x - 1].name}`
                    : `${source[x - 1].name}`}
                </p>
                <HiOutlineMinusCircle className="h-5 w-5 text-[#DE6B59]" />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

interface FalseProps {
  menu: string;
  selectState: number[];
  source: {
    value: number;
    name: string;
  }[];
  addState(val: number): void;
  nextButton(): void;
  modeQuiz: string;
}

// normal mode

function FalseOpen({
  selectState,
  source,
  menu,
  nextButton,
  modeQuiz,
}: FalseProps) {
  function arrayToText(selectState: number[]) {
    return selectState.map((x, id) => {
      if (id == selectState.length - 1) {
        return `${source[x - 1].name}`;
      }
      return `${source[x - 1].name}, `;
    });
  }

  const minimalSelect =
    modeQuiz == "tebak-juz" || modeQuiz == "tebak-surah" ? 4 : 1;

  const [isLoadingSubmit, setIsLoadingSubmit] = useState(false);

  return (
    <div className=" space-y-1 rounded-2xl border-2 border-gray-300 border-opacity-40 bg-white px-6 py-4 shadow-xl shadow-gray-400/30">
      <div className="flex justify-between">
        <div>
          <h3 className="font-semibold ">
            {selectState.length} <span className="capitalize">{menu}</span>
          </h3>
          <p className="line-clamp-1">
            {selectState.length == 0 ? "-" : arrayToText(selectState)}
          </p>
        </div>
        <div className="pl-3">
          <button
            disabled={
              selectState.length < minimalSelect
                ? true
                : false || isLoadingSubmit
            }
            onClick={() => {
              setIsLoadingSubmit(true);
              nextButton();
            }}
            className="btn-primary flex items-center space-x-1 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {!isLoadingSubmit && (
              <>
                <p>Next</p>
                <HiChevronDoubleRight className="h-5 w-5" />
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
      </div>
    </div>
  );
}
