interface Props {
  amount: number;
  indexQuestionNumber: number;
}

export default function QuizProgressBar({
  amount,
  indexQuestionNumber,
}: Props) {
  return (
    <div className=" h-2 w-full rounded-full bg-gray-300">
      <div
        className=" h-2 rounded-full bg-primary"
        style={{ width: `${((indexQuestionNumber + 1) / amount) * 100}%` }}
      />
    </div>
  );
}
