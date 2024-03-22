import ProposeList from '@/app/components/ProposeList'
import { authOptions } from '@/pages/api/auth/[...nextauth]'
import { getServerSession } from 'next-auth'
import { notFound } from 'next/navigation';
import React from 'react'

export default async function List({ params }: { params: { _id: string } }) {
  const session: any = await getServerSession(authOptions);
  if(session.user.role != 'admin') {
    notFound();
  }


  return (
    <div>
      <ProposeList session={session} params={params}/>
    </div>
  )
}
