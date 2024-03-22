import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";

export default async function get(
  request: NextApiRequest,
  response: NextApiResponse
) {
  const { review_id, liked_user } = request.query;
  const db = (await connectDB).db("gonggan");

  try {
    // 좋아요 누른 유저가 있는지
    const user = await db.collection("like_review").findOne({
      review_id,
      liked_user
    });

    let res = "";

    if (user) {
      res = "exist"
    } else {
      res = "no"
    }

    response.status(200).json(res);
  } catch (error) {
    response.status(500).json("error");
  }
}
