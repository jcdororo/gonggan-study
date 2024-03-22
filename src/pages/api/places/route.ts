// 장소들 가져오기
import { connectDB } from "@/util/database";

export default async function GET(request: any, response: any) {
  const db = (await connectDB).db("gonggan");

  try {
    const places = await db.collection("place").find().toArray();
    response.status(200).json(places);
  } catch (error) {
    response.status(500).json("error");
  }
}
