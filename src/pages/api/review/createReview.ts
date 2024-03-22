import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";

export default async function POST(request: any, response: any) {
  const data = request.body;
  const { newContent, placeid, writerid, writernickname, placename, star } = data;
  try {
    const db = (await connectDB).db("gonggan");
    // 닉네임으로 유저 정보 찾기
    const user = await db
      .collection("users")
      .findOne({ nickname: writernickname });
    // 리뷰 데이터 넣기
    await db.collection("review").insertOne({
      placeid: new ObjectId(placeid),
      content: newContent,
      writerid: new ObjectId(writerid),
      placename,
      writernickname,
      writerpic: user?.image,
      star,
      like: 0,
      date: new Date()
    });
    response.status(200).json("success");
  } catch (error) {
    response.status(500).json("error");
  }
}
