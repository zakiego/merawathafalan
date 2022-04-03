import Image from "next/image";
import { signIn, signOut, useSession } from "next-auth/react";

export default function AuthComponent() {
  const { data: session } = useSession();

  if (session) {
    return (
      <>
        Signed in as {session.user?.email} <br />
        <Image
          src={session.user?.image as string}
          height={100}
          width={100}
          alt="Avatar"
        />
        <div>
          <button onClick={() => signOut()}>Sign out</button>
        </div>
      </>
    );
  }
  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn("google")}>Sign in with Google</button>
    </>
  );
}
