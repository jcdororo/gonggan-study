import React from 'react'
import OauthForm from '../components/Oauth/OauthForm'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/pages/api/auth/[...nextauth]'
import { notFound } from "next/navigation";

const page = async () => {
  const session: any = await getServerSession(authOptions)
  if(session == null) {
    notFound();
  }
  return (
    <div>
      <OauthForm session={session}/>
    </div>
  )
}

export default page