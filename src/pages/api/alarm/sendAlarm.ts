import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  if (request.method == "POST") {
    try {
      const body = JSON.parse(request.body);
      const temp = {
        check: false,
        content: body.content,
        date: new Date(),
        link: body.link,
        receiver: body.receiver == "" ? "" : new ObjectId(body.receiver),
        role: body.role,
      };
      const db = (await connectDB).db("gonggan");
      const result = await db.collection("alarm").insertOne(temp);
      if (result) {
        response.status(200).json("Send alarm success");
      } else {
        response.status(500).json("Send alarm fail");
      }
    } catch (error) {
      response.status(500).json(error);
    }
  }
}
