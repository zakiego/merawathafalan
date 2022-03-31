import { HiClock, HiHeart, HiLightningBolt } from "react-icons/hi";

import { TypeHistoryTodayData, useHistoryToday } from "~/lib/swr";

export default function AppLastActivityCard() {
  const { data, error } = useHistoryToday("api/app/today-history");

  if (error) return <div className="mt-7">Oops! Something went wrong :(</div>;

  if (!data) {
    return (
      <div className="mt-5 rounded-2xl bg-white py-4 shadow-lg">
        <div className="flex justify-around">
          <div className="flex flex-col items-center">
            <HiHeart className="h-8 w-8  text-[#DE6B59] md:h-10 md:w-10" />
            <p className="mt-2 font-semibold md:text-lg">
              <Skeleton />
            </p>
            <p className="text-xs opacity-70 md:text-sm">Latihan</p>
          </div>
          <div className="flex flex-col items-center">
            <HiLightningBolt className="h-8 w-8 text-[#49B572]  md:h-10 md:w-10" />
            <p className="mt-2 font-semibold md:text-lg">
              <Skeleton />
            </p>
            <p className="text-xs opacity-70 md:text-sm">Poin</p>
          </div>
          <div className="flex flex-col items-center">
            <HiClock className="h-8 w-8 text-yellow-600 md:h-10 md:w-10" />
            <p className="mt-2 font-semibold md:text-lg">
              <Skeleton />
            </p>
            <p className="text-xs opacity-70 md:text-sm">Menit</p>
          </div>
        </div>
      </div>
    );
  }

  const today: TypeHistoryTodayData = data.data;

  const filterTime =
    today?.sumTimeSecond > 60
      ? Math.floor(today.sumTimeSecond / 60)
      : today.sumTimeSecond;

  const timeFormat = today.sumTimeSecond > 60 ? "Menit" : "Detik";

  return (
    <div className="mt-5 rounded-2xl bg-white py-4 shadow-lg">
      <div className="flex justify-around">
        <div className="flex flex-col items-center">
          <HiHeart className="h-8 w-8  text-[#DE6B59] md:h-10 md:w-10" />
          <p className="mt-2 font-semibold md:text-lg">{today.countTrain}x</p>
          <p className="text-xs opacity-70 md:text-sm">Latihan</p>
        </div>
        <div className="flex flex-col items-center">
          <HiLightningBolt className="h-8 w-8 text-[#49B572]  md:h-10 md:w-10" />
          <p className="mt-2 font-semibold md:text-lg">{today.sumPoint}</p>
          <p className="text-xs opacity-70 md:text-sm">Poin</p>
        </div>
        <div className="flex flex-col items-center">
          <HiClock className="h-8 w-8 text-yellow-600 md:h-10 md:w-10" />
          <p className="mt-2 font-semibold md:text-lg">{filterTime}</p>
          <p className="text-xs opacity-70 md:text-sm">{timeFormat}</p>
        </div>
      </div>
    </div>
  );
}

const Skeleton = () => {
  return <div className="skeleton my-1 h-5 w-10" />;
};
