// 장소 가져오기
import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";

export default async function GET(request: any, response: any) {
  const { _id } = request.query;
  const db = (await connectDB).db("gonggan");

  try {
    const data = await db
      .collection("place")
      .findOne({ _id: new ObjectId(_id) });

    response.status(200).json(data);
  } catch (error) {
    response.status(500).json("error");
  }
}
