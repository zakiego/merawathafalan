import Image from "next/image";

import LayoutMainPadding from "../Layout/LayoutMainPadding";
import LayoutMaxWidth from "../Layout/LayoutMaxWidth";
import AppProfilePartHistory from "./AppProfilePartHistory";
import AppProfileSumHistory from "./AppProfileSumHistory";

interface Props {
  name: string | null | undefined;
  image: string | null | undefined;
}

export default function AppProfile(props: Props) {
  const largeImage = props.image?.replace("=s96-c", "");
  return (
    <main>
      <LayoutMaxWidth>
        <LayoutMainPadding>
          <div className="flex items-center justify-center">
            <div className="mt-5 flex items-center justify-center rounded-full bg-[#F0F2F5] p-1.5">
              <Image
                className="rounded-full"
                src={largeImage as string}
                height={120}
                width={120}
                quality={100}
                unoptimized={true}
                alt="Profile Image"
              />
            </div>
          </div>

          <h1 className="mt-3 text-center text-xl font-semibold md:text-2xl">
            {props.name}
          </h1>

          <AppProfileSumHistory />
          <AppProfilePartHistory timezone={8} />
        </LayoutMainPadding>
      </LayoutMaxWidth>
    </main>
  );
}
