import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from 'bcryptjs';

export default async function PUT(request: any, response: any) {
  const { session, nickname, email, password } = request.body;

  try {
    const db = (await connectDB).db("gonggan");

    // oauth로 로그인한 유저일 경우
    if (session.user.method == "oauth") {
      await db.collection("users").updateOne(
        {
          id: session.user.id,
        },
        {
          $set: { nickname, email },
        }
      );
    } 
    // credentials로 로그인한 유저일 경우
    else {
      // password 값이 있을 경우
      if (password) {
        const hashedPassword = await bcrypt.hash(password, 12);
  
        await db.collection("users").updateOne(
          {
            loginId: session.user.loginId,
          },
          {
            $set: { nickname, email, password: hashedPassword },
          }
        );
      } 
      // password 값이 없을 경우
      else {
        await db.collection("users").updateOne(
          {
            loginId: session.user.loginId,
          },
          {
            $set: { nickname, email },
          }
        );
      }
    }
    response.status(200).json("success");
  } catch (error) {
    response.status(500).json({ error: error });
  }
}
