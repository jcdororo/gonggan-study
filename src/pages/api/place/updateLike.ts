import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";

export default async function put(
  request: NextApiRequest,
  response: NextApiResponse
) {
  const { _id, like } = request.query;
  const db = (await connectDB).db("gonggan");

  try {
    const place = await db.collection("place").updateOne(
      {
        _id: new ObjectId(_id as string),
      },
      {
        $set: { like }
      }
    );
    response.status(200).json("success");
  } catch (error) {
    response.status(500).json("error");
  }
}
