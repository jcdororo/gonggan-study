import { connectDB } from "@/util/database";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  if (request.method == "POST") {
    try {
      const temp = {
        place_id: request.query.place_id,
        liked_user: request.query.liked_user,
      };
      const db = (await connectDB).db("gonggan");

      if (request.query.isLike == "true") {
        const result = await db.collection("like_place").deleteOne(temp);
        response.status(200).json("false");
      }

      if (request.query.isLike == "false") {
        const result = await db.collection("like_place").insertOne(temp);
        response.status(200).json("true");
      }
    } catch (error) {
      response.status(500).json({ error: error });
    }
  }
}
