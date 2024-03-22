import { connectDB } from "@/util/database";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(request:NextApiRequest, response:NextApiResponse) {
  if(request.method == 'POST') {
    const nickname = JSON.parse(request.body).nickname;
    try {
      const db = (await connectDB).db("gonggan");
      const result = await db.collection('users').find({nickname: nickname}).toArray();
      
      if(result.length > 0) {
        response.status(200).json('Y')
      } else {
        response.status(200).json('N')
      }

    } catch (error) {
      throw new Error('nickname check fail')
    }
  }

  

}