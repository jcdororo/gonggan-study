import { connectDB } from "@/util/database";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(request:NextApiRequest, response:NextApiResponse) {

  if(request.method == 'POST') {
    try {
      const body = JSON.parse(request.body)
      const db = (await connectDB).db("gonggan");
      const result = await db.collection('police').insertOne(body) 

  
      if(result) {
        response.status(200).json('Send police success')
      } else {
        response.status(500).json('Send police fail')
      }      
      
    } catch (error) {
      response.status(500).json(error);

    }
  }
}