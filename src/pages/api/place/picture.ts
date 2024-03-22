import { connectDB } from "@/util/database";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(request:NextApiRequest, response:NextApiResponse) {

 
  if(request.method == 'POST') {
    try {
      const body = JSON.parse(request.body);
      const temp = {
        place_id:body.place_id,
        url:body.url
      }
      const db = (await connectDB).db("gonggan");
      const result = await db.collection('picture').insertOne(temp)
      if (result) {
        response.status(200).json(result.insertedId.toString())
        } else {
        response.status(500).json({ error: 'place picture failed' });
      }   
    } catch (error) {
      response.status(500).json({ error: 'place picture failed' });
    }


  }
  

}