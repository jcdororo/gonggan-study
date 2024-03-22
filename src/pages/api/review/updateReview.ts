import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  if (request.method == "POST") {
    try {
      const db = (await connectDB).db("gonggan");
      const body = request.body;

      if (body.like != undefined) {
        // 좋아요만 수정
        const result = await db.collection("review").updateOne(
          {
            _id: new ObjectId(body.reviewid),
          },
          {
            $set: { like: body.like },
          }
        );
      } 
      
      if(body.content != undefined) {
        // 내용, 평점 수정
        const result = await db.collection("review").updateOne(
          {
            // placeid : new ObjectId(request.body.placeid),
            // writerid: new ObjectId(request.body.writerid)
            _id: new ObjectId(body.reviewid),
          },
          {
            $set: { content: body.newContent, star: body.star },
          }
        );
      }

      // 닉네임이 변경되었을 경우
      // 그동안 썼던 리뷰들의 닉네임 변경
      if(body.updateId != undefined) {
        await db.collection("review").updateOne(
          {
            writerid: new ObjectId(body.updateId),
          },
          {
            $set: { writernickname: body.nickname}
          }
        )
      }

      response.status(200).json("success");
    } catch (error) {
      response.status(500).json({ error: error });
    }
  }
}
