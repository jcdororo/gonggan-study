import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  try {
    const db = (await connectDB).db("gonggan");
    const result = await db
      .collection("propose")
      .findOne({ _id: new ObjectId(request.query.id?.toString()) });
    response.status(200).json(result);
  } catch (error) {
    response.status(500).json({ error: "Propose search fail" });
  }
}
