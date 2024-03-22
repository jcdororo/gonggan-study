import ProfileForm from "@/app/components/ProfileForm";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from 'next-auth'

export default async function Profile() {
  const session:any = await getServerSession(authOptions)
  return (
    <>
      <ProfileForm session={session}/>
    </>
  )
}