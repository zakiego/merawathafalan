import Link from "next/link";
import { useRouter } from "next/router";
import {
  HiChartBar,
  HiHome,
  HiOutlineChartBar,
  HiOutlineHome,
  HiOutlineUser,
  HiUser,
} from "react-icons/hi";

import LayoutMaxWidth from "~/components/Layout/LayoutMaxWidth";

export default function AppBottomNavbar() {
  const router = useRouter();

  return (
    <div className="fixed inset-x-0 bottom-0 border-t-2 bg-white">
      <LayoutMaxWidth>
        <div className="flex justify-around py-2">
          {listMenu.map((menu) => {
            if (menu.link == router.pathname) {
              return (
                <Link href={menu.link} key={menu.name}>
                  <a className="flex flex-col items-center justify-center">
                    <menu.iconActive className="h-6 w-6 text-primary md:h-8 md:w-8 " />
                    <div className="text-xs text-primary">{menu.name}</div>
                  </a>
                </Link>
              );
            }

            return (
              <Link href={menu.link} key={menu.name}>
                <a className="btn-menu-animation group flex flex-col items-center justify-center text-primary opacity-60 hover:opacity-80">
                  <menu.iconInactive className="h-6 w-6 group-hover:hidden md:h-8 md:w-8" />
                  <menu.iconActive className="hidden h-6 w-6 group-hover:block md:h-8 md:w-8" />
                  <div className="text-xs">{menu.name}</div>
                </a>
              </Link>
            );
          })}
        </div>
      </LayoutMaxWidth>
    </div>
  );
}

const listMenu = [
  {
    name: "Home",
    link: "/app",
    iconActive: HiHome,
    iconInactive: HiOutlineHome,
  },
  // {
  //   name: "Dashboard",
  //   link: "/app/dashboard",
  //   iconActive: HiChartBar,
  //   iconInactive: HiOutlineChartBar,
  // },
  // {
  //   name: "Profile",
  //   link: "/app/profile",
  //   iconActive: HiUser,
  //   iconInactive: HiOutlineUser,
  // },
];
