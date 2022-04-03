import { HiLightningBolt } from "react-icons/hi";

interface Props {
  modeQuiz: string;
  countTrue: string;
}

export default function QuizResultTitle({ modeQuiz, countTrue }: Props) {
  return (
    <>
      <div className="text-center">
        <h1 className="text-2xl font-bold">Latihan Selesai!</h1>
        <h2 className="card-result-primary mx-auto mt-4">Mode</h2>
        <h2 className="card-result-primary mx-auto mt-3 bg-primary capitalize text-white">
          {modeQuiz}
        </h2>
      </div>
      <div className="mt-14 flex items-center justify-center">
        <HiLightningBolt className="h-9 w-9" />
        <h1 className="text-4xl font-bold">+{parseInt(countTrue) * 10} poin</h1>
      </div>
    </>
  );
}
