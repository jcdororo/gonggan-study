// 비밀번호 확인 요청
import { connectDB } from "@/util/database";
import bcrypt from 'bcryptjs';

export default async function POST(request: any, response: any) {
  const db = (await connectDB).db("gonggan");

  const { id, current_password } = request.body;

  const user = await db
    .collection("users")
    .findOne({ loginId: id });

  const isCorrectPassword = await bcrypt.compare(
    current_password,
    user?.password
  );

  if (isCorrectPassword) {
    response.status(200).json("check");
  } else {
    response.status(200).json("no");
  }
}
