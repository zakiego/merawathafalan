import { HiCheck, HiClock, HiX } from "react-icons/hi";

interface Props {
  countTrue: string;
  countFalse: string;
  timeInSecond: number;
}

export default function QuizResultCard({
  countTrue,
  countFalse,
  timeInSecond,
}: Props) {
  return (
    <div className="mt-8 md:px-20">
      <div className="flex justify-around space-x-5">
        <div className="card-result-secondary w-full">
          <div className="flex items-center justify-center space-x-1">
            <HiCheck className="h-6 w-6 text-green-700" />
            <p className="font-medium">{countTrue}</p>
          </div>
          <div className="text-center text-sm">Benar</div>
        </div>
        <div className="card-result-secondary w-full">
          <div className="flex items-center justify-center space-x-1">
            <HiX className="h-6 w-6 text-red-700" />
            <p className="font-medium">{countFalse}</p>
          </div>
          <div className="text-center  text-sm">Salah</div>
        </div>
      </div>
      <div className="card-result-secondary mt-2 w-full">
        <div className="flex items-center justify-center space-x-1">
          <HiClock className="h-6 w-6 text-yellow-400" />
          <p className="font-medium">{timeParser(timeInSecond)}</p>
        </div>
        <div className="text-center text-sm">Waktu</div>
      </div>
    </div>
  );
}

function timeParser(timeInSecond: number) {
  const minute = Math.floor(timeInSecond / 60);
  const second = timeInSecond % 60;

  if (!minute) {
    return `${second} detik`;
  }

  return `${minute} menit ${second} detik`;
}
