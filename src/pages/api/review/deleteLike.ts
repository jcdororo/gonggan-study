import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";

export default async function DELETE(request: any, response: any) {
  const { reviewId, nickname } = request.query;

  try {
    const db = (await connectDB).db("gonggan");
    const user = await db.collection("users").findOne({ nickname });

    await db.collection("like_review").updateOne(
      {
        review_id: new ObjectId(reviewId),
        liked_user: new ObjectId(user?._id),
      },
      {
        $set: { canceled: true },
      }
    );

    response.status(200).json(true);
  } catch (error) {
    response.status(500).json("error");
  }
}
