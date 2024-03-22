import { connectDB } from "@/util/database";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(request:NextApiRequest, response:NextApiResponse) {

  if(request.method == 'GET') {
    const id = request.query.id
    try {
      const db = (await connectDB).db("gonggan");
      const result = await db.collection('picture').find({place_id:id}).toArray();      
      response.status(200).json(result)
      
      
    } catch (error) {
      throw new Error('Get pictures failed')
    }
  }

}