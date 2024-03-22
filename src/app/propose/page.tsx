import { getServerSession } from "next-auth";
import Propose from "./Propose";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

export default async function propose() {
  const session = await getServerSession(authOptions)

  return (
    <div>
      <Propose session={session} />
    </div>
  )
}