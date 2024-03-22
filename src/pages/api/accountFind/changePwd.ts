import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from 'bcryptjs';

export default async function put(
  request: NextApiRequest,
  response: NextApiResponse
) {
  const { password, id } = request.body;

  try {
    const db = (await connectDB).db("gonggan");
    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await db.collection("users").updateOne(
      {
        _id: new ObjectId(id),
      },
      {
        $set: { password: hashedPassword },
      }
    );

    
    response.status(200).json("success");
  } catch (error) {
    response.status(500).json({ error: error });
  }
}
