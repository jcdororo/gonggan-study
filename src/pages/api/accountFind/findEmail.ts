// 이메일로 유저 _id 값 받아오기
import { connectDB } from "@/util/database";

export default async function post(request: any, response: any) {
  try {
    const db = (await connectDB).db("gonggan");

    const { email } = request.body;
    const user = await db.collection("users").findOne({ email: email });

    response.status(200).json(user);
  } catch (error) {
    response.status(500).json(error);
  }
}
