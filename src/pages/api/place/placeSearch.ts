import { connectDB } from "@/util/database";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(request:NextApiRequest, response:NextApiResponse) {
  try {
    const db = (await connectDB).db("gonggan");
    const result = await db.collection('place').find({ location: { $regex: request.query.query, $options: 'i' } }).toArray();
    response.status(200).json(result);
  } catch (error) {
    response.status(500).json({ error: 'Place search fail' });
  }



}