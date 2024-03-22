import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";

export default async function get(
  request: NextApiRequest,
  response: NextApiResponse
) {
  const { place_id } = request.query;
  const db = (await connectDB).db("gonggan");

  try {

    // 장소의 좋아요들
    const place = await db.collection("like_place").find({
      place_id
    }).toArray();

    // let res;
    // if (place) {
    //   res = place
    // } else {
    //   res = "no";
    // }

    response.status(200).json(place);
  } catch (error) {
    response.status(500).json("error");
  }
}
