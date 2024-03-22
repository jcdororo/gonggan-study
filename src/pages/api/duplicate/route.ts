// 아이디, 닉네임 중복 검사 요청
import { connectDB } from "@/util/database";

export default async function POST(request: any, response: any) {
  const db = (await connectDB).db("gonggan");

  const { loginId, nickname, email } = request.body;
  let checkExisting;

  if(loginId != undefined) {
    checkExisting = await db.collection("users").findOne({ loginId });
  }

  if(nickname != undefined) {
    checkExisting = await db.collection("users").findOne({ nickname });
  }

  if(email != undefined) {
    checkExisting = await db.collection("users").findOne({ email });
  }

  if (checkExisting) {
    response.status(200).json("duplication");
  } else {
    response.status(200).json("no");
  }
  
}
