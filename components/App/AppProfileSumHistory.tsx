import { useSumHistory } from "~/lib/swr";

import { Skeleton } from "../Skeleton";

export default function AppProfileSumHistory() {
  const { data, error } = useSumHistory("/api/app/sum-history");

  if (error) return <div className="mt-7">Oops! Something went wrong :(</div>;

  function checkAccuracy() {
    if (data.data.countTrain == 0) {
      return data.data.countTrain + "%";
    }

    return (
      Math.floor(
        (data?.data?.sumTrue / (data?.data?.sumTrue + data?.data?.sumFalse)) *
          100,
      ) + "%"
    );
  }

  return (
    <div className="mt-8 flex justify-around">
      <div className="text-center">
        <div className="font-semibold md:text-lg">
          {data ? checkAccuracy() : <Skeleton />}
        </div>
        <div className="text-xs opacity-70 md:text-sm">Akurasi</div>
      </div>

      <div className="text-center">
        <div className="font-semibold md:text-lg">
          {data?.data.sumPoint.toString() || <Skeleton />}
        </div>

        <div className="text-xs opacity-70 md:text-sm">Poin</div>
      </div>

      <div className="text-center">
        <div className="font-semibold md:text-lg">
          {(data && data?.data?.countTrain + "x") || <Skeleton />}
        </div>
        <div className="text-xs opacity-70 md:text-sm">Latihan</div>
      </div>
    </div>
  );
}
