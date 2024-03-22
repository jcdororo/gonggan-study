import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";

export default async function (
  request: NextApiRequest,
  response: NextApiResponse
) {
  if (request.method == "POST") {
    try {
      const temp = {
        image: request.query.url,
      };
      const db = (await connectDB).db("gonggan");
      const result = await db
        .collection("users")
        .updateOne(
          { _id: new ObjectId(request.query._id?.toString()) },
          { $set: temp }
        );

      if (result) {
        response.status(200).json("image change success");
      } else {
        response.status(500).json("image change fail");
      }
    } catch (error) {
      throw new Error("image change fail");
    }
  }
}
