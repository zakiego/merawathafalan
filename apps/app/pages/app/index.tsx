import { useSession } from "next-auth/react";

import AppBottomNavbar from "~/components/App/AppBottomNavbar";
import AppMain from "~/components/App/AppMain";
import AppTopNavbar from "~/components/App/AppTopNavbar";

export default function AppIndex() {
  const { data } = useSession();

  if (!data) return <div />;

  return (
    <div>
      <AppTopNavbar />
      <AppMain
        name={data.user.name}
        image={data.user.image}
        timezone={data.user.timezone}
      />
      <AppBottomNavbar />
    </div>
  );
}
