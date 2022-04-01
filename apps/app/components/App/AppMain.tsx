import Image from "next/image";
import Link from "next/link";
import { IoLogoGameControllerB } from "react-icons/io";

import { dateToday, dateTodayDateStr } from "~/helper/time";

import LayoutMainPadding from "../Layout/LayoutMainPadding";
import LayoutMaxWidth from "../Layout/LayoutMaxWidth";
import AppLastActivityCard from "./AppLastActivityCard";
import AppLastActivityHistory from "./AppLastActivityHistory";

interface Props {
  name: string | null | undefined;
  image: string | null | undefined;
  timezone: number;
}

export default function AppMain(props: Props) {
  return (
    <main>
      <LayoutMaxWidth>
        <LayoutMainPadding>
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h4 className="text-sm opacity-75 md:text-base">
                Selamat datang,
              </h4>
              <h1 className="text-lg font-semibold md:text-xl">
                {props?.name}
              </h1>
            </div>
            <div className="flex items-center justify-center rounded-full bg-white p-0.5">
              {props.image && (
                <Image
                  className="scale-75 rounded-full md:scale-100"
                  src={props?.image as string}
                  height={70}
                  width={70}
                  quality={100}
                  alt="Profile Image"
                />
              )}
            </div>
          </div>

          <div className="mt-6 space-y-1">
            <h3 className="font-semibold">Aktivitas Hari ini</h3>
            <p className="text-sm">{dateTodayDateStr(dateToday())}</p>
          </div>

          <AppLastActivityCard />
          <Link href="/app/quiz" passHref>
            <button className="btn-primary mt-5 w-full">
              <div className="flex items-center justify-center space-x-2">
                <IoLogoGameControllerB className="h-5 w-5" />
                <div>Mulai Latihan</div>
              </div>
            </button>
          </Link>
          <AppLastActivityHistory timezone={props.timezone} />
        </LayoutMainPadding>
      </LayoutMaxWidth>
    </main>
  );
}
