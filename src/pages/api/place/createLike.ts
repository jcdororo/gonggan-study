import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";

export default async function post(request: any, response: any) {
  const { place_id, liked_user } = request.query;

  try {
    const db = (await connectDB).db("gonggan");

    const exist = await db.collection("like_place").findOne({
      place_id,
      liked_user,
    });

    if (exist) {
      await db.collection("like_place").deleteOne({
        place_id,
        liked_user
      })
    } else {
      await db.collection("like_place").insertOne({
        place_id,
        liked_user,
      });
    }

    response.status(200).json(exist);
  } catch (error) {
    response.status(500).json("error");
  }
}
