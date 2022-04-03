import {
  convertUTCToCustomZone,
  lastActivityHistoryDateStr,
} from "~/helper/time";
import { TypeLastHistoryData, useLastHistory } from "~/lib/swr";

import { SkeletonTable } from "../Skeleton";

export default function AppLastActivityHistory({
  timezone,
}: {
  timezone: number;
}) {
  const { data: history, error } = useLastHistory("api/app/last-history");

  if (error) return <div className="mt-7">Oops! Something went wrong :(</div>;

  return (
    <div className="mt-7">
      <div className="font-semibold">Latihan Terakhir</div>
      <table className="mt-4 w-full table-fixed">
        <thead>
          <tr className="text-sm">
            <th className="rounded-l-lg bg-gray-100 py-2 font-normal">
              Tanggal
            </th>
            <th className="bg-gray-100 py-2 font-normal">Jumlah Soal</th>
            <th className="rounded-r-lg bg-gray-100 py-2 font-normal">
              Akurasi
            </th>
          </tr>
        </thead>
        <tbody className="divide-y-2">
          {!history && (
            <>
              <SkeletonTable amount={3} />
              <SkeletonTable amount={3} />
            </>
          )}

          {history &&
            history.data.map((item: TypeLastHistoryData, id: number) => {
              const amount = item.countTrue + item.countFalse;
              const accuracy = Math.round((item.countTrue / amount) * 100);
              return (
                <tr className="text-center text-xs md:text-sm" key={id}>
                  <td className="py-3">
                    {lastActivityHistoryDateStr(
                      convertUTCToCustomZone(item.createdAt, timezone),
                    )}
                  </td>
                  <td className="py-3">{amount}</td>
                  <td className="py-3">
                    <div
                      className="mx-auto w-16 rounded-lg py-[4px]"
                      style={{
                        backgroundColor: accuracyColor(accuracy),
                      }}
                    >
                      {accuracy}%
                    </div>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}

const mockData = [
  { date: "22 Juni 2021", amount: 30, accuracy: 100 },
  { date: "22 Juni 2021", amount: 30, accuracy: 70 },
  { date: "22 Juni 2021", amount: 30, accuracy: 80 },
  { date: "22 Juni 2021", amount: 30, accuracy: 30 },
  { date: "22 Juni 2021", amount: 30, accuracy: 100 },
];

function accuracyColor(accuracy: number) {
  if (accuracy > 75) {
    return "#49B572";
  }
  if (accuracy > 30) {
    return "#FFD08A";
  }
  return "#DE6B59";
}
