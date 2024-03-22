import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from 'bcryptjs';

export default async function PUT(request: any, response: any) {
  const { id} = request.body;

  try {
    const db = (await connectDB).db("gonggan");

    // accounts에도 유저가 존재 한다면
    const exist = await db.collection("accounts").findOne({
      userId: new ObjectId(id)
    });

    // accounts도 지워줌
    if (exist) {
      await db.collection("accounts").deleteOne({
        userId: new ObjectId(id)
      })
    }

    await db.collection("users").deleteOne({
      _id: new ObjectId(id)
    })

    response.status(200).json("success");
  } catch (error) {
    response.status(500).json({ error: error });
  }
}
