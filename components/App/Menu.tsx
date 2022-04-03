import Link from "next/link";
import { signOut } from "next-auth/react";

import LayoutMainPadding from "../Layout/LayoutMainPadding";
import LayoutMaxWidth from "../Layout/LayoutMaxWidth";

export default function Menu() {
  const listMenu = [
    {
      name: "API",
      link: "https://docs.merawathafalan.my.id/docs/intro",
    },
  ];

  return (
    <LayoutMaxWidth>
      <LayoutMainPadding>
        <div>
          {listMenu.map((item) => {
            return (
              <div key={item.name}>
                <Link href={item.link}>
                  <a>
                    <div className="btn-menu-animation rounded-lg py-3 px-4 font-semibold hover:cursor-pointer hover:bg-gray-200/70">
                      {item.name}
                    </div>
                  </a>
                </Link>
              </div>
            );
          })}
          <div className="btn-menu-animation rounded-lg py-3 px-4 hover:bg-red-100/70">
            <button
              className="w-full text-left font-semibold"
              onClick={() =>
                signOut({
                  redirect: true,
                  callbackUrl: "/",
                })
              }
            >
              Sign Out
            </button>
          </div>
        </div>
      </LayoutMainPadding>
    </LayoutMaxWidth>
  );
}
