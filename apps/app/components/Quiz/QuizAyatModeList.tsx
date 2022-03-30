import { HiOutlineMinusCircle, HiOutlinePlusCircle } from "react-icons/hi";

import { listJuz } from "~/lib/juz";
import { listSurah } from "~/lib/surah";

interface Props {
  menu: string;
  modeQuiz: "sambung-ayat" | "tebak-ayat-sebelum" | "tebak-surah" | "tebak-juz";
  selectState: number[];
  addState(val: number): void;
}

export default function QuizAyatModeList({
  menu,
  addState,
  selectState,
  modeQuiz,
}: Props) {
  const sourceList = menu == "surah" ? listSurah : listJuz;

  function note() {
    if (modeQuiz == "tebak-juz") {
      return "pilih minimal 4 juz";
    }

    if (modeQuiz == "tebak-surah") {
      return "pilih minimal 4 surah";
    }
  }

  return (
    <div className="mt-3 space-y-6">
      {note() && (
        <div className="mx-auto max-w-max rounded-md bg-primary/90 px-4 py-1.5 text-center">
          <p className="text-sm text-white">catatan: {note()}</p>
        </div>
      )}
      {sourceList.map(({ value, name }) => {
        const isInclude = selectState.includes(value);
        return (
          <div
            key={name}
            onClick={() => addState(value)}
            className="card-option-mode-ayat flex items-center justify-between"
          >
            <div>{menu == "surah" ? `${value} ${name}` : name}</div>
            <StatusIcon status={isInclude} />
          </div>
        );
      })}
    </div>
  );
}

function StatusIcon({ status }: { status: boolean }) {
  if (!status) {
    return <HiOutlinePlusCircle className="h-6 w-6 text-[#49B572]" />;
  }

  return <HiOutlineMinusCircle className="h-6 w-6 text-[#DE6B59]" />;
}
