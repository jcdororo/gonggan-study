import Role from '@/app/components/Admin/Role'
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { connectDB } from '@/util/database';
import { ObjectId } from 'mongodb';
import { getServerSession } from 'next-auth';
import { notFound } from 'next/navigation';
import React from 'react'


interface Users {
  _id: ObjectId,
  loginId: string,
  nickname: string,
  password: string,
  id: string,
  email: string,
  role: string,
  method: string,
  image: string,
  emailVerified: string
}

const page = async () => {
  const session: any = await getServerSession(authOptions);
  if(session.user.role != 'admin') {
    notFound();
  }
  const db = (await connectDB).db("gonggan");
  const users = await db.collection('users').find().toArray() as Users[];



  return (
    <div>
      <Role users={JSON.parse(JSON.stringify(users))}/>
    </div>
  )
}

export default page