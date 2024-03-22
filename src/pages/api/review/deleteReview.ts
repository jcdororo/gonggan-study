import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(request:NextApiRequest, response:NextApiResponse) {
  if(request.method == 'DELETE') {
    try {
      const db = (await connectDB).db("gonggan");
      const result = await db.collection('review').deleteOne({_id : new ObjectId(request.query._id?.toString())})


      if (result) {
        response.status(200).json(result)
        } else {
        response.status(500).json({ error: 'Delete failed' });
      }     
    } catch (error) {
      response.status(500).json({ error: error });
    }
  }
}
