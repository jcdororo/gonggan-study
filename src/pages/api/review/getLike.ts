import { connectDB } from "@/util/database";
import { NextApiRequest, NextApiResponse } from "next";

export default async function get(
  request: NextApiRequest,
  response: NextApiResponse
) {
  const { review_id } = request.query;
  const db = (await connectDB).db("gonggan");

  try {

    // 장소의 리뷰들
    const reviews = await db.collection("like_review").find({
      review_id
    }).toArray();

    response.status(200).json(reviews);
  } catch (error) {
    response.status(500).json("error");
  }
}
