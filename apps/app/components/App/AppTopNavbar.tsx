import { HiMenu } from "react-icons/hi";

import { MerawatHafalanDark } from "../Icon/MerawatHafalan";
import LayoutTopNavbar from "../Layout/LayoutTopNavbar";

export default function AppTopNavbar() {
  return (
    <LayoutTopNavbar>
      <div className="z-10 flex items-center justify-between ">
        <MerawatHafalanDark className="w-44 md:w-56" />
        <div className="flex items-center space-x-4">
          <button className="btn-hover">
            <HiMenu className="h-6 w-6 md:h-7 md:w-7" />
          </button>
        </div>
      </div>
    </LayoutTopNavbar>
  );
}
