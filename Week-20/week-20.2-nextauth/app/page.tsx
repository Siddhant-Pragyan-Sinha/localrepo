import { getServerSession } from "next-auth";
import { SessionProvider, signIn, signOut, useSession } from "next-auth/react";

export default function Home() {

  const session = getServerSession();

  return (
  <div>
    {JSON.stringify(session)}
  </div>
  )

}
