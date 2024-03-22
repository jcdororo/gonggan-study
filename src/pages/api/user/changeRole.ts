import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(request:NextApiRequest, response:NextApiResponse) {
  if(request.method == 'POST') {
    try {
      const db = (await connectDB).db("gonggan");
      const temp = {
        role: request.query.role == "admin" ? "user" : "admin",
      };
      const result = await db.collection("users").updateOne({ _id: new ObjectId(request.query._id?.toString()) }, { $set: temp });
      
      response.status(200).json("success");
    } catch (error) {
      response.status(500).json(error);

    }


  }

}