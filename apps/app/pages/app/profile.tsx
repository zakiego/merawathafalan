import { useSession } from "next-auth/react";

import AppBottomNavbar from "~/components/App/AppBottomNavbar";
import AppProfile from "~/components/App/AppProfile";
import AppTopNavbar from "~/components/App/AppTopNavbar";

export default function Profile() {
  const { data } = useSession();

  if (!data) return <div />;

  return (
    <div>
      <AppTopNavbar />
      <AppProfile name={data.user.name} image={data.user.image} />
      <AppBottomNavbar />
    </div>
  );
}
