import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";

export default async function PUT(request: any, response: any) {
  const { _id, reply } = request.body;

  try {
    const db = (await connectDB).db("gonggan");

    const result = await db.collection("contact").updateOne(
      {
        _id: new ObjectId(_id),
      },
      {
        $set: { reply, status: "완료" },
      }
    );
    
    response.status(200).json("success");
  } catch (error) {
    response.status(500).json({ error: error });
  }
}
