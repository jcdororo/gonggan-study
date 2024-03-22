// 장소 이미지 가져오기
import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";

export default async function GET(request: any, response: any) {
  const { _id } = request.query;
  const db = (await connectDB).db("gonggan");

  try {
    const picture = await db
      .collection("picture")
      .find({ place_id: _id }).toArray();

    response.status(200).json(picture);
  } catch (error) {
    response.status(500).json("error");
  }
}
