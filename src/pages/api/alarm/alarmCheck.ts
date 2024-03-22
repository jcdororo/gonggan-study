import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  if (request.method == "POST") {
    try {
      const db = (await connectDB).db("gonggan");
      const result = await db
        .collection("alarm")
        .updateOne(
          { _id: new ObjectId(request.query._id?.toString()) },
          { $set: { check: true } }
        );
      if (result) {
        response.status(200).json("alarm Checked");
      } else {
        response.status(500).json("alarm Check failed");
      }
    } catch (error) {
      response.status(500).json({ error: error });
    }
  }
}
