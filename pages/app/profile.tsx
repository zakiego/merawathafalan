import { useSession } from "next-auth/react";
import { useState } from "react";

import AppBottomNavbar from "~/components/App/AppBottomNavbar";
import AppProfile from "~/components/App/AppProfile";
import AppTopNavbar from "~/components/App/AppTopNavbar";
import Menu from "~/components/App/Menu";

export default function Profile() {
  const { data } = useSession();
  const [isOpenMenu, setIsOpenMenu] = useState(false);

  if (!data) return <div />;

  return (
    <div>
      <AppTopNavbar isOpenMenu={isOpenMenu} setIsOpenMenu={setIsOpenMenu} />
      {isOpenMenu ? (
        <Menu />
      ) : (
        <AppProfile name={data.user.name} image={data.user.image} />
      )}
      <AppBottomNavbar />
    </div>
  );
}
