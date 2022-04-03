import { useRouter } from "next/router";
import { signOut, useSession } from "next-auth/react";

import AppBottomNavbar from "~/components/App/AppBottomNavbar";
import AppMain from "~/components/App/AppMain";
import AppTopNavbar from "~/components/App/AppTopNavbar";

export default function Dashboard() {
  const { data } = useSession();

  if (!data) return <div />;

  return (
    <div className="text-black">
      <AppTopNavbar image={data?.user?.image} />
      <AppMain name={data.user?.name} image={data?.user?.image} />
      <AppBottomNavbar />
    </div>
  );
}
