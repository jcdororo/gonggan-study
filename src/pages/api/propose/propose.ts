import { connectDB } from "@/util/database";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(request:NextApiRequest, response:NextApiResponse) {
  const session: any = await getServerSession(request, response, authOptions);


  if(request.method == 'POST') {    
    const body = JSON.parse(request.body);
    body["proposerId"] = session?.user.id;
    
    try {
      const db = (await connectDB).db("gonggan");
      const result = await db.collection('propose').insertOne(body)   
      if (result) {
        response.status(200).json(result.insertedId.toString())
        } else {
        response.status(500).json({ error: 'Propose failed' });
      }     
    } catch (error) {
      response.status(500).json({ error: error });
    }
  }

}
