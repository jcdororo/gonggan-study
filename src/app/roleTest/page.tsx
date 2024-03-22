import Role from '@/app/components/Admin/Role'
import { connectDB } from '@/util/database';
import { ObjectId } from 'mongodb';
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
  const db = (await connectDB).db("gonggan");
  const users = await db.collection('users').find().toArray() as Users[];



  return (
    <div>
      <Role users={JSON.parse(JSON.stringify(users))}/>
    </div>
  )
}

export default page