import { useEffect, useState } from "react";

import {
  convertUTCToCustomZone,
  lastActivityHistoryDateStr,
} from "~/helper/time";
import { TypePartHistory, useLastHistory } from "~/lib/swr";

import { LoadingIcon } from "../Icon/LoadingIcon";
import { SkeletonTable } from "../Skeleton";

export default function AppProfilePartHistory({
  timezone,
}: {
  timezone: number;
}) {
  const { data: history, error } = useLastHistory("/api/app/part-history");

  const [listHistory, setListHistory] = useState<TypePartHistory["data"]>([]);
  const [pageHistory, setPageHistory] = useState(0);

  const [isLastPageHistory, setIsLastPageHistory] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    history?.data.length > 0 ? setListHistory(history.data) : "";
  }, [history]);

  if (error) return <div className="mt-7">Oops! Something went wrong :(</div>;

  async function loadMoreHistory() {
    setIsLoading(true);
    setPageHistory(pageHistory + 1);

    const { data, error, isLastPage } = await fetch(
      `/api/app/part-history?page=${pageHistory}`,
    ).then((resp) => resp.json());

    error && setIsError(true);

    if (isLastPage) {
      setIsLastPageHistory(true);
    }

    setListHistory([...listHistory, ...data]);
    setIsLoading(false);
  }

  if (isError) return <div className="mt-7">Oops! Something went wrong :(</div>;

  return (
    <div className="mt-7">
      <table className="mt-4 w-full table-fixed">
        <thead>
          <tr className="text-sm">
            <th className="rounded-l-lg bg-gray-100 py-2 font-normal">
              Tanggal
            </th>
            <th className="bg-gray-100 py-2 font-normal">Soal</th>
            <th className="bg-gray-100 py-2 font-normal">Benar</th>
            <th className="bg-gray-100 py-2 font-normal">Poin</th>
            <th className="rounded-r-lg bg-gray-100 py-2 font-normal">
              Akurasi
            </th>
          </tr>
        </thead>
        <tbody className="divide-y-2">
          {!history && (
            <>
              <SkeletonTable amount={5} />
              <SkeletonTable amount={5} />
            </>
          )}

          {listHistory &&
            listHistory.map((item, id: number) => {
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
                  <td className="py-3">{item.countTrue}</td>
                  <td className="py-3">
                    {item.countTrue * 10 > 0 ? `+${item.countTrue * 10}` : "0"}
                  </td>
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

      {!isLastPageHistory && (
        <div className="mt-4 mb-4 flex justify-center">
          {isLoading ? (
            <LoadingIcon className="w-5 text-sm text-black" />
          ) : (
            <button
              className="btn-outline px-3 py-1.5 text-xs md:px-5 md:py-2 md:text-sm"
              onClick={() => loadMoreHistory()}
            >
              Load More
            </button>
          )}
        </div>
      )}
    </div>
  );
}

function accuracyColor(accuracy: number) {
  if (accuracy > 75) {
    return "#49B572";
  }
  if (accuracy > 30) {
    return "#FFD08A";
  }
  return "#DE6B59";
}
