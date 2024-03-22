import { connectDB } from "@/util/database";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { UserInfoType } from "@/app/interface";
import { ObjectId } from "mongodb";

export default async function POST(request: any, response: any) {
  
  const data = request.body;
  const { loginId, nickname, email, password } = data;

  const db = (await connectDB).db("gonggan");

  const checkExisting = await db.collection("users").findOne({ loginId });

  if (checkExisting) {
    return;
  }
  
  const hashedPassword = await bcrypt.hash(password, 12);

  try {
    const user = await db.collection("users").insertOne({
      loginId,
      nickname,
      password: hashedPassword,
      email,
      role: "user",
      method: "credentials",
      image: "",
      emailVerified: "",
    })

    const findUser = await db.collection("users").findOne({ loginId })
    const updateUser = await db.collection("users").updateOne(
      {
        loginId
      },
      {
        $set: { id: findUser?._id + "" }
      }
    )

  
    response.status(200).json("success");
    return NextResponse.json(user, { status: 200 });

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
