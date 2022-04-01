import { HiMenu, HiX } from "react-icons/hi";

import { MerawatHafalanDark } from "../Icon/MerawatHafalan";
import LayoutTopNavbar from "../Layout/LayoutTopNavbar";

interface Props {
  isOpenMenu: boolean;
  setIsOpenMenu: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function AppTopNavbar({ isOpenMenu, setIsOpenMenu }: Props) {
  return (
    <LayoutTopNavbar>
      <div className="z-10 flex items-center justify-between ">
        <MerawatHafalanDark className="w-44 md:w-56" />
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setIsOpenMenu(isOpenMenu ? false : true)}
            className={`btn-hover ${isOpenMenu ? "bg-gray-100/10" : ""}`}
          >
            {isOpenMenu ? (
              <HiX className="h-6 w-6 md:h-7 md:w-7" />
            ) : (
              <HiMenu className="h-6 w-6 md:h-7 md:w-7" />
            )}
          </button>
          {/* <button
            onClick={() => setIsOpenMenu(false)}
            className="btn-hover bg-gray-100/10"
          >
            
          </button> */}
        </div>
      </div>
    </LayoutTopNavbar>
  );
}
