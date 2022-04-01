import { useSession } from "next-auth/react";
import { useState } from "react";

import AppBottomNavbar from "~/components/App/AppBottomNavbar";
import AppMain from "~/components/App/AppMain";
import AppTopNavbar from "~/components/App/AppTopNavbar";
import Menu from "~/components/App/Menu";

export default function AppIndex() {
  const { data } = useSession();
  const [isOpenMenu, setIsOpenMenu] = useState(false);

  return (
    <div>
      <AppTopNavbar isOpenMenu={isOpenMenu} setIsOpenMenu={setIsOpenMenu} />
      {isOpenMenu ? (
        <Menu />
      ) : (
        <AppMain
          name={data?.user.name}
          image={data?.user.image}
          timezone={data?.user.timezone || 7}
        />
      )}
      <AppBottomNavbar />
    </div>
  );
}
