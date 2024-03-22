import { connectDB } from "@/util/database";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  const session: any = await getServerSession(request, response, authOptions);

  if (request.method == "DELETE") {
    try {
      const db = (await connectDB).db("gonggan");
      const result = await db.collection("like_place").deleteOne({
        place_id: request.query.place_id?.toString(),
        liked_user: session.user.id.toString(),
      });

      if (result) {
        // response.redirect(200,'/mypage')
        response.status(200).json(result);
      } else {
        response.status(500).json({ error: "Delete failed" });
      }
    } catch (error) {
      response.status(500).json({ error: error });
    }
  }
}
